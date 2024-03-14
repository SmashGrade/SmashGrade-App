import Rating from '@features/student/modules/Rating.tsx';
import Grade from '@features/teacher/Grade.tsx';
import ExamProperty from '@features/teacher/ExamProperty.tsx';
import { getExam } from '@features/teacher/api/examApi.ts';
import styles from '@pages/MyCoursePage.module.scss';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface GradeListProps {
    examId: number;
    avgGrade: number;
}

function getWindowHeight() {
    return window.innerHeight;
}

function useWindowHeight() {
    const [windowHeight, setWindowHeight] = useState(getWindowHeight());

    useEffect(() => {
        function handleResize() {
            setWindowHeight(getWindowHeight());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowHeight;
}

export default function GradeList(props: Readonly<GradeListProps>) {
    const intl = useIntl();
    const calcHeight = useWindowHeight() * 0.25;
    const exam = useSuspenseQuery({
        queryKey: ['teacherGrades', props.examId],
        queryFn: () => getExam(props.examId),
    }).data;

    return (
        <div className={styles.gradeContainer}>
            <div className={`${styles.setWidth} ${styles.background}`}>
                <h3>{exam.description}</h3>
                <div className={styles.flexRowStart}>
                    <ExamProperty
                        description={intl.formatMessage({
                            id: 'grade.assessment',
                            defaultMessage: 'Bewertung',
                            description: 'Bewertung eines Qualifikationsnachweises',
                        })}
                        placeholder={exam.type}
                    />
                    <ExamProperty
                        description={intl.formatMessage({
                            id: 'grade.weighting',
                            defaultMessage: 'Gewichtung',
                            description: 'Gewichtung eines Qualifikationsnachweises',
                        })}
                        placeholder={(exam.weight * 100).toString() + '%'}
                    />
                </div>
            </div>
            <div className={`${styles.background} ${styles.setWidth}`}>
                <div style={{ overflowY: 'auto', height: exam.examEvaluations.length > 6 ? calcHeight : 'auto' }}>
                    {exam.examEvaluations.map((evaluation) => {
                        return (
                            <Grade
                                examId={props.examId}
                                evaluationId={evaluation.id}
                                studentId={evaluation.student.id}
                                studentName={evaluation.student.name}
                                field={evaluation.student.field}
                                rating={evaluation.grade}
                                key={evaluation.id}
                            />
                        );
                    })}
                </div>
                <Divider className={styles.divider} />
                <div className={`${styles.flexRowCenter} ${styles.baseInsetsLeftRight}`}>
                    <h3>
                        <FormattedMessage
                            id={'grade.average'}
                            description={'Durchschnitt einer Prüfung, Kurses, etc'}
                            defaultMessage={'Durchschnitt'}
                        />
                    </h3>
                    <Rating rating={props.avgGrade} />
                </div>
            </div>
        </div>
    );
}
