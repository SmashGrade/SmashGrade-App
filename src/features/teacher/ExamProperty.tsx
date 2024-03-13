import styles from '@pages/MyCoursePage.module.scss';
import { Tag } from 'antd';

interface ExamPropertyProps {
    description: string;
    placeholder: string;
}

export default function ExamProperty(props: Readonly<ExamPropertyProps>) {
    return (
        <div className={styles.baseFlexCol}>
            <p>{props.description}</p>
            <Tag style={{ fontSize: 'inherit', padding: 5 }}>{props.placeholder}</Tag>
        </div>
    );
}
