import styles from '@pages/MyCoursePage.module.scss';
import { Tag } from 'antd';

interface GradePropertyProps {
    description: string;
    placeholder: string;
}

export default function GradeProperty(props: Readonly<GradePropertyProps>) {
    return (
        <div className={styles.baseFlexCol}>
            <p>{props.description}</p>
            <Tag style={{ fontSize: 'inherit', padding: 5 }}>{props.placeholder}</Tag>
        </div>
    );
}
