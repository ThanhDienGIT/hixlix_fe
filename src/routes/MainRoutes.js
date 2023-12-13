import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import StatisticalReport from 'pages/components-overview/StatisticalReport';
import ServiceManagement from 'pages/components-overview/ServiceManagement';
import SupplierManagement from 'pages/components-overview/SupplierManagement';
import UserManagement from 'pages/components-overview/UserManagement';
import StatisticalBO from 'pages/components-overview/StatisticalBO';


// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const ComponentTest = Loadable(lazy(() => import('pages/components-overview/ComponentTest')));
const AsignmentCustomerManager = Loadable(lazy(() => import('pages/components-overview/AsignmentCustomerManager')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ComponentTest />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'table',
      element: <ComponentTest/>
    },
    {
      path: 'statistical-report',
      element: <StatisticalReport/>
    },
    {
      path: 'asignment-customer',
      element: <AsignmentCustomerManager/>
    },
    {
      path: 'service-management',
      element: <ServiceManagement/>
    },
    {
      path: 'supplier-management',
      element: <SupplierManagement/>
    },
    {
      path: 'user-management',
      element: <UserManagement/>
    },
    {
      path: 'statistical-bo',
      element: <StatisticalBO/>
    }
    
  ]
};

export default MainRoutes;
