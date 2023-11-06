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
                { key: 'Grundstudium', label: 'Grundstudium' },
                { key: 'Fachstudium', label: 'Fachstudium' },
                { key: 'Schwerpunkt', label: 'Schwerpunkt' },
            ]}
            {...tabsProps}
        />
    );
}
