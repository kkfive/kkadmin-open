import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { Time } from '/@/components/Time';
import { getAllTagList, updateIspeakStatus } from '/@/api/ispeak/ispeak';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  // {
  //   title: '标题',
  //   dataIndex: 'title',
  // },
  {
    title: '内容',
    dataIndex: 'content',
    width: 300,
  },
  {
    title: '类型',
    dataIndex: 'type',
    customRender: ({ record }) => {
      const type = (record as any).type;
      if (type === '0') {
        return h(Tag, { color: '#87d068' }, () => '公开');
      } else if (type === '1') {
        return h(Tag, { color: '#2db7f5' }, () => '登录可见');
      } else if (type === '2') {
        return h(Tag, { color: '#f50' }, () => '仅自己');
      }
    },
  },
  {
    title: '标签',
    dataIndex: 'tag',
    width: 100,
    customRender: ({ record }) => {
      const tags = (record as any).tag;
      if (tags.length >= 0) {
        const color = tags[0].bgColor;
        const text = tags[0].name;
        return h(Tag, { color: color }, () => text);
      } else {
        return '';
      }
    },
  },

  {
    title: '展示评论',
    dataIndex: 'showComment',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record as unknown as any, 'pendingShowComment')) {
        record.pendingShowComment = false;
      }
      return h(Switch, {
        checked: record.showComment === '1',
        checkedChildren: '展示',
        unCheckedChildren: '隐藏',
        loading: record.pendingShowComment,
        onChange(checked: boolean) {
          record.pendingShowComment = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          updateIspeakStatus({ _id: record._id, showComment: newStatus })
            .then(() => {
              record.showComment = newStatus;
              createMessage.success(`修改成功`);
            })
            .catch(() => {
              createMessage.error('修改失败');
            })
            .finally(() => {
              record.pendingShowComment = false;
            });
        },
      });
    },
  },
  {
    title: '发布人',
    dataIndex: 'author',
    customRender: ({ record }) => {
      return h('span', {}, (record as any).author[0].userName);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
    customRender: ({ record }) => {
      return h(Time, { value: (record as any).updatedAt, mode: 'date' });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return h(Time, { value: (record as any).createdAt, mode: 'date' });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
  {
    field: 'content',
    label: '内容',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '50px',
  },
  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '公开', value: '0' },
        { label: '登录可见', value: '1' },
        { label: '仅自己', value: '2' },
      ],
    },
    colProps: { span: 6 },
    labelWidth: '50px',
  },
  {
    field: 'tag',
    label: '标签',
    component: 'ApiSelect',
    componentProps: {
      api: getAllTagList,
      labelField: 'name',
      valueField: '_id',
    },
    labelWidth: '50px',
    colProps: { span: 6 },
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '启用', value: '0' },
  //       { label: '待审核', value: '1' },
  //       { label: '屏蔽', value: '2' },
  //     ],
  //   },
  //   colProps: { span: 6 },
  //   labelWidth: '50px',
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: 'ispeak标题',
    component: 'Input',
    required: false,
  },

  {
    field: 'type',
    label: '类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '公开', value: '0' },
        { label: '登录可见', value: '1' },
        { label: '仅自己', value: '2' },
      ],
    },
    defaultValue: '0',
    helpMessage: '公开表示可匿名查看，登录可见表示需要用户授权登录才可见，仅自己表示仅主人登录可见',
    required: true,
  },

  {
    field: 'tag',
    label: '标签',
    component: 'ApiSelect',
    componentProps: {
      api: getAllTagList,
      labelField: 'name',
      valueField: '_id',
    },
    required: true,
  },
  {
    field: 'content',
    label: '内容',
    component: 'InputTextArea',
    required: true,
  },
  // {
  //   field: 'status',
  //   label: '状态',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '已启用', value: '0' },
  //       { label: '待审核', value: '1' },
  //       { label: '已屏蔽', value: '2' },
  //     ],
  //   },
  // },
];
