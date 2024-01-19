import QualificationCard from '@features/teacher/courses/QualificationCard.tsx';
import styles from '@pages/MyCoursePage.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import axios from 'axios';

interface Qualification {
    name: string;
    weight: string;
    rating: number;
    key: number;
}

interface QualificationProps {
    readonly field: string;
    readonly subheading: string;
}

interface AvgGrade {
    id: number;
    description: string;
    grade: number;
}

interface Exam {
    id: number;
    description: string;
    weight: number;
    type: string;
    avgGrades: AvgGrade[];
}

interface TeacherCourseResponse {
    id: number;
    version: number;
    description: string;
    number: string;
    exams: Exam[];
}

const getExams = async (activeFilter: string): Promise<Qualification[]> => {
    const teacherCourseResponse = await axios.get<TeacherCourseResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/courseTeacher/${activeFilter}`
    );
    return teacherCourseResponse.data.exams.map((exam) => ({
        name: exam.description,
        weight: exam.weight.toString(),
        rating: exam.avgGrades[0].grade,
        key: exam.id,
    }));
};

export default function Qualification(props: QualificationProps) {
    const {
        isLoading: loading,
        error,
        data,
    } = useQuery({
        queryKey: ['qualifications'],
        queryFn: () => getExams(''),
    });

    if (loading) {
        return <Spin />;
    }

    if (error) {
        return <h2>Error</h2>;
    }

    if (data) {
        return (
            <div className={`${styles.proofOfQualification} ${styles.background}`}>
                <h3>{props.field}</h3>
                <p>{props.subheading}</p>
                <div className={styles.setWidth}>
                    {data.map((qualification) => {
                        return (
                            <QualificationCard
                                name={qualification.name}
                                weight={qualification.weight}
                                rating={qualification.rating}
                                key={qualification.key}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
