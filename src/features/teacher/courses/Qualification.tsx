import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spin } from 'antd';

import QualificationCard from '@features/teacher/courses/QualificationCard.tsx';
import styles from '@pages/MyCoursePage.module.scss';

interface Qualification {
    name: string;
    weight: string;
    rating: number;
}

interface QualificationProps {
    field: string;
    subheading: string;
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

const getCourses = async (activeFilter: string): Promise<Qualification[]> => {
    const teacherCourseResponse = await axios.get<TeacherCourseResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/courseTeacher/${activeFilter}`
    );
    return teacherCourseResponse.data.exams.map((exam) => ({
        name: exam.description,
        weight: exam.weight.toString(),
        rating: exam.avgGrades[0].grade,
    }));
};

export default function Qualification(props: QualificationProps) {
    const {
        isLoading: loading,
        error: error,
        data: data,
    } = useQuery({
        queryKey: [],
        queryFn: () => getCourses(''),
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
                    {data.map((qualification, index) => {
                        return (
                            <QualificationCard
                                name={qualification.name}
                                weight={qualification.weight}
                                rating={qualification.rating}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
