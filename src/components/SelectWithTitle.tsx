import { Select, SelectProps } from 'antd';
import styles from './SelectWithTitle.module.scss';

export interface SelectWithTitleProps {
    title: string;
    selectProps?: SelectProps;
}

export default function SelectWithTitle({ title, selectProps }: SelectWithTitleProps) {
    return (
        <div className={styles.selectWithTitleContainer}>
            <div className={styles.title}>{title}</div>
            <Select
                className={styles.selectElement}
                // This always sets the first value as default value, but can be overwritten by settings defaultValue inside selectProps
                defaultValue={selectProps?.options?.[0] ? selectProps?.options[0].value : null}
                {...selectProps}
            />
        </div>
    );
}
