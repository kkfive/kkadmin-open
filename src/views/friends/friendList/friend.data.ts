import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag, Avatar } from 'ant-design-vue';
import { Time } from '/@/components/Time';
import { getAllTagList } from '/@/api/friend/friend';
import { usePermissionStore } from '/@/store/modules/permission';
import { useDebounceFn } from '@vueuse/shared';
import { useUserStore } from '/@/store/modules/user';
const { userInfo } = useUserStore();
const { permCodeList } = usePermissionStore();
const toUser = '';
export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
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
    title: '链接',
    dataIndex: 'link',
    customRender: ({ record }) => {
      return h(
        'a',
        { href: (record as any).link, target: 'target' },
        (record as any).from[0].userName,
      );
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
    title: '描述',
    dataIndex: 'description',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = (record as any).status;
      // const enable = ~~status === 0;
      // const color = enable==='0' ? 'green' : 'red';
      let color = '';
      let text = '';
      if (status === '0') {
        color = 'green';
        text = '启用';
      } else if (status === '1') {
        color = 'yellow';
        text = '待审核';
      } else if (status === '2') {
        color = 'red';
        text = '屏蔽';
      }
      // const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    customRender: ({ record }) => {
      return h(Time, { value: (record as any).createTime, mode: 'date' });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '友链名称',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '80px',
  },
  {
    field: 'link',
    label: '链接',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '50px',
  },
  {
    field: 'from',
    label: '来自',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '50px',
  },
  {
    field: 'to',
    label: '去往',
    component: 'Input',
    colProps: { span: 6 },
    labelWidth: '50px',
    defaultValue: userInfo?._id,
    ifShow:
      (permCodeList as any[]).includes('update:allFriendList') ||
      (permCodeList as any[]).includes('add:allFriendList'),
  },
  {
    field: 'tag',
    label: '标签',
    component: 'ApiSelect',
    componentProps: {
      api: getAllTagList,
      labelField: 'name',
      valueField: '_id',
      params: {
        user: toUser,
      },
    },
    labelWidth: '50px',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '待审核', value: '1' },
        { label: '屏蔽', value: '2' },
      ],
    },
    colProps: { span: 6 },
    labelWidth: '50px',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '友链名称',
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
    field: 'description',
    label: '描述',
    component: 'Input',
    required: true,
  },

  {
    field: 'link',
    label: '地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'tag',
    label: '标签',
    component: 'Select',
    helpMessage: '输入去往后可显示对方的标签',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '已启用', value: '0' },
        { label: '待审核', value: '1' },
        { label: '已屏蔽', value: '2' },
      ],
    },
  },
  {
    field: 'from',
    label: '来自',
    component: 'Input',
    required: true,
    defaultValue: userInfo?._id,
    ifShow:
      (permCodeList as any[]).includes('update:allFriendList') ||
      (permCodeList as any[]).includes('add:allFriendList'),
  },
  {
    field: 'to',
    label: '去往',
    component: 'Input',
    required: true,
    componentProps: ({ formActionType }) => {
      return {
        onChange: useDebounceFn(async (e: ChangeEvent) => {
          const res = await getAllTagList({ userId: e.target.value });
          const options = res.map((item) => {
            return { label: item.name, value: item._id };
          });
          formActionType.updateSchema({
            field: 'tag',
            componentProps: {
              options: options,
            },
          });
        }, 500),
      };
    },
  },
  {
    field: 'theme.borderStyle',
    label: '边框样式',
    component: 'Input',
    required: false,
  },
  {
    field: 'theme.titleColor',
    label: '文字颜色',
    component: 'Input',
    required: false,
  },
  {
    field: 'theme.descriptionColor',
    label: '描述颜色',
    component: 'Input',
    required: false,
  },
  {
    field: 'theme.boderAnimation',
    label: '边框动画',
    component: 'Input',
    required: false,
  },
  {
    field: 'theme.avatarAnimation',
    label: '头像动画',
    component: 'Input',
    required: false,
  },
  {
    field: 'theme.variable',
    label: '其他变量',
    helpMessage: '例如 primary-color:#000;primary-two:2;',
    component: 'InputTextArea',
    required: false,
  },
  {
    field: 'theme.cardStyle',
    label: '卡片样式',
    component: 'Input',
    required: false,
    helpMessage: '目前只支持card和item哦',
  },
  {
    field: 'theme.screenshot',
    label: '屏幕截图',
    component: 'Input',
    required: false,
  },
];
