import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { updateFriendSpiderStatus } from '/@/api/friend/friend';
import { Switch, Avatar } from 'ant-design-vue';
import { Time } from '/@/components/Time';

export const columns: BasicColumn[] = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 100,
    customRender: ({ record }) => {
      return h(Avatar, {
        src: (record as any).avatar,
      });
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '规则',
    dataIndex: 'suffix',
    width: 150,
  },
  {
    title: '链接',
    dataIndex: 'link',
    width: 200,
    customRender: ({ record }) => {
      return h('a', { href: (record as any).link, target: '_blank' }, (record as any).link);
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '0',
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? '0' : '1';
          const { createMessage } = useMessage();
          updateFriendSpiderStatus({ _id: record._id, status: newStatus })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`修改成功`);
            })
            .catch(() => {
              createMessage.error('修改失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '创建人',
    dataIndex: 'user',
    customRender: ({ record }) => {
      const user = (record as any).user.length > 0 ? (record as any).user[0] : {};

      const userName = user.userName || '';
      const nickName = user.nickName || '';
      const text = nickName || userName;
      const link = user.link || '#';
      return h('a', { href: link, target: '_blank' }, text);
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
    label: '名称',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
  {
    field: 'link',
    label: '链接',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
  {
    field: 'suffix',
    label: '规则',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    labelWidth: '80px',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'Input',
    required: true,
  },
  {
    field: 'link',
    label: '链接',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 0,
    required: true,
  },
  {
    field: 'suffix',
    label: '规则',
    component: 'Input',
    helpMessage: '自定义订阅后缀，主要针对不规范的网站订阅后缀',
    required: false,
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    required: false,
    colProps: { span: 16 },
  },
];
