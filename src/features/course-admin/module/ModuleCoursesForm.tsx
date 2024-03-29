import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { AddCourseModal } from '@features/course-admin/module/AddCourseModal.tsx';
import { Button, List } from 'antd';
import { useCallback, useState } from 'react';

interface ModuleCoursesFormProps {
    moduleCourses: ModuleResponseNew['courses'];
}

export function ModuleCoursesForm({ moduleCourses }: Readonly<ModuleCoursesFormProps>) {
    const [modalShown, setModalShown] = useState(false);

    const onCoursesEdit = useCallback(() => setModalShown(true), []);

    return (
        <>
            <List
                itemLayout={'horizontal'}
                dataSource={moduleCourses}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <List.Item.Meta title={item.number} description={item.description} />
                    </List.Item>
                )}
            />
            <Button onClick={onCoursesEdit}>Bearbeiten</Button>
            <AddCourseModal modalShown={modalShown} setModalShown={setModalShown} />
        </>
    );
}
