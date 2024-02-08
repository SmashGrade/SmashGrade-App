import {
  CourseCreationRequest,
  CourseUpdateRequest,
} from '@features/course-admin/interfaces/CourseData.ts';
import {
  ModuleCreateRequest,
  ModuleResponse,
} from '@features/course-admin/interfaces/ModuleData.ts';
import { UseMutationResult } from '@tanstack/react-query';
import { Button, Form, Input, Select, Switch } from 'antd';
import { useCallback } from 'react';
import styles from './ModuleForm.module.scss';

interface ModuleForm {
  number: string;
  title: string;
  evaluationType: string;
  curriculum: string[];
  studyPhase: string;
  status: boolean;
}

interface ModuleFormEditProps {
  moduleData: ModuleResponse;
  newModule?: false;
  mutation: UseMutationResult<void, Error, CourseUpdateRequest, unknown>;
}

interface ModuleFormNewProps {
  moduleData: CourseCreationRequest;
  newModule: true;
  mutation: UseMutationResult<void, Error, ModuleCreateRequest, unknown>;
}

type ModuleFormProps = ModuleFormEditProps | ModuleFormNewProps;

export function ModuleForm(props: Readonly<ModuleFormProps>) {
  const [moduleForm] = Form.useForm();

  const onCourseFormFinish = useCallback((formValues: ModuleForm) => {
    console.log('Form submitted');
    if (props.newModule) {
      props.mutation.mutate(formValues);
    }
  }, []);

  return (
    <div className={styles.moduleFormContainer}>
      <div className={styles.form}>
        <h2>Modul</h2>
        <Form<ModuleForm>
          form={moduleForm}
          layout={'vertical'}
          onFinish={onCourseFormFinish}
        >
          <Form.Item label={'Nummer'} name={'number'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Titel'} name={'title'}>
            <Input />
          </Form.Item>
          <Form.Item label={'Bewertungstyp'} name={'evaluationType'}>
            <Select
              options={[
                {
                  label:
                    'D - Modul bestanden, wenn der Durchschnitt der Kruse genügend ist (mehr als 60%)',
                  value: 'D',
                },
                { label: 'E', value: 'E' },
                { label: 'F', value: 'F' },
                { label: 'M', value: 'M' },
              ]}
            />
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
          <Form.Item label={'Lehrgang'} name={'studyPhase'}>
            <Select
              options={[
                { label: 'Grundstudium', value: 'baseStudy' },
                { label: 'Fachstudium', value: 'caseStudy' },
                { label: 'Schwerpunkt 3', value: 'focusStudy' },
              ]}
            />
          </Form.Item>
          <Form.Item label={'Status'} name={'status'}>
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
      </div>
    </div>
  );
}
