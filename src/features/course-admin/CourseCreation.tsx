import { AppstoreAddOutlined, ContactsOutlined, SaveOutlined } from '@ant-design/icons';
import { ExamFormRow } from '@features/course-admin/ExamFormRow.tsx';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Input, Select, SelectProps, Space, Spin } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';
import styles from './CourseCreation.module.scss';

interface CourseResponse {
    id: number;
    description: string;
    version: number;
    number: string;
    versions: VersionResponse[];
    modules: ModuleResponse[];
    exams: ExamResponse[];
    teachers: TeacherResponse[];
}

export interface ModuleResponse {
    id: number;
    version: string;
    description: string;
    number: string;
    isActiv: boolean;
}

export interface TeacherResponse {
    id: number;
    name: string;
}

export interface ExamResponse {
    id: number;
    description: string;
    weight: number;
    type: string;
}

export interface CourseFilter {
    modules: ModuleResponse[];
    teachers: TeacherResponse[];
}

export interface VersionResponse {
    version: number;
}

interface CourseFormData {
    description: string;
    number: string;
    modules: ModuleResponse[]; // Array of module references
    teachers: TeacherResponse[]; // Array of teacher references
    exams: ExamCreateData[];
}

interface FormDataPostRequest {
    description: string;
    number: string;
    moduleRef: number[]; // Array of module references
    teacherRef: number[]; // Array of teacher references
    exams: ExamCreateData[];
}

interface ExamCreateData {
    id: number;
    description: string;
    weight: number;
    type: string;
}

// TODO: change Path getCourseByID to course
async function getCourse(courseId: number): Promise<SelectProps['value']> {
    const { data } = await axios.get<CourseResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/getCourseByID/${courseId}`
    );
    return {
        description: data.description,
        activeVersion: data.version,
        number: data.number,
        versions: data.versions,
        modules: data.modules,
        exams: data.exams,
        teachers: data.teachers,
    };
}

async function getModules(): Promise<SelectProps['options']> {
    const { data } = await axios.get<CourseFilter[]>(`${import.meta.env.VITE_BACKEND_API_URL}/coursefilter`);
    const modules = data.length > 0 ? data[0].modules : [];
    return modules.map((module: ModuleResponse) => ({
        label: module.description,
        value: module.id,
    }));
}

async function getTeachers(): Promise<SelectProps['options']> {
    const { data } = await axios.get<CourseFilter[]>(`${import.meta.env.VITE_BACKEND_API_URL}/coursefilter`);
    const teachers = data.length > 0 ? data[0].teachers : [];
    return teachers.map((teacher: TeacherResponse) => ({
        label: teacher.name,
        value: teacher.id,
    }));
}

async function getExams(courseId: number): Promise<ExamResponse[]> {
    const course: CourseResponse = (await getCourse(courseId)) as CourseResponse;
    return course.exams;
}

/*async function getVersions(courseId: number): Promise<SelectProps['options']> {
    const course: CourseResponse = (await getCourse(courseId)) as CourseResponse;
    return course.versions.map((version: VersionResponse) => ({
        label: version,
        value: version,
    }));
}*/

// Todo Post Request
/* async function createCourse(courseData: CourseCreateData): Promise<void> {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/courses`, courseData);
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
} */

// Dropdown with the Version
const handleVersionDropChange = (value: string) => {
    //console.info(value);
    value;
    // TODO: Neuer kurs vom backend fetchen basierend auf der version
};

export default function CourseCreation() {
    const [courseForm] = Form.useForm();
    const [examForm] = Form.useForm();
    const [examData, setExams] = useState<ExamResponse[]>([]);
    const [totalWeight, setTotalWeight] = useState(0);
    // const params = useParams<typeof courseEditRoute>({ from: courseEditRoute.id });
    const courseId = 1;

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
    } = useQuery<ExamResponse[]>({
        queryKey: ['exams'],
        queryFn: () => getExams(courseId),
    });

    /*const {
        isLoading: isVersionLoading,
        error: isVersionError,
        data: versionData,
    } = useQuery({
        queryKey: ['versions'],
        queryFn: () => getVersions(courseId),
    });*/

    // TODO: onFormFinish
    const onFormFinish = useCallback((formValues: CourseFormData) => {
        console.info('formValues:', formValues);

        // Extract module and teacher IDs
        const moduleIds: number[] = formValues.modules.map((module: { id: number }) => module.id);
        const teacherIds: number[] = formValues.teachers.map((teacher: { id: number }) => teacher.id);
        console.info(teacherIds);

        // Create the payload for your API request
        const payload: FormDataPostRequest = {
            description: formValues.description,
            number: formValues.number,
            moduleRef: moduleIds,
            teacherRef: teacherIds,
            exams: formValues.exams, // Include your exams as needed
        };

        // Log the payload for demonstration (you can handle the data as needed)
        console.info('API Payload:', payload);
        // Now you can send the formValues to your API or perform any other actions
    }, []);

    // Use an effect to update the state when new exam data is fetched
    useEffect(() => {
        if (fetchedExamData) {
            setExams(fetchedExamData);
        }
    }, [fetchedExamData]);

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

    /* if (isVersionError) return <div>Error when loading versions</div>;
    if (isVersionLoading) return <Spin />;*/

    // temp id for the empty exam data
    let idCounter: number = examData.reduce((maxId, exam) => Math.max(maxId, exam.id) + 1, 0);

    // Adds an empty exam if the "add" button is
    const handleAddEmptyField = () => {
        examForm
            .validateFields()
            .then(() => {
                // Create an empty exam data object
                const emptyExam: ExamResponse = {
                    // Add temporary id to rerender the list on delete
                    id: idCounter++,
                    description: '',
                    weight: 0,
                    type: '',
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
            //console.info(updatedExamData);
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
            <div className={styles.flexEnd}>
                <Space wrap>
                    <Select
                        // TODO: defaultValue not working
                        className={styles.version}
                        onChange={handleVersionDropChange}
                        defaultValue={courseData?.version?.toString()}
                        options={[
                            {
                                value: '1',
                                label: '1',
                            },
                            {
                                value: '2',
                                label: '2',
                            },
                            {
                                value: '3',
                                label: '3',
                            },
                        ]}
                    />
                </Space>
            </div>
            <div className={styles.flexOverall}>
                <div className={styles.flexOneThird}>
                    <Form<CourseFormData>
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
                                    defaultValue={courseData?.teachers.map((teacher) => teacher.id)}
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
                                        defaultValue={courseData?.modules.map((module) => module.id)}
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
                    onClick={() => {
                        courseForm.submit();
                        examForm.submit();
                    }}
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