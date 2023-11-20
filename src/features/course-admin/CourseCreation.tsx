import { AppstoreAddOutlined, BookOutlined, ContactsOutlined, SaveOutlined } from '@ant-design/icons';
import { ExamFormRow } from '@features/course-admin/ExamFormRow.tsx';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Button, Form, Input, Select, SelectProps, Space, Spin } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';
import { courseEditRoute } from '../../main.tsx';
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

async function getCourse(courseId: number): Promise<CourseResponse> {
    const { data } = await axios.get<CourseResponse>(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${courseId}`);
    return data;
}

async function getModules(): Promise<SelectProps['options']> {
    const { data } = await axios.get<ModulesResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/modules`);
    // Add the course data teachers to the options array
    // TODO: Transformation direkt im API Request machen
    return data.map((module) => ({
        label: module.description,
        value: module.id,
    }));
}

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

    const params = useParams<typeof courseEditRoute>({ from: courseEditRoute.id });
    const courseId = params.courseId ?? 1;

    const {
        isLoading: isCourseLoading,
        error: isCourseError,
        data: courseData,
    } = useQuery({
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

    // TODO: any mit dem selben type wie die FormInstance ersetzen
    const onFormFinish = useCallback((values: CourseResponse) => {
        values;
        //console.log('form finish', values);
    }, []);

    if (isCourseError) return <div>Error when loading courses</div>;
    if (isCourseLoading) return <Spin />;

    if (isModuleError) return <div>Error when loading modules</div>;
    if (isModuleLoading) return <Spin />;

    if (isTeacherError) return <div>Error when loading teachers</div>;
    if (isTeacherLoading) return <Spin />;

    if (isExamError) return <div>Error when loading exams</div>;
    if (isExamLoading) return <Spin />;

    // Clear the Options arrays to avoid doubling entries
    // if (courseOptions) {
    //     courseOptions.length = 0;
    // }
    // if (moduleOptions) {
    //     moduleOptions.length = 0;
    // }
    // if (teacherOptions) {
    //     teacherOptions.length = 0;
    // }

    const handleAddEmptyField = () => {
        // Create an empty exam data object
        const emptyExam: EmptyExam = {
            designation: '', // Initialize other properties as needed
            weight: 0,
            type: '',
            course: null,
        };

        setExams([...examData, emptyExam]);
    };

    const handleDeleteField = (index: number) => {
        const updatedExamData = [...examData];
        updatedExamData.splice(index, 1); // Remove the element at the given index
        //console.log('delete', index);
        //console.log(updatedExamData.map((data) => data.type));
        setExams(updatedExamData);
    };

    // Display
    return (
        // TODO: Alle CSS Styles extern im module.scss File definieren
        <div className={styles.overallFlex}>
            <h1 className={styles.courseTitle}>
                <div>
                    <span className={styles.marginRight}>
                        <BookOutlined />
                    </span>
                    <FormattedMessage id={'courseTitle'} defaultMessage={'Kurs'} description={'Übersicht Kurs Titel'} />
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
                                <FormattedMessage id={'courseName'} defaultMessage={'Kurs'} description={'Kurs Name'} />
                            }
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={'number'}
                            label={
                                <FormattedMessage
                                    id={'courseNumber'}
                                    defaultMessage={'Nummer'}
                                    description={'Kurs Nummer'}
                                />
                            }
                        >
                            <Input placeholder={'input placeholder'} />
                        </Form.Item>
                        <Form.Item
                            label={
                                <div>
                                    <FormattedMessage
                                        id={'lecturerTitle'}
                                        defaultMessage={'Dozent(en)'}
                                        description={'Name Dozent'}
                                    />
                                    <ContactsOutlined className={styles.floatRight} />
                                </div>
                            }
                        >
                            <Space className={styles.spacerWidth} direction={'vertical'}>
                                <Select
                                    mode={'multiple'}
                                    allowClear
                                    className={styles.spacerWidth}
                                    placeholder={'Please select'}
                                    defaultValue={courseData?.teachers}
                                    options={teacherData}
                                />
                            </Space>
                        </Form.Item>
                    </Form>

                    <div
                        style={{
                            backgroundColor: colors.colorBgContainerHighlight,
                            borderRadius: layout.borderRadius,
                        }}
                        className={styles.container}
                    >
                        <p>
                            <FormattedMessage
                                id={'moduleTitle'}
                                defaultMessage={'Modul(e)'}
                                description={'Module Title'}
                            />
                            <AppstoreAddOutlined className={styles.floatRight} />
                        </p>
                        <Space className={styles.spacerWidth} direction={'vertical'}>
                            <Select
                                mode={'multiple'}
                                allowClear
                                className={styles.spacerWidth}
                                placeholder={'Please select'}
                                defaultValue={moduleData}
                                options={moduleData}
                            />
                        </Space>
                    </div>
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
                                id={'qualificationCertificatesTitle'}
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
                                        <FormattedMessage id={'Titel'} defaultMessage={'Titel'} description={'Titel'} />
                                    </div>
                                    <div className={styles.divTableCell}>
                                        <FormattedMessage
                                            id={'qualificationCertificate'}
                                            defaultMessage={'Qualifikationsnachweis'}
                                            description={'Qualification Certificate'}
                                        />
                                    </div>
                                    <div className={styles.divTableCell}>
                                        <FormattedMessage
                                            id={'weigth'}
                                            defaultMessage={'Gewichtung'}
                                            description={'Qualification weight'}
                                        />
                                    </div>
                                </div>
                                {examData.map((exam, index) => (
                                    <ExamFormRow
                                        key={index}
                                        exam={exam}
                                        onDeleteClick={handleDeleteField}
                                        rowIndex={index}
                                    />
                                ))}
                            </div>
                        </Form>
                    </div>
                    <Button type={'text'} onClick={handleAddEmptyField}>
                        <FormattedMessage
                            id={'buttonAdd'}
                            defaultMessage={'+ Hinzufügen'}
                            description={'Hinzufuegen Button'}
                        />
                    </Button>
                </div>
            </div>

            <div className={styles.divButtons}>
                <Button type={'primary'} className={styles.buttons}>
                    <FormattedMessage
                        id={'buttonCancel'}
                        defaultMessage={'Abbrechen'}
                        description={'Abbrechen Button'}
                    />
                </Button>

                <Button className={styles.buttons}>
                    <FormattedMessage
                        id={'buttonActivate'}
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
                    <FormattedMessage id={'buttonSave'} defaultMessage={'Speichern'} description={'Speichern Button'} />
                </Button>
            </div>
        </div>
    );
}
