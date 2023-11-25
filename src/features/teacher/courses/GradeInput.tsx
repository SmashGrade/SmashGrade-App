import styles from '@pages/MyCoursePage.module.scss';
import { Input } from 'antd';

interface GradeInputProps {
    description: string;
    placeholder: string;
}

export default function GradeInput(props: GradeInputProps) {
    return (
        <div className={styles.flexCol}>
            <p>{props.description}</p>
            <Input placeholder={props.placeholder} />
        </div>
    );
}
