import { AuditOutlined } from '@ant-design/icons';
import Rating from '@features/student/modules/Rating.tsx';
import styles from '@pages/MyCoursePage.module.scss';

interface ExamProps {
    name: string;
    weight: number;
    rating: number;
}

export default function Exam(props: Readonly<ExamProps>) {
    return (
        <div className={`${styles.examOutline} ${styles.flexRowCenter} ${styles.componentChildren}`}>
            <div className={styles.baseFlexCol}>
                <p>{props.name}</p>
                <div className={styles.flexRowCenter}>
                    <AuditOutlined />
                    <p>{(props.weight * 100).toString() + '%'}</p>
                </div>
            </div>
            <Rating rating={props.rating} />
        </div>
    );
}
