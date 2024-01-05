import CourseForm from '@features/course-admin/CourseForm.tsx';
import { CourseResponse } from '@features/course-admin/interfaces/CourseData.ts';

function NewCourse() {
    const newCourse: CourseResponse = {
        id: 99,
        version: 1,
        versions: [1],
        exams: [],
        modules: [],
        teachers: [],
        description: '',
        number: '',
    };

    return <CourseForm courseData={newCourse} />;
}

export default NewCourse;
