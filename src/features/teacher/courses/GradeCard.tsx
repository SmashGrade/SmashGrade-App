import { UserOutlined } from '@ant-design/icons';
import Rating from '@features/student/modules/Rating.tsx';
import styles from '@pages/MyCoursePage.module.scss';

interface GradeCardProps {
    studentName: string;
    field: string;
    rating: number;
}

export default function GradeCard(props: GradeCardProps) {
    return (
        <div className={`${styles.outlined} ${styles.gradeComponent}`}>
            <div className={styles.gradeComponent}>
                <UserOutlined />
                <div className={styles.componentChildren}>
                    <h3>{props.studentName}</h3>
                    <p>{props.field}</p>
                </div>
            </div>
            <Rating rating={props.rating} />
        </div>
    );
}
