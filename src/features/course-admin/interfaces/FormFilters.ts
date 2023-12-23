import { CourseFilter } from '@features/course-admin/interfaces/CourseData.ts';
import { SelectProps } from 'antd';

export interface FormFilters extends CourseFilter {
    moduleOptions: SelectProps['options'];
    teacherOptions: SelectProps['options'];
}
