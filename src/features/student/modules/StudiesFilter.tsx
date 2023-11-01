import { Tabs, TabsProps } from 'antd';

interface Props {
    defaultActiveKey: string;
    tabsProps: TabsProps;
}

export default function StudiesFilter({ tabsProps, defaultActiveKey }: Props) {
    return (
        <>
            <Tabs
                defaultActiveKey={defaultActiveKey}
                items={[
                    { key: 'Grundstudium', label: 'Grundstudium' },
                    { key: 'Fachstudium', label: 'Fachstudium' },
                    { key: 'Schwerpunkt', label: 'Schwerpunkt' },
                ]}
                {...tabsProps}
            />
        </>
    );
}
