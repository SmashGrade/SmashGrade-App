import { getCourse } from '@features/course-admin/courseApi.ts';
import CourseForm from '@features/course-admin/CourseForm.tsx';
import { CourseResponse } from '@features/course-admin/interfaces/CourseData.ts';
import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Spin } from 'antd';

export function CourseEdit() {
    const { id } = useParams({ from: courseDetailRoute.id });
    const courseId = id ?? 1;

    const {
        isLoading: isCourseLoading,
        error: isCourseError,
        data: courseData,
    } = useQuery<CourseResponse>({
        queryKey: ['courses', courseId],
        queryFn: () => getCourse(courseId),
    });

    // Display loading and error states

    if (isCourseError) return <div>Error when loading courses</div>;
    if (isCourseLoading) return <Spin />;

    return <>{courseData && <CourseForm courseData={courseData} />}</>;
}
