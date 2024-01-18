import Rating from '@features/student/modules/Rating.tsx';
import { Link } from '@tanstack/react-router';
import styles from './Course.module.scss';

export interface CourseObj {
    id: number;
    description: string;
    grade: number;
}

interface CourseProps {
    course: CourseObj;
}

export function Course({ course }: Readonly<CourseProps>) {
    return (
        <div className={styles.courseContainer}>
            <Link to={'/student/course/$id'} params={{ id: course.id }}>
                <p className={styles.courseTitle}>{course.description}</p>
            </Link>

            <Rating rating={course.grade} />
        </div>
    );
}
