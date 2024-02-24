/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router';

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as SettingsImport } from './routes/settings';
import { Route as OnboardingImport } from './routes/onboarding';
import { Route as MyCourseImport } from './routes/my-course';
import { Route as IndexImport } from './routes/index';
import { Route as StudentIndexImport } from './routes/student/index';
import { Route as CurriculumIndexImport } from './routes/curriculum/index';
import { Route as CourseIndexImport } from './routes/course/index';
import { Route as ModuleIndexRouteImport } from './routes/module/index.route';
import { Route as StudentModulesImport } from './routes/student/modules';
import { Route as ModuleIdImport } from './routes/module/$id';
import { Route as CurriculumNewImport } from './routes/curriculum/new';
import { Route as CurriculumIdImport } from './routes/curriculum/$id';
import { Route as CourseIdImport } from './routes/course/$id';
import { Route as StudentCourseIdImport } from './routes/student/course.$id';
import { Route as ModuleCopyIdImport } from './routes/module/copy.$id';
import { Route as CurriculumCopyIdImport } from './routes/curriculum/copy.$id';

// Create Virtual Routes

const ModuleNewLazyImport = createFileRoute('/module/new')();
const CourseNewLazyImport = createFileRoute('/course/new')();

// Create/Update Routes

const SettingsRoute = SettingsImport.update({
    path: '/settings',
    getParentRoute: () => rootRoute,
} as any);

const OnboardingRoute = OnboardingImport.update({
    path: '/onboarding',
    getParentRoute: () => rootRoute,
} as any);

const MyCourseRoute = MyCourseImport.update({
    path: '/my-course',
    getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
    path: '/',
    getParentRoute: () => rootRoute,
} as any);

const StudentIndexRoute = StudentIndexImport.update({
    path: '/student/',
    getParentRoute: () => rootRoute,
} as any);

const CurriculumIndexRoute = CurriculumIndexImport.update({
    path: '/curriculum/',
    getParentRoute: () => rootRoute,
} as any);

const CourseIndexRoute = CourseIndexImport.update({
    path: '/course/',
    getParentRoute: () => rootRoute,
} as any);

const ModuleIndexRouteRoute = ModuleIndexRouteImport.update({
    path: '/module/',
    getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/module/index.route.lazy').then((d) => d.Route));

const ModuleNewLazyRoute = ModuleNewLazyImport.update({
    path: '/module/new',
    getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/module/new.lazy').then((d) => d.Route));

const CourseNewLazyRoute = CourseNewLazyImport.update({
    path: '/course/new',
    getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/course/new.lazy').then((d) => d.Route));

const StudentModulesRoute = StudentModulesImport.update({
    path: '/student/modules',
    getParentRoute: () => rootRoute,
} as any);

const ModuleIdRoute = ModuleIdImport.update({
    path: '/module/$id',
    getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/module/$id.lazy').then((d) => d.Route));

const CurriculumNewRoute = CurriculumNewImport.update({
    path: '/curriculum/new',
    getParentRoute: () => rootRoute,
} as any);

const CurriculumIdRoute = CurriculumIdImport.update({
    path: '/curriculum/$id',
    getParentRoute: () => rootRoute,
} as any);

const CourseIdRoute = CourseIdImport.update({
    path: '/course/$id',
    getParentRoute: () => rootRoute,
} as any);

const StudentCourseIdRoute = StudentCourseIdImport.update({
    path: '/student/course/$id',
    getParentRoute: () => rootRoute,
} as any);

const ModuleCopyIdRoute = ModuleCopyIdImport.update({
    path: '/module/copy/$id',
    getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/module/copy.$id.route.lazy').then((d) => d.Route));

const CurriculumCopyIdRoute = CurriculumCopyIdImport.update({
    path: '/curriculum/copy/$id',
    getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/': {
            preLoaderRoute: typeof IndexImport;
            parentRoute: typeof rootRoute;
        };
        '/my-course': {
            preLoaderRoute: typeof MyCourseImport;
            parentRoute: typeof rootRoute;
        };
        '/onboarding': {
            preLoaderRoute: typeof OnboardingImport;
            parentRoute: typeof rootRoute;
        };
        '/settings': {
            preLoaderRoute: typeof SettingsImport;
            parentRoute: typeof rootRoute;
        };
        '/course/$id': {
            preLoaderRoute: typeof CourseIdImport;
            parentRoute: typeof rootRoute;
        };
        '/curriculum/$id': {
            preLoaderRoute: typeof CurriculumIdImport;
            parentRoute: typeof rootRoute;
        };
        '/curriculum/new': {
            preLoaderRoute: typeof CurriculumNewImport;
            parentRoute: typeof rootRoute;
        };
        '/module/$id': {
            preLoaderRoute: typeof ModuleIdImport;
            parentRoute: typeof rootRoute;
        };
        '/student/modules': {
            preLoaderRoute: typeof StudentModulesImport;
            parentRoute: typeof rootRoute;
        };
        '/course/new': {
            preLoaderRoute: typeof CourseNewLazyImport;
            parentRoute: typeof rootRoute;
        };
        '/module/new': {
            preLoaderRoute: typeof ModuleNewLazyImport;
            parentRoute: typeof rootRoute;
        };
        '/module/': {
            preLoaderRoute: typeof ModuleIndexRouteImport;
            parentRoute: typeof rootRoute;
        };
        '/course/': {
            preLoaderRoute: typeof CourseIndexImport;
            parentRoute: typeof rootRoute;
        };
        '/curriculum/': {
            preLoaderRoute: typeof CurriculumIndexImport;
            parentRoute: typeof rootRoute;
        };
        '/student/': {
            preLoaderRoute: typeof StudentIndexImport;
            parentRoute: typeof rootRoute;
        };
        '/curriculum/copy/$id': {
            preLoaderRoute: typeof CurriculumCopyIdImport;
            parentRoute: typeof rootRoute;
        };
        '/module/copy/$id': {
            preLoaderRoute: typeof ModuleCopyIdImport;
            parentRoute: typeof rootRoute;
        };
        '/student/course/$id': {
            preLoaderRoute: typeof StudentCourseIdImport;
            parentRoute: typeof rootRoute;
        };
    }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
    IndexRoute,
    MyCourseRoute,
    OnboardingRoute,
    SettingsRoute,
    CourseIdRoute,
    CurriculumIdRoute,
    CurriculumNewRoute,
    ModuleIdRoute,
    StudentModulesRoute,
    CourseNewLazyRoute,
    ModuleNewLazyRoute,
    ModuleIndexRouteRoute,
    CourseIndexRoute,
    CurriculumIndexRoute,
    StudentIndexRoute,
    CurriculumCopyIdRoute,
    ModuleCopyIdRoute,
    StudentCourseIdRoute,
]);

/* prettier-ignore-end */
