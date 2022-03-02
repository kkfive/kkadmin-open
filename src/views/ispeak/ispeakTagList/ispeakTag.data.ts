import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Time } from '/@/components/Time';

export const columns: BasicColumn[] = [
  {
    title: '标签名称',
    dataIndex: 'name',
    width: 300,
  },
  {
    title: '背景颜色',
    dataIndex: 'bgColor',
    width: 200,
    customRender: ({ record }) => {
      return h('span', { style: 'color:' + (record as any).bgColor }, (record as any).bgColor);
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  // {
  //   title: '创建人',
  //   dataIndex: 'user',
  //   customRender: ({ record }) => {
  //     const user = (record as any).user.length > 0 ? (record as any).user[0] : {};

  //     const userName = user.userName || '';
  //     const nickName = user.nickName || '';
  //     const text = nickName || userName;
  //     const link = user.link || '#';
  //     return h('a', { href: link, target: '_blank' }, text);
  //   },
  // },
  {
    title: '预览标签',
    dataIndex: 'tag',
    customRender: ({ record }) => {
      const color = (record as any).bgColor;
      const text = (record as any).name;
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    customRender: ({ record }) => {
      return h(Time, { value: (record as any).createdAt, mode: 'date' });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标签名称',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
  {
    field: 'bgColor',
    label: '背景颜色',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '标签名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'bgColor',
    label: '背景颜色',
    component: 'Input',
    required: true,
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
    defaultValue: '',
    required: false,
  },
];
