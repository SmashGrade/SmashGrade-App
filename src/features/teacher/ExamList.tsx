import StudentForm from '@features/teacher/StudentForm.tsx';
import GradeList from '@features/teacher/GradeList.tsx';
import Exam from '@features/teacher/Exam.tsx';
import { getExams } from '@features/teacher/api/courseApi.ts';
import { TeacherExam } from '@features/teacher/interfaces/TeacherCourseData.ts';
import styles from '@pages/MyCoursePage.module.scss';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button, Menu } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { MenuInfo } from 'node_modules/rc-menu/lib/interface';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface ExamListProps {
    field: string;
    courseId: number;
}

export default function ExamList(props: Readonly<ExamListProps>) {
    const intl = useIntl();
    const exams = useSuspenseQuery({
        queryKey: ['teacherExams', props.courseId],
        queryFn: () => getExams(props.courseId),
    }).data;

    const [editStudents, setEditStudents] = useState(false);
    const [currentExam, setCurrentExam] = useState<TeacherExam>(exams[0]);
    const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);

    // Used to update the selected exam and current menu index if the courseId changes
    useEffect(() => {
        setCurrentExam(exams[0]);
        setCurrentMenuIndex(0);
    }, [props.courseId, exams]);

    const menuOnClick = useCallback(
        (e: MenuInfo) => {
            setCurrentExam(exams[parseInt(e.key)]);
            setCurrentMenuIndex(parseInt(e.key));
        },
        [exams]
    );

    return (
        <div className={styles.flexRowStart} style={{ flex: 'content' }}>
            <div className={`${styles.proofOfQualification} ${styles.background}`}>
                <h3>{props.field}</h3>
                <Button
                    type={'default'}
                    icon={<EditFilled />}
                    size={'large'}
                    onClick={function () {
                        setEditStudents(!editStudents);
                    }}
                >
                    {editStudents
                        ? intl.formatMessage({
                              id: 'teacher.editGrades',
                              description: 'Kursnoten bearbeiten',
                              defaultMessage: 'Kursnoten bearbeiten',
                          })
                        : intl.formatMessage({
                              id: 'teacher.editStudents',
                              description: 'Kursteilnehmer bearbeiten',
                              defaultMessage: 'Teilnehmer bearbeiten',
                          })}
                </Button>
                <p>
                    {intl.formatMessage({
                        id: 'course.qualification',
                        description: 'Qualifikationsnachweise eines Kurses',
                        defaultMessage: 'Qualifikationsnachweise',
                    })}
                </p>
                <Menu
                    onClick={menuOnClick}
                    selectedKeys={[currentMenuIndex.toString()]}
                    className={styles.menu}
                    style={{ width: '90%' }}
                >
                    {exams.map((exam, index) => (
                        <Menu.Item
                            key={index.toString()}
                            icon={
                                <Exam
                                    id={exam.id}
                                    name={exam.description}
                                    rating={exam.avgGrade}
                                    weight={exam.weight}
                                />
                            }
                            style={{ height: '100px' }}
                        />
                    ))}
                </Menu>
            </div>
            {editStudents ? (
                <StudentForm examId={currentExam.id} />
            ) : (
                <GradeList examId={currentExam.id} avgGrade={currentExam.avgGrade} />
            )}
        </div>
    );
}
