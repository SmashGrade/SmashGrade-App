import Rating from '@features/student/modules/Rating.tsx';
import { studentCourseRoute } from '@pages/routes/routes.ts';
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
            <Link to={studentCourseRoute.to} params={{ id: 1 }}>
                <p className={styles.courseTitle}>{course.description}</p>
            </Link>

            <Rating rating={course.grade} />
        </div>
    );
}
