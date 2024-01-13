import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/shared/interfaces';
import React from 'react';

interface GridProps<TData> extends AgGridReactProps<TData> {
    gridRef?: React.RefObject<AgGridReact<TData>>;
}

export default function Grid<TData>(props: Readonly<GridProps<TData>>) {
    return (
        <div className={'ag-theme-alpine'} style={{ height: '100%' }}>
            <AgGridReact<TData> animateRows={true} suppressMenuHide={true} ref={props.gridRef} {...props} />
        </div>
    );
}
