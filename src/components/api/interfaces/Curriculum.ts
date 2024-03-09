import { DeletedAt, State } from '@components/api/interfaces/MetaInfo.ts';
import { Module } from '@components/api/interfaces/Module.ts';
import { User } from '@components/api/interfaces/User.ts';

export interface Curriculum {
    created: string;
    curriculumType: CurriculumType;
    deleted: DeletedAt | null;
    description: string;
    endValidity: string;
    focus: Focus;
    id: number;
    modules: Module;
    startvalidity: string;
    state: State;
    updated: string;
}

interface CurriculumType {
    created: string;
    deleted: DeletedAt | null;
    description: string;
    durationYears: number;
    id: number;
    updated: string;
}

interface Focus {
    created: string;
    deleted: DeletedAt | null;
    description: string;
    field: Field;
    id: number;
    updated: string;
}

export interface Field {
    created: string;
    deleted: DeletedAt | null;
    description: string;
    id: number;
    updated: string;
    users: User | null;
}