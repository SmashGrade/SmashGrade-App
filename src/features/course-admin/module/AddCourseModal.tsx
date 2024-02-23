import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { getCourses } from '@features/course-admin/course/courseApi.ts';
import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { updateModule } from '@features/course-admin/module/moduleApi.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message, Modal, Select } from 'antd';
import React, { useState } from 'react';

interface AddCourseModalProps {
  modalShown: boolean;
  setModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  module: ModuleResponseNew;
}
export function AddCourseModal({
  modalShown,
  setModalShown,
  module,
}: Readonly<AddCourseModalProps>) {
  const {
    isPending,
    isError,
    data: allCourses,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });
  const queryClient = useQueryClient();
  const updateModuleMutation = useMutation({
    mutationFn: updateModule,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['modules', module.id],
      });
      void queryClient.invalidateQueries({ queryKey: ['modules'] });
      void message.success('Modul erfolgreich aktualisiert');
    },
  });

  const [courses, setCourses] = useState<number[]>(
    module.courses.map((course) => course.id)
  );

  if (isError) return 'Courses failed to load';
  if (isPending) return <Spinner />;

  console.log('courses', courses);

  const onCourseModalConfirm = () => {
    const newModule = { ...module };
    // Filter allCourses to include only those whose id is in the current courseState (selected courses)
    const selectedCourses = allCourses.filter(
      (course) => courses.includes(course.id) // Assuming 'courses' state holds an array of selected course IDs
    );
    newModule.courses = selectedCourses;
    updateModuleMutation.mutate(module);
  };

  return (
    <Modal
      open={modalShown}
      onOk={onCourseModalConfirm}
      onCancel={() => setModalShown(false)}
      title={'Add Courses to Module'}
    >
      <Select
        value={courses}
        onChange={(values) => setCourses(values)}
        style={{ width: '100%' }}
        mode={'multiple'}
        showSearch={true}
        options={allCourses.map((course) => ({
          value: course.id,
          label: `${course.number} | ${course.description}`,
        }))}
      />
    </Modal>
  );
}
