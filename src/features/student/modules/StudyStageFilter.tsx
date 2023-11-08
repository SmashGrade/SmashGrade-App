import { Tabs, TabsProps } from 'antd';
import { useIntl } from 'react-intl';

interface StudyStageFilter {
    defaultActiveKey: string;
    tabsProps: TabsProps;
}

export default function StudyStageFilter({ tabsProps, defaultActiveKey }: Readonly<StudyStageFilter>) {
    const intl = useIntl();
    return (
        <Tabs
            defaultActiveKey={defaultActiveKey}
            items={[
                {
                    key: '1',
                    label: intl.formatMessage({
                        id: 'student.basicStudies',
                        defaultMessage: 'Grundstudium',
                        description: 'Tab Grundstudium',
                    }),
                },
                {
                    key: '2',
                    label: intl.formatMessage({
                        id: 'student.specialisedStudies',
                        defaultMessage: 'Fachstudium',
                        description: 'Tab Fachstudium',
                    }),
                },
                {
                    key: '3',
                    label: intl.formatMessage({
                        id: 'student.focusStudies',
                        defaultMessage: 'Schwerpunkt',
                        description: 'Tab Schwerpunkt',
                    }),
                },
            ]}
            {...tabsProps}
        />
    );
}
