import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { getCourses } from '@features/course-admin/course/courseApi.ts';
import { useQuery } from '@tanstack/react-query';
import { Form, Modal, Select } from 'antd';
import React, { useCallback } from 'react';

interface AddCourseModalProps {
    modalShown: boolean;
    setModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddCourseModal({ modalShown, setModalShown }: Readonly<AddCourseModalProps>) {
    const {
        isPending,
        isError,
        data: allCourses,
    } = useQuery({
        queryKey: ['courses'],
        queryFn: getCourses,
    });

    const onCourseModalConfirm = useCallback(() => {
        setModalShown(false);
    }, [setModalShown]);

    const onModalCancel = useCallback(() => setModalShown(false), [setModalShown]);

    if (isError) return 'Courses failed to load';
    if (isPending) return <Spinner />;

    return (
        <Modal open={modalShown} onOk={onCourseModalConfirm} onCancel={onModalCancel} title={'Add Courses to Module'}>
            <Form.Item name={'coursesRef'}>
                <Select
                    style={{ width: '100%' }}
                    mode={'multiple'}
                    showSearch={true}
                    options={allCourses.map((course) => ({
                        value: course.id,
                        label: `${course.number} | ${course.description}`,
                    }))}
                />
            </Form.Item>
        </Modal>
    );
}
