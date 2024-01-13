import { AuditOutlined } from '@ant-design/icons';
import Rating from '@features/student/modules/Rating.tsx';
import styles from '@pages/MyCoursePage.module.scss';

interface QualificationCardProps {
    readonly name: string;
    readonly weight: string;
    readonly rating: number;
}

export default function QualificationCard(props: QualificationCardProps) {
    return (
        <div className={`${styles.outlined} ${styles.flexRowCenter} ${styles.componentChildren}`}>
            <div className={styles.baseFlexCol}>
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
