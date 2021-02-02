import BasicLayout from '@/layouts/BasicLayout';
import PageMenuPage from '@/pages/PageMenu';
import CatalogPage from '@/pages/Catalog';
import EntityNamePage from '@/pages/EntityName';
import LogPage from '@/pages/Log';
import SqlPage from '@/pages/Sql';
import DataFormPage from '@/pages/DataForm';
import DataTablePage from '@/pages/DataTable';
import AppServicePage from '@/pages/AppService';
import UserPage from '@/pages/User';
import ApiPage from '@/pages/Api';
import PageFunctionPage from '@/pages/PageFunction';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/pagemenu',
        component: PageMenuPage,
      },
      {
        path: '/catalog',
        component: CatalogPage,
      },
      {
        path: '/entitycreater',
        component: EntityNamePage,
      },
      {
        path: '/log',
        component: LogPage,
      },
      {
        path: '/sql',
        component: SqlPage,
      },
      {
        path: '/dataform',
        component: DataFormPage,
      },
      {
        path: '/dataTable',
        component: DataTablePage,
      },
      {
        path: '/appService',
        component: AppServicePage,
      },
      {
        path: '/user',
        component: UserPage,
      },
      {
        path: '/api',
        component: ApiPage,
      },
      {
        path: '/pagefunction',
        component: PageFunctionPage,
      },
    ],
  },
];
export default routerConfig;
