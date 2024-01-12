import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/shared/interfaces';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export default function Grid<TData>(props: Readonly<AgGridReactProps<TData>>) {
    return (
        <div className={'ag-theme-alpine'} style={{ height: '100%' }}>
            <AgGridReact<TData> animateRows={true} suppressMenuHide={true} {...props} />
        </div>
    );
}
