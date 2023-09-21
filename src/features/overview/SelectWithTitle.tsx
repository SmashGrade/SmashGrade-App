import { Select } from 'antd';
import React from 'react';

interface SelectWithTitleProps {
    title: string;
    /* eslint-disable */
    selectOptions: Array<Record<string, any>>;
    onChange?: React.Dispatch<React.SetStateAction<number>>;
}

export default function SelectWithTitle({ title, selectOptions, onChange }: SelectWithTitleProps) {
    return (
        <>
            {title}
            <Select
                style={{ width: 120 }}
                // defaultValue={startYears[0].value}
                options={selectOptions}
                onChange={onChange}
            />
        </>
    );
}
