import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: 'Tokens',
    component: 'TokenList',
  },
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: '_id',
    component: 'Input',
    label: '个人ID',
    colProps: { span: 18 },
    dynamicDisabled: true,
  },
  {
    field: 'avatar',
    component: 'Input',
    label: '头像连接',
    colProps: { span: 18 },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '用户名',
    colProps: { span: 18 },
  },
  {
    field: 'githubId',
    component: 'Input',
    label: 'GitHubId',
    colProps: { span: 18 },
    helpMessage: '注：id不是指用户名',
  },
  {
    field: 'nickName',
    component: 'Input',
    label: '昵称',
    colProps: { span: 18 },
  },

  {
    field: 'email',
    component: 'Input',
    label: '电子邮件',
    colProps: { span: 18 },
  },
  {
    field: 'homePath',
    component: 'Input',
    label: '默认路径',
    colProps: { span: 18 },
  },
  {
    field: 'link',
    component: 'Input',
    label: '个人链接',
    colProps: { span: 18 },
  },
  {
    field: 'desc',
    component: 'InputTextArea',
    label: '个人简介',
    colProps: { span: 18 },
  },
];
// 基础设置 form
export const addTokenFormSchema: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    required: true,
  },
  {
    field: 'value',
    component: 'Input',
    label: 'token的值',
    required: true,
  },
];
// 基础设置 form
export const tokenSchemas: FormSchema[] = [
  {
    field: '_id',
    component: 'Select',
    label: 'Token类型',

    colProps: { span: 18 },
    required: true,
  },
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: { span: 18 },
    required: true,
  },
  {
    field: 'value',
    component: 'Input',
    label: 'token的值',
    colProps: { span: 18 },
    required: true,
  },
];
