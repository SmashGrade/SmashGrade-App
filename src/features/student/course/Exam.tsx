import { InputNumber } from 'antd';
import styles from './Exam.module.scss';

export interface Exam {
    id: number;
    description: string;
}

interface ExamProps {
    exam: Exam;
}

function saveExam(value: number) {
    if (value) {
        // send to backend
        console.error(value);
    }
}

export function Exam({ exam }: Readonly<ExamProps>) {
    return (
        <div key={exam.id} className={styles.examContainer}>
            <div className={styles.examLabelContainer}>
                <b>{exam.description}</b>
            </div>
            <div className={styles.examInputContainer}>
                <InputNumber
                    controls={false}
                    size={'large'}
                    step={0.1}
                    min={1}
                    max={6}
                    className={styles.examInput}
                    onBlur={(value) => {
                        saveExam(parseFloat(value.target.value));
                    }}
                />
            </div>
        </div>
    );
}
