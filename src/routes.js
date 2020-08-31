import BasicLayout from '@/layouts/BasicLayout';
import PageMenuPage from '@/pages/PageMenu';
import DictionaryPage from '@/pages/Dictionary';
import EntityCreaterPage from '@/pages/EntityCreater';
import LogPage from '@/pages/Log';
import SqlPage from '@/pages/Sql';
import UserPage from '@/pages/User';
import RolePage from '@/pages/Role';
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
        path: '/dictionary',
        component: DictionaryPage,
      },
      {
        path: '/entitycreater',
        component: EntityCreaterPage,
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
        path: '/user',
        component: UserPage,
      },
      {
        path: '/role',
        component: RolePage,
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
