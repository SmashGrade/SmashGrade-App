import Rating from '@features/student/modules/Rating.tsx';
import styles from './Course.module.scss';

interface CourseProps {
    name: string;
}

export default function Course({ name }: CourseProps) {
    return (
        <div className={styles.courseContainer}>
            <p className={styles.courseTitle}>{name}</p>
            <Rating rating={5.5} ratingType={'good'} />
        </div>
    );
}
