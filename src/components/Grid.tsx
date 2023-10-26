import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/shared/interfaces';

export default function Grid<TData>(props: Readonly<AgGridReactProps<TData>>) {
    return (
        <div className={'ag-theme-alpine'} style={{ height: '100%' }}>
            <AgGridReact<TData> animateRows={true} {...props} />
        </div>
    );
}
