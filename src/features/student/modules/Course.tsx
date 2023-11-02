import Rating from '@features/student/modules/Rating.tsx';
import styles from './Course.module.scss';

interface Props {
    name: string;
}

export default function Course({ name }: Props) {
    return (
        <div className={styles.courseContainer}>
            <p className={styles.courseTitle}>{name}</p>
            <Rating rating={5.5} ratingType={'good'} />
        </div>
    );
}
