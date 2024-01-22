import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { Exam } from '@features/student/course/Exam.tsx';
import Rating from '@features/student/modules/Rating.tsx';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Divider, Spin } from 'antd';
import axios from 'axios';
import styles from './StudentCourseDetail.module.scss';

interface StudentCourseDetailProps {
    id: number;
}

interface CourseResponse {
    course: Course;
}

interface Course {
    description: string;
    exams: Exam[];
}

async function getCourse(id: number) {
    const { data } = await axios.get<CourseResponse>(`/courseStudent/${id}`);
    return data.course;
}

export default function StudentCourseDetail({ id }: Readonly<StudentCourseDetailProps>) {
    const {
        isLoading: examsLoading,
        error: examsError,
        data: course,
    } = useQuery({
        queryKey: ['studentCourse', id],
        queryFn: () => getCourse(id),
    });

    if (examsLoading) {
        return <Spin />;
    }

    if (examsError ?? !course) {
        return <h2>Error</h2>;
    }

    return (
        <>
            <div className={styles.courseTitleContainer}>
                <Link to={'/student/modules'} className={styles.backButton}>
                    <MaterialIcon icon={'arrow_back_ios_new'} size={'small'} />
                </Link>
                <h2>{course.description}</h2>
            </div>
            {course.exams.map((exam) => {
                return <Exam key={exam.id} exam={exam} />;
            })}
            <Divider />
            <div className={styles.courseRatingContainer}>
                <Rating rating={5.5} />
            </div>
        </>
    );
}
