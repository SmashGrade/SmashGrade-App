import { Tabs, TabsProps } from 'antd';

interface StudiesFilterProps {
    defaultActiveKey: string;
    tabsProps: TabsProps;
}

export default function StudiesFilter({ tabsProps, defaultActiveKey }: Readonly<StudiesFilterProps>) {
    return (
        <Tabs
            defaultActiveKey={defaultActiveKey}
            items={[
                { key: 'Grundstudium', label: 'Grundstudium' },
                { key: 'Fachstudium', label: 'Fachstudium' },
                { key: 'Schwerpunkt', label: 'Schwerpunkt' },
            ]}
            {...tabsProps}
        />
    );
}
