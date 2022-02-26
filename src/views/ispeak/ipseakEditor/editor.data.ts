import { FormSchema } from '/@/components/Form';
import { MarkDown } from '/@/components/Markdown';
import { h } from 'vue';
import { getAllTagList } from '/@/api/ispeak/ispeak';
export const FormSchemas: FormSchema[] = [
  {
    field: '_id',
    component: 'Input',
    label: 'ispeak ID',
    required: true,
    dynamicDisabled: true,
    ifShow: false,
  },
  {
    field: 'title',
    component: 'Input',
    label: 'ispeak标题',
    defaultValue: '',
  },

  {
    field: 'type',
    label: '可视范围',
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
    defaultValue: '',
    required: true,
  },
  {
    field: 'showComment',
    label: '是否展示评论',
    component: 'Switch',
    componentProps: {
      checkedChildren: '展示',
      unCheckedChildren: '隐藏',
      checkedValue: '1',
      unCheckedValue: '0',
      // options: [
      //   { label: '不展示', value: '0' },
      //   { label: '展示', value: '1' },
      // ],
    },
    defaultValue: '1',
    required: true,
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
    defaultValue: '',
    rules: [{ required: true, trigger: 'blur' }],
    render: ({ model, field }) => {
      return h(MarkDown, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
