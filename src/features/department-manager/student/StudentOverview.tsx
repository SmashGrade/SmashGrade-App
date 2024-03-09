import { ColDef } from 'ag-grid-community';
import { Select } from 'antd';
import Grid from '@components/grid/Grid.tsx';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './StudentOverview.module.scss';

export interface StudentResponse {
    id: number;
    name: string;
}

export interface CourseResponse {
    name: string;
}

const testCourseData: CourseResponse[] = [
    {
        name: 'Test Course',
    },
    {
        name: 'Test Course 2',
    },
    {
        name: 'Test Course 3',
    },
    {
        name: 'Test Course 4',
    },
    {
        name: 'Test Course 5',
    },
    {
        name: 'Test Course 6',
    },
];

const studentTestData: StudentResponse[] = [
    {
        id: 1,
        name: 'Test Student',
    },
    {
        id: 2,
        name: 'Test Student 2',
    },
    {
        id: 3,
        name: 'Test Student 3',
    },
];

const defaultStudentColDef: ColDef<StudentResponse> = {
    sortable: true,
    filter: 'agTextColumnFilter',
};

function getColumnDefs(): ColDef<StudentResponse>[] {
    const columns: ColDef<StudentResponse>[] = [{ field: 'name', headerName: '' } as ColDef<StudentResponse>];

    const courseColumns = testCourseData.map((course) => {
        return { field: course.name, headerName: course.name } as ColDef<StudentResponse>;
    });

    columns.push(...courseColumns);

    return columns;
}

function getData(): StudentResponse[] {
    return studentTestData;
}

export default function StudentOverview() {
    return (
        <div className={styles.myStudentGrid}>
            <Select defaultValue={'1'}>
                <Select.Option value={'1'}>Option 1</Select.Option>
                <Select.Option value={'2'}>Option 2</Select.Option>
                <Select.Option value={'3'}>Option 3</Select.Option>
            </Select>

            <Select defaultValue={'2021'}>
                <Select.Option value={'2021'}>2021</Select.Option>
                <Select.Option value={'2022'}>2022</Select.Option>
                <Select.Option value={'2023'}>2023</Select.Option>
            </Select>
            <h2>Test</h2>

            <Grid<StudentResponse>
                columnDefs={getColumnDefs()}
                rowData={getData()}
                defaultColDef={defaultStudentColDef}
            />
        </div>
    );
}
