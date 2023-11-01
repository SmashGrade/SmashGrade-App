import Course from '@features/student/modules/Course.tsx';
import Rating, { RatingType } from '@features/student/modules/Rating.tsx';
import { Collapse, CollapseProps, theme } from 'antd';
import { CSSProperties } from 'react';
import styles from './Modules.module.scss';

interface Props {
    activeFilter: string;
}

interface ModuleCollapseProps extends CollapseProps {
    study: string;
}

function getExtra(rating: number, ratingType: RatingType) {
    return (
        <div className={styles.extraContainer}>
            <Rating rating={rating} isModule={true} ratingType={ratingType} />
        </div>
    );
}

function getContent() {
    return (
        <>
            <Course name={'OOP1'} />
            <Course name={'OOP2'} />
        </>
    );
}

const items: (panelStyle: CSSProperties) => ModuleCollapseProps['items'] = (panelStyle) => [
    {
        key: '1',
        label: 'Mathematik',
        children: <p>{'Lorem ipsum dolor sit amet...'}</p>,
        extra: getExtra(5.5, 'good'),
        style: panelStyle,
        study: 'Grundstudium',
    },
    {
        key: '2',
        label: 'Systemtechnik',
        children: <p>{'Lorem ipsum dolor sit amet...'}</p>,
        extra: getExtra(2.3, 'bad'),
        style: panelStyle,
        study: 'Fachstudium',
    },
    {
        key: '4',
        label: 'Programmieren',
        children: getContent(),
        extra: getExtra(5.0, 'good'),
        style: panelStyle,
        study: 'Fachstudium',
    },
    {
        key: '3',
        label: 'Enterprise Technologien',
        children: <p>{'Lorem ipsum dolor sit amet...'}</p>,
        extra: getExtra(4.9, 'median'),
        style: panelStyle,
        study: 'Schwerpunkt',
    },
];

export default function Modules({ activeFilter }: Props) {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 12,
        fontWeight: 'bold',
        background: token.colorPrimary,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    const collapseItems = items(panelStyle)?.filter((item) => item.study == activeFilter);

    return (
        <>
            {collapseItems && collapseItems.length > 0 && <Collapse items={collapseItems} />}
            {!collapseItems || (collapseItems.length == 0 && <h2>No modules found</h2>)}
        </>
    );
}
