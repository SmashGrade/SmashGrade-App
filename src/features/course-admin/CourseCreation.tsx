import { AppstoreAddOutlined, BookOutlined, ContactsOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { invariant } from '@tanstack/react-router';
import { Button, Form, Input, Select, SelectProps, Space, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import colors from '../../colors.module.scss';
import layout from '../../layout.module.scss';
import styles from './CourseCreation.module.scss';

//const courseOptions: { label: string; value: string }[] = [];
const moduleOptions: SelectProps['options'] = [];

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

interface ExamResponse {
    id: number;
    designation: string;
    weight: number;
    type: string;
    course: CourseResponse[];
}

interface EmptyExam {
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

async function getCourse(courseId: string): Promise<CourseResponse> {
    const { data } = await axios.get<CourseResponse>(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${courseId}`);
    return data;
}

async function getModules(): Promise<ModulesResponse[] | null> {
    const { data } = await axios.get<ModulesResponse[] | null>(`${import.meta.env.VITE_BACKEND_API_URL}/modules`);
    return data;
}

async function getTeachers(): Promise<SelectProps['options']> {
    const { data } = await axios.get<TeacherResponse[]>(`${import.meta.env.VITE_BACKEND_API_URL}/users`);
    const teachers = data.map((teacher) => ({
        label: teacher.name,
        value: teacher.name,
    }));
    return teachers;
}

async function getExams(): Promise<ExamResponse[] | null> {
    const { data } = await axios.get<ExamResponse[] | null>(`${import.meta.env.VITE_BACKEND_API_URL}/exams`);
    return data;
}

// Dropdown with the Version

const handleVersionDropChange = (value: string) => {
    // TODO: Neuer kurs vom backend fetchen basierend auf der version
};

function ExamFormRow(props: { exam: ExamResponse | EmptyExam; onClick: () => void; index: number }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item label={''} name={`examDesignation`} style={{ flex: 1, marginRight: '8px', marginBottom: '0px' }}>
                <Input type={'text'} placeholder={props.exam.designation} />
            </Form.Item>
            <Form.Item label={''} name={`examType`} style={{ flex: 1, marginRight: '8px', marginBottom: '0px' }}>
                <Input type={'text'} placeholder={props.exam.type} />
            </Form.Item>
            <Form.Item label={''} name={`examWeight`} style={{ flex: 1, marginRight: '8px', marginBottom: '0px' }}>
                <Input type={'text'} placeholder={props.exam.weight.toString()} />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button type={'text'} style={{ color: 'red' }} onClick={props.onClick(props.index)}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    );
}

export default function CourseCreation() {
    const [courseForm] = Form.useForm();
    const [examData, setExams] = useState<(ExamResponse | EmptyExam)[]>([]);

    // API Requests
    const { courseId = '1' } = useParams();
    invariant(courseId);

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

    // Add the course data teachers to the options array
    // TODO: Transformation direkt im API Request machen
    if (moduleData) {
        moduleData?.forEach((module) => {
            moduleOptions?.push({
                label: module.description,
                value: module.description,
            });
        });
    }

    const handleAddEmptyField = () => {
        // Create an empty exam data object
        const emptyExam = {
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
        setExams(updatedExamData);
    };

    console.log('courses', courseData);

    // Display
    return (
        // TODO: Alle CSS Styles extern im module.scss File definieren
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>
                        <BookOutlined />
                    </span>
                    <FormattedMessage id={'courseTitle'} defaultMessage={'Kurs'} description={'Übersicht Kurs Titel'} />
                </div>

                <div>
                    <Space wrap>
                        <Select
                            //defaultValue={''}
                            style={{ width: 120 }}
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
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: '1', width: '33.33%' }}>
                    <Form
                        // mit <> type definieren welche daten das form enthalten soll
                        // TODO: Intial values setzen anstelle von PLaceholder und für alle felder ein "name" property definieren
                        layout={'vertical'}
                        form={courseForm}
                        initialValues={courseData}
                        onFinish={(values) => {
                            console.log('Finish');
                            console.log(values);
                        }}
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
                                    <ContactsOutlined style={{ float: 'right' }} />
                                </div>
                            }
                        >
                            <Space style={{ width: '100%' }} direction={'vertical'}>
                                <Select
                                    mode={'multiple'}
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder={'Please select'}
                                    defaultValue={courseData?.teachers}
                                    options={teacherData}
                                />
                            </Space>
                        </Form.Item>
                        <Form.Item />
                    </Form>
                    <Space style={{ width: '100%' }} direction={'vertical'} />

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
                            <AppstoreAddOutlined style={{ float: 'right' }} />
                        </p>
                        <Space style={{ width: '100%' }} direction={'vertical'}>
                            <Select
                                mode={'multiple'}
                                allowClear
                                style={{ width: '100%' }}
                                placeholder={'Please select'}
                                defaultValue={moduleData?.map((value) => value.description)}
                                options={moduleOptions}
                            />
                        </Space>
                    </div>
                </div>

                <div
                    style={{
                        flex: '2',
                        width: '66.66%',
                        backgroundColor: colors.colorBgContainerHighlight,
                        borderRadius: layout.borderRadius,
                        marginLeft: '20px',
                    }}
                    className={styles.container}
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
                        <p>
                            <FormattedMessage id={'Titel'} defaultMessage={'Titel'} description={'Titel'} />
                        </p>
                        <Form form={courseForm} name={'exam-form'}>
                            {examData.map((exam, index) => (
                                // Todo: Komponente "ExamFormRow" erstellen und hier einfügen
                                <ExamFormRow key={index} exam={exam} onClick={handleAddEmptyField} index={index} />
                            ))}
                        </Form>
                    </div>
                    <Button type={'text'} style={{ background: 'primary' }} onClick={handleAddEmptyField}>
                        <FormattedMessage
                            id={'buttonAdd'}
                            defaultMessage={'+ Hinzufügen'}
                            description={'Hinzufuegen Button'}
                        />
                    </Button>
                </div>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <Button type={'primary'} className={styles.buttons}>
                    <FormattedMessage
                        id={'buttonCancel'}
                        defaultMessage={'Abbrechen'}
                        description={'Abbrechen Button'}
                    />
                </Button>

                <Button className={styles.buttons} htmlType={'submit'}>
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
                    onClick={() => {
                        console.log('Clicked');
                        console.log('form', courseForm, courseForm.getFieldsValue());
                        courseForm.submit();
                    }}
                >
                    <FormattedMessage id={'buttonSave'} defaultMessage={'Speichern'} description={'Speichern Button'} />
                </Button>
            </div>
        </div>
    );
}
