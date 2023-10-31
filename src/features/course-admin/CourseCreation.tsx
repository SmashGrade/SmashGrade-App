import { SaveOutlined, BookOutlined, ContactsOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { invariant } from '@tanstack/react-router';
import { Button, Input, SelectProps, Space, Select, Spin } from 'antd';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import styles from './CourseCreation.module.scss';
import layout from '../../layout.module.scss';
import colors from '../../colors.module.scss';
import { useParams } from 'react-router-dom';

//const courseOptions: { label: string; value: string }[] = [];
const courseOptions: SelectProps['options'] = [];
const moduleOptions: SelectProps['options'] = [];
const teacherOptions: SelectProps['options'] = [];

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

interface TeacherResponse {
    id: number;
    classstartyear: string;
    name: string;
    email: string;
    role: 'Student' | 'Teacher' | 'CourseAdmin';
}

const handleChange = (value: string[]) => {
    value;
    //console.log(`selected ${value.toString()}`);
};

export default function CourseCreation() {
    const { courseId = 1 } = useParams();
    invariant(courseId);

    //console.log('this is the id ' + courseId);

    async function getCourse(): Promise<CourseResponse> {
        const { data } = await axios.get<CourseResponse>(`${import.meta.env.VITE_BACKEND_API_URL}/courses/${courseId}`);
        return data;
    }

    async function getModules(): Promise<ModulesResponse[] | null> {
        const { data } = await axios.get<ModulesResponse[] | null>(`${import.meta.env.VITE_BACKEND_API_URL}/modules`);
        return data;
    }

    async function getTeachers(): Promise<TeacherResponse[] | null> {
        const { data } = await axios.get<TeacherResponse[] | null>(`${import.meta.env.VITE_BACKEND_API_URL}/users`);
        return data;
    }
    const {
        isLoading: isCourseLoading,
        error: isCourseError,
        data: courseData,
    } = useQuery({
        queryKey: ['courses'],
        queryFn: getCourse,
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

    if (!courseId) {
        return <Spin />;
    }

    if (isCourseError) return <div>Error when loading courses</div>;
    if (isCourseLoading) return <Spin />;

    if (isModuleError) return <div>Error when loading modules</div>;
    if (isModuleLoading) return <Spin />;

    if (isTeacherError) return <div>Error when loading teachers</div>;
    if (isTeacherLoading) return <Spin />;

    // Clear the courseOptions and moduleOptions arrays to avoid doubling entries
    if (courseOptions) {
        courseOptions.length = 0;
    }
    if (moduleOptions) {
        moduleOptions.length = 0;
    }
    if (teacherOptions) {
        teacherOptions.length = 0;
    }

    // Add the course data teachers to the options array
    if (teacherData) {
        teacherData?.forEach((teacher) => {
            if (teacher.role === 'Teacher') {
                courseOptions?.push({
                    label: teacher.name,
                    value: teacher.name,
                });
            }
        });
    }

    // Add the course data teachers to the options array
    if (moduleData) {
        moduleData?.forEach((module) => {
            moduleOptions?.push({
                label: module.description,
                value: module.description,
            });
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <h1>
                {<BookOutlined />}
                <FormattedMessage id={'courseTitle'} defaultMessage={' Kurs'} description={'Übersicht Kurs Titel'} />
            </h1>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: '1', width: '33.33%' }}>
                    <p>
                        <FormattedMessage id={'courseTitle'} defaultMessage={'Kurs'} description={'Kurs Titel'} />
                    </p>
                    <Input placeholder={courseData?.description} />
                    <p>
                        <FormattedMessage
                            id={'courseNumber'}
                            defaultMessage={'Kurs Nummer'}
                            description={'Kurs Nummer'}
                        />
                    </p>
                    <Input placeholder={courseData?.number} />

                    <p>
                        <FormattedMessage
                            id={'lecturerTitle'}
                            defaultMessage={'Dozent(en)'}
                            description={'Name Dozent'}
                        />
                        <ContactsOutlined style={{ float: 'right' }} />
                    </p>
                    <Space style={{ width: '100%' }} direction={'vertical'}>
                        <Select
                            mode={'multiple'}
                            allowClear
                            style={{ width: '100%' }}
                            placeholder={'Please select'}
                            defaultValue={courseData?.teachers}
                            onChange={handleChange}
                            options={courseOptions}
                        />
                    </Space>

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
                                onChange={handleChange}
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
                                id={'moduleTitle'}
                                defaultMessage={'Modul(e)'}
                                description={'Module Title'}
                            />
                        </b>
                    </p>

                    <Button type={'text'}>
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

                <Button className={styles.buttons}>
                    <FormattedMessage
                        id={'buttonActivate'}
                        defaultMessage={'Aktivieren'}
                        description={'Speichern Button'}
                    />
                </Button>

                <Button type={'primary'} icon={<SaveOutlined />} className={styles.buttons}>
                    <FormattedMessage id={'buttonSave'} defaultMessage={'Speichern'} description={'Speichern Button'} />
                </Button>
            </div>
        </div>
    );
}
