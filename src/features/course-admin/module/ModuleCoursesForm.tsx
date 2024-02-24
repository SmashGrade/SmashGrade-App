import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { AddCourseModal } from '@features/course-admin/module/AddCourseModal.tsx';
import { Button, List } from 'antd';
import { useState } from 'react';

interface ModuleCoursesFormProps {
    moduleCourses: ModuleResponseNew['courses'];
    module: ModuleResponseNew;
}

export function ModuleCoursesForm({ moduleCourses, module }: Readonly<ModuleCoursesFormProps>) {
    const [modalShown, setModalShown] = useState(false);
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
            <Button onClick={() => setModalShown(true)}>Hinzufügen</Button>
            <AddCourseModal modalShown={modalShown} setModalShown={setModalShown} module={module} />
        </>
    );
}
