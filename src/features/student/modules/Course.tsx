import Rating from '@features/student/modules/Rating.tsx';
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
            <p className={styles.courseTitle}>{course.description}</p>
            <Rating rating={course.grade} ratingType={'good'} />
        </div>
    );
}
