import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';
import { studentIndexRoute } from '@pages/routes/studentRoutes.ts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Spin } from 'antd';
import axios from 'axios';

interface CourseResponse {
    course: Course;
}

interface Course {
    exams: Exam[];
}

interface Exam {
    id: number;
    description: string;
}

async function getExams(id: number) {
    const { data } = await axios.get<CourseResponse>(`${import.meta.env.VITE_BACKEND_API_URL}/courseStudent/${id}`);
    return data.course.exams;
}

export default function StudentCourseDetailPage() {
    const { id } = useParams({ from: studentIndexRoute.id });
    console.log(id);
    const {
        isLoading: examsLoading,
        error: examsError,
        data: exams,
    } = useQuery({
        queryKey: ['studentExams', 1],
        //queryFn: () => getExams(id),
    });

    if (examsLoading) {
        return <Spin />;
    }

    if (examsError) {
        return <h2>Error</h2>;
    }

    return <>{exams[0].description}</>;
}
