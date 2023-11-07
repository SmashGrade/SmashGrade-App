import { CourseResponse } from '@features/course/CourseList.tsx';
import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';
import { courseRoute } from '@pages/routes/routes.ts';
import { Link } from '@tanstack/react-router';
import { ICellRendererParams } from 'ag-grid-community';
import { Button } from 'antd';

export function OpenDetailButton(params: Readonly<ICellRendererParams<CourseResponse, number>>) {
    return (
        <Link
            from={courseRoute.to}
            to={courseDetailRoute.to}
            params={{
                id: params?.value ?? 0,
            }}
        >
            <Button>Open</Button>
        </Link>
    );
}
