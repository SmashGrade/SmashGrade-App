import { Select, SelectProps } from 'antd';
import './SelectWithTitle.scss';

export interface SelectWithTitleProps {
    title: string;
    selectProps?: SelectProps;
}

export default function SelectWithTitle({ title, selectProps }: SelectWithTitleProps) {
    return (
        <div className={'select-with-title'}>
            <div className={'title'}>{title}</div>
            <div>
                <Select
                    className={'select-element'}
                    // This always sets the first value as default value, but can be overwritten by setting defaultValue inside selectProps
                    defaultValue={selectProps?.options?.[0] ? selectProps?.options[0].value : null}
                    {...selectProps}
                />
            </div>
        </div>
    );
}
