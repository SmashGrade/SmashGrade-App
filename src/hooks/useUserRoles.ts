import { useMsal } from '@azure/msal-react';

export enum UserRoles {
    Student = 'Student',
    Teacher = 'Dozent',
    CourseAdmin = 'Kursadministrator',
    DepartmentManager = 'Fachbereichsleiter',
}

export default function useUserRoles() {
    const instance = useMsal();
    const activeAccount = instance.accounts[0];
    return activeAccount.idTokenClaims?.roles as UserRoles[] | undefined;
}
