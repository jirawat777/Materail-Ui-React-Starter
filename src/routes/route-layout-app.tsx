import { lazy } from 'react';
import routeLink from './route-link';
import React from 'react';
import { Redirect } from 'react-router';

const exact = true;

export default [
    { exact, path: routeLink.admin.dashboard, component: lazy(() => import('src/views/dashboard')) },
    { exact, path: routeLink.admin.dashboardForm, component: lazy(() => import('src/views/dashboard/form')) },
    { component: () => <Redirect to={routeLink.error404} /> },
]