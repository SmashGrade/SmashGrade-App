import { CourseResponse } from '@features/course/CourseList.tsx';
import { Link } from '@tanstack/react-router';
import { ICellRendererParams } from 'ag-grid-community';
import { Button } from 'antd';

export function LinkButtonCellRenderer(params: Readonly<ICellRendererParams<CourseResponse, number>>) {
    return (
        <Link
            from={'/course'}
            to={'/course/$id'}
            params={{
                id: params?.value ?? 0,
            }}
        >
            <Button>Open</Button>
        </Link>
    );
}
