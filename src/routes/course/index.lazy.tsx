import CourseList from '@features/course/CourseList.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/course/')({ component: CourseList });
