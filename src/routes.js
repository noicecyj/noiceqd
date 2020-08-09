import BasicLayout from '@/layouts/BasicLayout';
import PageMenuPage from '@/pages/PageMenu';
import DictionaryPage from '@/pages/Dictionary';
import EntityCreaterPage from '@/pages/EntityCreater';
import LogPage from '@/pages/Log';

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
    ],
  },
];
export default routerConfig;
