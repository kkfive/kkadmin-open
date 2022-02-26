import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const ispeak: AppRouteModule = {
  path: '/ispeak',
  name: 'ISpeak',
  component: LAYOUT,
  redirect: { name: 'ISpeakList' },
  meta: {
    orderNo: 10,
    icon: 'ant-design:highlight-outlined',
    title: 'Ispeak管理',
  },
  children: [
    {
      path: 'list',
      name: 'ISpeakList',
      component: () => import('/@/views/ispeak/ispeakList/index.vue'),
      meta: {
        // affix: true,
        title: 'Ispeak管理',
      },
    },
    {
      path: 'tag',
      name: 'ISpeakTag',
      component: () => import('/@/views/ispeak/ispeakTagList/index.vue'),
      meta: {
        title: 'Ispeak标签管理',
      },
    },
    {
      path: 'edit',
      name: 'ISpeakAdd',
      component: () => import('/@/views/ispeak/ipseakEditor/Editor.vue'),
      meta: {
        title: '新增speak',
        hideMenu: true,
      },
      children: [
        {
          path: ':id',
          name: 'ISpeakEdit',
          component: () => import('/@/views/ispeak/ipseakEditor/Editor.vue'),
          meta: {
            title: '编辑speak',
            hideMenu: true,
          },
        },
      ],
    },
  ],
};

export default ispeak;
