import { AppstoreAddOutlined, BookOutlined, ContactsOutlined, SaveOutlined } from '@ant-design/icons';
import { ExamFormRow } from '@features/course-admin/ExamFormRow.tsx';
import { courseEditRoute } from '@pages/routes/routes.ts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Button, Form, Input, Select, SelectProps, Space, Spin } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';
import styles from './CourseCreation.module.scss';

interface CourseResponse {
    id: number;
    description: string;
    number: string;
    teachers: string[];
    evaluationType: 'E' | 'M' | 'P';
}

interface ModulesResponse {
    id: number;
    description: string;
    number: string;
    status: string;
    bewertungstyp_beschreibung: string;
    bewertungstyp_bezeichnung: string;
    courses: CourseResponse[];
}

export interface ExamResponse {
    id: number;
    designation: string;
    weight: number;
    type: string;
    course: CourseResponse[];
}

export interface EmptyExam {
    id: number;
    designation: string;
    weight: number;
    type: string;
    course: null;
}

interface TeacherResponse {
    id: number;
    classstartyear: string;
    name: string;
    email: string;
    role: 'Student' | 'Teacher' | 'CourseAdmin';
}

async function getCourse(courseId: number): Promise<SelectProps['value']> {
    const { data } = await axios.get<CourseResponse>(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${courseId}`);
    return {
        description: data.description,
        number: data.number,
        teachers: data.teachers,
    };
}

async function getModules(): Promise<SelectProps['options']> {
    const { data } = await axios.get<ModulesResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/modules`);
    // Add the course data teachers to the options array
    return data.map((module) => ({
        label: module.description,
        value: module.id,
    }));
}

// TODO: Transformation direkt im API Request machen, here to?
async function getTeachers(): Promise<SelectProps['options']> {
    const { data } = await axios.get<TeacherResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/users`);
    return data.map((teacher) => ({
        label: teacher.name,
        value: teacher.name,
    }));
}

async function getExams(): Promise<ExamResponse[] | null> {
    const { data } = await axios.get<ExamResponse[] | null>(`${import.meta.env.VITE_BACKEND_API_URL}/exams`);
    return data;
}

// Dropdown with the Version
const handleVersionDropChange = (value: string) => {
    //console.log(value);
    value;
    // TODO: Neuer kurs vom backend fetchen basierend auf der version
};

export default function CourseCreation() {
    const [courseForm] = Form.useForm();
    const [examForm] = Form.useForm();
    const [examData, setExams] = useState<(ExamResponse | EmptyExam)[]>([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const params = useParams<typeof courseEditRoute>({ from: courseEditRoute.id });
    const courseId = params.courseId ?? 1;

    const {
        isLoading: isCourseLoading,
        error: isCourseError,
        data: courseData,
    } = useQuery<CourseResponse>({
        queryKey: ['courses'],
        queryFn: () => getCourse(courseId),
    });

    const {
        isLoading: isModuleLoading,
        error: isModuleError,
        data: moduleData,
    } = useQuery({
        queryKey: ['modules'],
        queryFn: getModules,
    });

    const {
        isLoading: isTeacherLoading,
        error: isTeacherError,
        data: teacherData,
    } = useQuery({
        queryKey: ['teachers'],
        queryFn: getTeachers,
    });

    const {
        isLoading: isExamLoading,
        error: isExamError,
        data: fetchedExamData,
    } = useQuery({
        queryKey: ['exams'],
        queryFn: getExams,
    });

    // Use an effect to update the state when new exam data is fetched
    useEffect(() => {
        if (fetchedExamData) {
            setExams(fetchedExamData);
        }
    }, [fetchedExamData]);

    // TODO: onFormFinish
    const onFormFinish = useCallback((values: CourseResponse) => {
        values;
        //console.log('form finish', values);
    }, []);

    // Update set total weight when new exam data is fetched
    useEffect(() => {
        if (fetchedExamData) {
            setExams(fetchedExamData);
            const initialTotalWeight = fetchedExamData.reduce((acc, curr) => acc + curr.weight, 0);
            setTotalWeight(initialTotalWeight);
        }
    }, [fetchedExamData]);

    if (isCourseError) return <div>Error when loading courses</div>;
    if (isCourseLoading) return <Spin />;

    if (isModuleError) return <div>Error when loading modules</div>;
    if (isModuleLoading) return <Spin />;

    if (isTeacherError) return <div>Error when loading teachers</div>;
    if (isTeacherLoading) return <Spin />;

    if (isExamError) return <div>Error when loading exams</div>;
    if (isExamLoading) return <Spin />;

    // temp id for the empty exam data
    let idCounter: number = examData.reduce((maxId, exam) => Math.max(maxId, exam.id) + 1, 0);

    // Adds an empty exam if the "add" button is
    const handleAddEmptyField = () => {
        examForm
            .validateFields()
            .then(() => {
                // Create an empty exam data object
                const emptyExam: EmptyExam = {
                    // Add temporary id to rerender the list on delete
                    id: idCounter++,
                    designation: '',
                    weight: 0,
                    type: '',
                    course: null,
                };

                setExams([...examData, emptyExam]);
            })
            .catch((error) => {
                // Handle validation error if needed
                console.error('Validation failed:', error);
            });
    };

    const handleDeleteField = (id: number) => {
        setExams((updatedExamData) => {
            //console.log(updatedExamData);
            return updatedExamData.filter((exam) => exam.id !== id);
        });
    };

    // Updates the total weight of all exams live on input change
    const onWeightChange = (rowIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = parseFloat(e.target.value);
        const updatedExams = examData.map((exam) => ({ ...exam }));
        updatedExams[rowIndex].weight = isNaN(newWeight) ? 0 : newWeight;

        const newTotal = updatedExams.reduce((acc, curr) => acc + curr.weight, 0);
        setExams(updatedExams);
        setTotalWeight(newTotal);
    };

    // Display
    return (
        <div className={styles.overallFlex}>
            <h1 className={styles.courseTitle}>
                <div>
                    <span className={styles.marginRight}>
                        <BookOutlined />
                    </span>
                    <FormattedMessage
                        id={'course.Title'}
                        defaultMessage={'Kurs'}
                        description={'Übersicht Kurs Titel'}
                    />
                </div>

                <div>
                    <Space wrap>
                        <Select
                            //defaultValue={''}
                            className={styles.version}
                            onChange={handleVersionDropChange}
                            options={[
                                { value: 'V1', label: 'V1' },
                                { value: 'V2', label: 'V2' },
                                { value: 'V3', label: 'V3' },
                            ]}
                        />
                    </Space>
                </div>
            </h1>
            <div className={styles.flexOverall}>
                <div className={styles.flexOneThird}>
                    <Form
                        // mit <> type definieren welche daten das form enthalten soll
                        // TODO: Intial values setzen anstelle von PLaceholder und für alle felder ein "name" property definieren
                        layout={'vertical'}
                        form={courseForm}
                        initialValues={courseData}
                        onFinish={onFormFinish}
                    >
                        <Form.Item
                            name={'description'}
                            label={
                                <FormattedMessage
                                    id={'course.Course'}
                                    defaultMessage={'Kurs'}
                                    description={'Kurs Name'}
                                />
                            }
                            rules={[
                                {
                                    required: true,
                                    message: '${label}',
                                },
                            ]}
                        >
                            <Input type={'text'} />
                        </Form.Item>
                        <Form.Item
                            name={'number'}
                            label={
                                <FormattedMessage
                                    id={'course.Number'}
                                    defaultMessage={'Nummer'}
                                    description={'Kurs Nummer'}
                                />
                            }
                            rules={[
                                {
                                    required: true,
                                    message: '${label}',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={'teachers'}
                            label={
                                <div>
                                    <ContactsOutlined className={styles.addSpace} />
                                    <FormattedMessage
                                        id={'course.LecturerTitle'}
                                        defaultMessage={'Dozent(en)'}
                                        description={'Name Dozent'}
                                    />
                                </div>
                            }
                        >
                            <Space className={styles.spacerWidth} direction={'vertical'}>
                                <Select
                                    mode={'multiple'}
                                    allowClear
                                    className={styles.spacerWidth}
                                    defaultValue={courseData?.teachers}
                                    options={teacherData}
                                />
                            </Space>
                        </Form.Item>

                        <div
                            style={{
                                backgroundColor: colors.colorBgContainerHighlight,
                                borderRadius: layout.borderRadius,
                            }}
                            className={styles.container}
                        >
                            <Form.Item
                                name={'modules'}
                                label={
                                    <p>
                                        <AppstoreAddOutlined className={styles.addSpace} />
                                        <FormattedMessage
                                            id={'course.ModuleTitle'}
                                            defaultMessage={'Modul(e)'}
                                            description={'Module Title'}
                                        />
                                    </p>
                                }
                            >
                                <Space className={styles.spacerWidth} direction={'vertical'}>
                                    <Select
                                        mode={'multiple'}
                                        allowClear
                                        className={styles.spacerWidth}
                                        defaultValue={moduleData}
                                        options={moduleData}
                                    />
                                </Space>
                            </Form.Item>
                        </div>
                    </Form>
                </div>

                <div
                    style={{
                        backgroundColor: colors.colorBgContainerHighlight,
                        borderRadius: layout.borderRadius,
                    }}
                    className={styles.container + ' ' + styles.flexTwoThirds}
                >
                    <p>
                        <b>
                            <FormattedMessage
                                id={'course.QualificationCertificatesTitle'}
                                defaultMessage={'Qualifikationsnachweise'}
                                description={'Qualification Certificates Title'}
                            />
                        </b>
                    </p>

                    <div>
                        <Form form={examForm} name={'exam-form'}>
                            <div className={styles.divTable}>
                                <div className={styles.divTableRow}>
                                    <div className={styles.divTableCell}>
                                        <FormattedMessage
                                            id={'course.Title'}
                                            defaultMessage={'Titel'}
                                            description={'Titel'}
                                        />
                                        <hr />
                                    </div>
                                    <div className={styles.divTableCell}>
                                        <FormattedMessage
                                            id={'course.QualificationCertificate'}
                                            defaultMessage={'Qualifikationsnachweis'}
                                            description={'Qualification Certificate'}
                                        />

                                        <hr />
                                    </div>
                                    <div className={styles.divTableCell}>
                                        <FormattedMessage
                                            id={'course.Weight'}
                                            defaultMessage={'Gewichtung'}
                                            description={'Qualification weight'}
                                        />

                                        <hr />
                                    </div>
                                </div>

                                {examData.map((exam) => {
                                    //const total = examData.reduce((acc, curr) => acc + curr.weight, 0);
                                    return (
                                        <ExamFormRow
                                            key={exam.id}
                                            exam={exam}
                                            onDeleteClick={handleDeleteField}
                                            rowIndex={exam.id}
                                            total={totalWeight}
                                            onWeightChange={onWeightChange}
                                        />
                                    );
                                })}
                            </div>
                        </Form>
                    </div>
                    <Button type={'text'} onClick={handleAddEmptyField}>
                        <FormattedMessage
                            id={'course.ButtonAdd'}
                            defaultMessage={'+ Hinzufügen'}
                            description={'Hinzufuegen Button'}
                        />
                    </Button>
                </div>
            </div>

            <div className={styles.divButtons}>
                <Button type={'primary'} className={styles.buttons}>
                    <FormattedMessage
                        id={'course.ButtonCancel'}
                        defaultMessage={'Abbrechen'}
                        description={'Abbrechen Button'}
                    />
                </Button>

                <Button className={styles.buttons}>
                    <FormattedMessage
                        id={'course.ButtonActivate'}
                        defaultMessage={'Aktivieren'}
                        description={'Speichern Button'}
                    />
                </Button>

                <Button
                    type={'primary'}
                    icon={<SaveOutlined />}
                    className={styles.buttons}
                    onClick={() => courseForm.submit()}
                >
                    <FormattedMessage
                        id={'course.ButtonSave'}
                        defaultMessage={'Speichern'}
                        description={'Speichern Button'}
                    />
                </Button>
            </div>
        </div>
    );
}
