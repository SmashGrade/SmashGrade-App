import {
  ModuleCreateRequest,
  ModuleResponseNew,
} from '@features/course-admin/interfaces/ModuleData.ts';
import axios from 'axios';

export async function getModules(): Promise<ModuleResponseNew[]> {
  const { data: modules } = await axios.get<ModuleResponseNew[]>('/modules');
  return modules;
}

export async function deleteModuleById(id: number): Promise<void> {
  console.debug('Module to delete: ' + id);
  await axios.delete('/modules/${id}');
}

export async function createModule(module: ModuleCreateRequest): Promise<void> {
  console.debug('Module to create:', module);
  await axios.post('/modules', module);
}

export async function getModule(id: number): Promise<ModuleResponseNew> {
  const { data: module } = await axios.get<ModuleResponseNew>(`/modules/${id}`);
  return module;
}

export async function updateModule(module: ModuleResponseNew): Promise<void> {
  await axios.put('/module/${module.id}', module);
}
