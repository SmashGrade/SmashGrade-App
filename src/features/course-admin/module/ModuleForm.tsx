import {
  ModuleCreateRequest,
  ModuleResponseNew,
} from '@features/course-admin/interfaces/ModuleData.ts';
import { ModuleCoursesForm } from '@features/course-admin/module/ModuleCoursesForm.tsx';
import { UseMutationResult } from '@tanstack/react-query';
import { Button, Form, Input, Select, Switch } from 'antd';
import { useCallback } from 'react';
import styles from './ModuleForm.module.scss';

export interface ModuleForm {
  number: string;
  description: string;
  evaluationType: string;
  curriculum: string[];
  studyStage: number;
  isActive: boolean;
}

interface ModuleFormEditProps {
  moduleData: ModuleResponseNew;
  newModule?: false;
  mutation: UseMutationResult<void, Error, ModuleResponseNew, unknown>;
}

interface ModuleFormNewProps {
  moduleData: ModuleResponseNew;
  newModule: true;
  mutation: UseMutationResult<void, Error, ModuleCreateRequest, unknown>;
}

type ModuleFormProps = ModuleFormEditProps | ModuleFormNewProps;

const evaluationCategories = [
  {
    label:
      'D - Modul bestanden, wenn der Durchschnitt der Kruse genügend ist (mehr als 60%)',
    value: 'D',
  },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'M', value: 'M' },
];

const studyStages = [
  { label: 'Grundstudium', value: 1 },
  { label: 'Fachstudium', value: 2 },
  { label: 'Schwerpunkt 3', value: 3 },
];

export function ModuleForm({
  newModule,
  moduleData,
  mutation,
}: Readonly<ModuleFormProps>) {
  const [moduleForm] = Form.useForm();

  const initialFormValues: ModuleForm = {
    ...moduleData,
    evaluationType: moduleData.valuationCategory.code,
    studyStage: moduleData.studyStage.id,
    curriculum: [],
  };

  const onCourseFormFinish = useCallback(
    (formValues: ModuleForm) => {
      if (newModule) {
        const evaluationCategory = evaluationCategories.find(
          (category) => category.value === formValues.evaluationType
        ) ?? {
          label: '',
          value: '',
        };

        const studyStage = studyStages.find(
          (stage) => stage.value === formValues.studyStage
        ) ?? {
          label: 'None',
          value: 0,
        };
        const payload: ModuleCreateRequest = {
          ...formValues,
          version: 1,
          valuationCategory: {
            code: evaluationCategory.value,
            description: evaluationCategory.label,
          },
          studyStage: {
            id: studyStage.value,
            description: studyStage.label,
          },
          courses: [],
        };
        mutation.mutate(payload);
      }
    },
    [mutation, newModule]
  );

  return (
    <div className={styles.moduleFormContainer}>
      <div className={styles.form}>
        <h2>Modul</h2>
        <Form<ModuleForm>
          form={moduleForm}
          layout={'vertical'}
          initialValues={initialFormValues}
          onFinish={onCourseFormFinish}
        >
          <Form.Item label={'Nummer'} name={'number'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Titel'} name={'description'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Bewertungstyp'} name={'evaluationType'}>
            <Select options={evaluationCategories} />
          </Form.Item>
          <Form.Item label={'Lehrplan'} name={'curriculum'}>
            <Select
              mode={'multiple'}
              options={[
                { label: 'Lehrplan 1', value: 'lehrplan1' },
                { label: 'Lehrplan 2', value: 'lehrplan2' },
                { label: 'Lehrplan 3', value: 'lehrplan3' },
              ]}
            />
          </Form.Item>
          <Form.Item label={'Lehrgang'} name={'studyStage'}>
            <Select options={studyStages} />
          </Form.Item>
          <Form.Item label={'Status'} name={'isActive'}>
            <Switch checkedChildren={'Aktiv'} unCheckedChildren={'Inaktiv'} />
          </Form.Item>

          <div className={styles.buttonContainer}>
            <Button htmlType={'reset'}>Abbrechen</Button>
            <Button type={'primary'} htmlType={'submit'}>
              Speichern
            </Button>
          </div>
        </Form>
      </div>
      <div className={styles.course}>
        <h2>Kurse</h2>
        <ModuleCoursesForm
          moduleCourses={moduleData.courses ?? []}
          module={moduleData}
        />
      </div>
    </div>
  );
}
