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
  ],
};

export default ispeak;
