import { getValueGetter } from '@components/grid/columnFormatter.ts';
import Grid from '@components/grid/Grid.tsx';
import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { LinkButtonCellRenderer } from '@features/course/LinkButtonCellRenderer.tsx';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import axios from 'axios';
import { Route as CourseIndexRoute } from '../../routes/course/index.tsx';
import styles from './Course.module.scss';

interface Module {
  id: number;
  version: number;
  description: string;
  number: string;
  isActive: boolean;
}

interface Exam {
  id: number;
  description: string;
  weight: number;
  type: string;
}

interface Teacher {
  id: number;
  name: string;
}

export interface CourseResponse {
  id: number;
  version: number;
  description: string;
  number: string;
  versions: number[];
  modules: Module[];
  exams: Exam[];
  teachers: Teacher[];
}

const defaultCourseColDef: ColDef<CourseResponse> = {
  sortable: true,
  filter: 'agTextColumnFilter',
};

const courseColumnDefs: ColDef<CourseResponse>[] = [
  {
    field: 'id',
    headerName: '',
    filter: null,
    cellRenderer: LinkButtonCellRenderer,
    cellRendererParams: {
      from: CourseIndexRoute.to,
      to: '/course/$id',
    },
  },
  {
    field: 'id',
    headerName: 'ID',
    filter: 'agNumberColumnFilter',
    sort: 'asc',
  },
  { field: 'number', headerName: 'Course Number' },
  { field: 'description', headerName: 'Course Name', flex: 1 },
  {
    field: 'teachers',
    headerName: 'Teachers',
    flex: 1,
    valueGetter: getValueGetter('teachers', 'name'),
  },
  {
    field: 'modules',
    headerName: 'Modules',
    flex: 1,
    valueGetter: getValueGetter('modules', 'description'),
  },
  {
    field: 'exams',
    headerName: 'Exams',
    flex: 1,
    valueGetter: getValueGetter('exams', 'description'),
  },
];

export default function CourseList() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await axios.get<CourseResponse[]>('/course');
      return data;
    },
  });

  if (isError) return <div>Error when loading courses</div>;
  if (isPending) return <Spinner />;

  return (
    <div className={styles.courseContainer}>
      <Button type={'primary'} className={styles.addButton}>
        <Link
          from={CourseIndexRoute.to}
          to={'/course/new'}
          className={styles.addLink}
        >
          <MaterialIcon icon={'add'} size={'small'} />
          New Course
        </Link>
      </Button>

      <Grid<CourseResponse>
        columnDefs={courseColumnDefs}
        rowData={data}
        defaultColDef={defaultCourseColDef}
      />
    </div>
  );
}
