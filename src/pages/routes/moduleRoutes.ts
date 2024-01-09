import { lazyRouteComponent, Route } from '@tanstack/react-router';
import { z } from 'zod';
import { moduleRoute } from './routes.ts';

export const moduleIndexRoute = new Route({
    getParentRoute: () => moduleRoute,
    path: '/',
    component: lazyRouteComponent(() => import('@features/module/ModuleList.tsx')),
});

export const newModuleRoute = new Route({
    getParentRoute: () => moduleRoute,
    path: 'new',
    component: lazyRouteComponent(() => import('@features/module/NewModule.tsx')),
});

export const copyModuleRoute = new Route({
    getParentRoute: () => moduleRoute,
    path: 'copy/$id',
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
    component: lazyRouteComponent(() => import('@features/module/NewModule.tsx')),
});

export const moduleDetailRoute = new Route({
    getParentRoute: () => moduleRoute,
    path: '$id',
    parseParams: (params) => ({ id: z.number().int().parse(parseInt(params.id)) }),
    component: lazyRouteComponent(() => import('@features/module/ModuleDetail.tsx')),
});
