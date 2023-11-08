import { Tabs, TabsProps } from 'antd';

interface StudyStageFilter {
    defaultActiveKey: string;
    tabsProps: TabsProps;
}

export default function StudyStageFilter({ tabsProps, defaultActiveKey }: Readonly<StudyStageFilter>) {
    return (
        <Tabs
            defaultActiveKey={defaultActiveKey}
            items={[
                { key: '1', label: 'Grundstudium' },
                { key: '2', label: 'Fachstudium' },
                { key: '3', label: 'Schwerpunkt' },
            ]}
            {...tabsProps}
        />
    );
}
