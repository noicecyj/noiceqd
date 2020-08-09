const headerMenuConfig = [];
const asideMenuConfig = [
  {
    name: '开发工具',
    path: '/tool',
    icon: 'set',
    children: [
      {
        name: '菜单',
        path: '/pagemenu',
      },
      {
        name: '数据字典',
        path: '/dictionary',
      },
      {
        name: '实体生成器',
        path: '/entitycreater',
      },
    ],
  },
];
export { headerMenuConfig, asideMenuConfig };
