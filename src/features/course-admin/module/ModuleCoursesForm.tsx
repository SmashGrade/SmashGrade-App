import { Spinner } from '@components/ui-elements/Spinner';
import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { CourseResponse } from '@features/course/CourseList.tsx';
import { useQuery } from '@tanstack/react-query';
import { Button, List } from 'antd';
import axios from 'axios';

interface ModuleCoursesFormProps {
  moduleCourses: ModuleResponseNew['courses'];
}

export function ModuleCoursesForm({
  moduleCourses,
}: Readonly<ModuleCoursesFormProps>) {
  const {
    isPending,
    isError,
    data: availableCourses,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await axios.get<CourseResponse[]>('/course');
      return data;
    },
  });

  if (isError) return <div>Error when loading courses</div>;
  if (isPending) return <Spinner />;

  return (
    <>
      <List
        itemLayout={'horizontal'}
        dataSource={moduleCourses}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={item.number}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <Button>Hinzufügen</Button>
    </>
  );
}
