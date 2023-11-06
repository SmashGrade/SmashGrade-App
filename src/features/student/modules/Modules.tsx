import Course from '@features/student/modules/Course.tsx';
import Rating from '@features/student/modules/Rating.tsx';
import { Collapse } from 'antd';
import { ItemType } from 'rc-collapse/es/interface';
import { CSSProperties } from 'react';

type ModuleCollapseItemProps = ItemType & {
    study: string;
};

const panelStyle: CSSProperties = {
    fontWeight: 'bold',
    border: 'none',
};

const items: ModuleCollapseItemProps[] = [
    {
        key: '1',
        label: 'Mathematik',
        children: <p>{'Lorem ipsum dolor sit amet...'}</p>,
        extra: <Rating rating={5.5} ratingType={'good'} />,
        style: panelStyle,
        study: 'Grundstudium',
    },
    {
        key: '2',
        label: 'Systemtechnik',
        children: <p>{'Lorem ipsum dolor sit amet...'}</p>,
        extra: <Rating rating={2.3} ratingType={'bad'} />,
        style: panelStyle,
        study: 'Fachstudium',
    },
    {
        key: '4',
        label: 'Programmieren',
        children: (
            <>
                <Course name={'OOP1'} />
                <Course name={'OOP2'} />
            </>
        ),
        extra: <Rating rating={5.0} ratingType={'good'} />,
        style: panelStyle,
        study: 'Fachstudium',
    },
    {
        key: '3',
        label: 'Enterprise Technologien',
        children: <p>{'Lorem ipsum dolor sit amet...'}</p>,
        extra: <Rating rating={4.9} ratingType={'median'} />,
        style: panelStyle,
        study: 'Schwerpunkt',
    },
];

interface ModulesProps {
    activeFilter: string;
}

export default function Modules({ activeFilter }: ModulesProps) {
    const collapseItems = items.filter((item) => item.study === activeFilter);
    return collapseItems.length > 0 ? <Collapse items={collapseItems} /> : <h2>No modules found</h2>;
}
