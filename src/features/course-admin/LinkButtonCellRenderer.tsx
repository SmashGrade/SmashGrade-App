import { MaterialIconButton } from '@components/ui-elements/MaterialIconButton.tsx';
import { Link } from '@tanstack/react-router';
import { ICellRendererParams } from 'ag-grid-community';

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
            <MaterialIconButton icon={'search'} size={'middle'} title={'Open'} />
        </Link>
    );
}
