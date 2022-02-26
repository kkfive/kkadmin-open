import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const account: AppRouteModule = {
  path: '/setting',
  name: 'Setting',
  component: LAYOUT,
  redirect: '/setting/account/personal',
  meta: {
    orderNo: 20,
    icon: 'ion:aperture-outline',
    title: '设置',
  },
  children: [
    {
      path: 'personal',
      name: 'AccountSetting',
      component: () => import('/@/views/account/setting/index.vue'),
      meta: {
        title: '个人设置',
      },
    },
    {
      path: 'password',
      name: 'PasswordSetting',
      component: () => import('/@/views/account/password/index.vue'),
      meta: {
        title: '修改密码',
      },
    },
  ],
};

export default account;
