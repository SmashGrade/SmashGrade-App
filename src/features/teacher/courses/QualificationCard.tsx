import { AuditOutlined } from '@ant-design/icons';
import Rating from '@features/student/modules/Rating.tsx';
import styles from '@pages/MyCoursePage.module.scss';

interface QualificationCardProps {
    name: string;
    weight: string;
    rating: number;
}

export default function QualificationCard(props: QualificationCardProps) {
    return (
        <div className={`${styles.outlined} ${styles.flexRow} ${styles.componentChildren}`}>
            <div className={styles.flexCol}>
                <h3>{props.name}</h3>
                <div className={styles.flexRowStart}>
                    <AuditOutlined />
                    <p>{props.weight}</p>
                </div>
            </div>
            <Rating rating={props.rating} />
        </div>
    );
}
