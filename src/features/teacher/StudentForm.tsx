import { getExam } from '@features/teacher/api/examApi.ts';
import { Student } from '@features/teacher/interfaces/TeacherCourseData.ts';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CloseCircleFilled, PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useSuspenseQuery } from '@tanstack/react-query';
import styles from '@pages/MyCoursePage.module.scss';

interface StudentFormProps {
    examId: number;
}

// TODO: Add popup for adding students, needs to have a search field for adding students -> Modal component from antd
// TODO: Handle removing students
export default function StudentForm(props: Readonly<StudentFormProps>) {
    const intl = useIntl();
    const [openList, setOpenList] = useState<boolean>(false);

    const exam = useSuspenseQuery({
        queryKey: ['teacherGrades', props.examId],
        queryFn: () => getExam(props.examId),
    }).data;

    const [students, setStudents] = useState<Student[]>(exam.examEvaluations.map((evaluation) => evaluation.student));

    function handleCancel() {
        setOpenList(false);
    }

    function handleOk() {
        setOpenList(false);
        // TODO: Add student
        console.info('Add student');
    }

    const removeStudent = (studentId: number) => {
        setStudents(students.filter((student) => student.id !== studentId));
    };

    function openModal() {
        setOpenList(true);
    }

    return (
        <div className={`${styles.gradeContainer}`}>
            <div className={`${styles.background} ${styles.setWidth}`}>
                <div className={`${styles.background} ${styles.flexRowCenter}`}>
                    <h3>
                        <FormattedMessage
                            id={'teacher.courseParticipants'}
                            defaultMessage={'Teilnehmer'}
                            description={'Überschrift Teilnehmerliste'}
                        />
                    </h3>
                    <Button type={'primary'} icon={<PlusCircleFilled />} onClick={openModal} />
                </div>

                {students.map((student) => {
                    return (
                        <div key={student.id} className={`${styles.baseFlexCol} ${styles.outlined}`}>
                            <div className={styles.flexRowCenter}>
                                <UserOutlined />
                                <h3>{student.name}</h3>
                                <Button
                                    type={'primary'}
                                    icon={<CloseCircleFilled />}
                                    onClick={() => {
                                        removeStudent(student.id);
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}

                <Button style={{ float: 'right' }}>
                    <FormattedMessage
                        id={'button.save'}
                        defaultMessage={'Speichern'}
                        description={'Knopf zum Speichern von Änderungen'}
                    />
                </Button>
                <Button style={{ float: 'right' }}>
                    <FormattedMessage
                        id={'button.cancel'}
                        defaultMessage={'Abbrechen'}
                        description={'Knopf zum Abbrechen von Änderungen'}
                    />
                </Button>
            </div>
            <Modal
                open={openList}
                onCancel={handleCancel}
                onOk={handleOk}
                title={intl.formatMessage({
                    id: 'teacher.addStudent',
                    description: 'Studenten zu Kurs hinzufügen',
                    defaultMessage: 'Student(en) hinzufügen',
                })}
            >
                <p>Add student</p>
            </Modal>
            {/*<Modal
                open={openModal}
                onCancel={handleCancel}
                onOk={handleOk}
                title={intl.formatMessage({
                    id: 'teacher.addStudent',
                    description: 'Studenten zu Kurs hinzufügen',
                    defaultMessage: 'Student(en) hinzufügen',
                })}
            >
                <p>Add student</p>
            </Modal>
            <Modal
                open={openList}
                onCancel={handleCancel}
                onOk={handleOk}
                title={intl.formatMessage({
                    id: 'teacher.addStudent',
                    description: 'Studenten zu Kurs hinzufügen',
                    defaultMessage: 'Student(en) hinzufügen',
                })}
            >
                <p>Add student</p>
            </Modal>*/}
        </div>
    );
}
