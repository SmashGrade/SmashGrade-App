import { Select, SelectProps } from 'antd';

export interface SelectWithTitleProps {
    title: string;
    selectProps?: SelectProps;
}

export default function SelectWithTitle({ title, selectProps }: SelectWithTitleProps) {
    return (
        <>
            {title}
            <Select
                style={{ width: 120 }}
                // This always sets the first value as default value, but can be overwritten by setting defaultValue inside selectProps
                defaultValue={selectProps?.options && selectProps?.options[0] ? selectProps?.options[0].value : null}
                {...selectProps}
            />
        </>
    );
}
