import { Link } from '@tanstack/react-router';
import { ICellRendererParams } from 'ag-grid-community';
import { Button } from 'antd';

interface LinkButtonCellRendererProps<T> extends Readonly<ICellRendererParams<T, number>> {
    from: string;
    to: string;
}

export function LinkButtonCellRenderer<T>({ from, to, value }: Readonly<LinkButtonCellRendererProps<T>>) {
    return (
        <Link
            from={from}
            to={to}
            params={{
                id: value ?? 0,
            }}
        >
            <Button>Open</Button>
        </Link>
    );
}
