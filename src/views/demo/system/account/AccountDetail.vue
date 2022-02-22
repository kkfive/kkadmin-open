<template>
  <PageWrapper
    :title="`用户` + userInfo.userName + `的资料`"
    content="用户详情信息页面"
    contentBackground
    @back="goBack"
    ref="wrapEl"
  >
    <template #extra>
      <a-button
        type="primary"
        danger
        @click="changeAccountStatus('1')"
        v-if="userInfo.status === '0'"
      >
        禁用账号
      </a-button>
      <a-button
        type="primary"
        success
        @click="changeAccountStatus('0')"
        v-if="userInfo.status === '1'"
      >
        启用账号
      </a-button>
      <a-button type="primary"> 修改密码 </a-button>
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用户资料" />
        <a-tab-pane key="permCode" tab="权限列表" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <Description
          title="用户基本信息"
          :collapseOptions="{ canExpand: false, helpMessage: 'help me' }"
          :column="3"
          :data="userInfo"
          :schema="userInfoSchema"
        />
      </template>
      <template v-if="currentKey == 'permCode'">
        <div class="text-right">
          <a-button type="primary" warning @click="addPermCodeHandler"> 添加权限 </a-button>
        </div>
        <!-- <div v-for="i in userInfo.permCode" :key="i">{{ i }}</div> -->
        <a-tag
          closable
          :color="getColors(index)"
          @close="deletePermCodeHandler(item)"
          v-for="(item, index) in userInfo.permCode"
          :key="item"
          >{{ item }}</a-tag
        >
      </template>
    </div>
    <addPermCodeMedal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs, Tag } from 'ant-design-vue';
  import { useLoading } from '/@/components/Loading';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { setUserStatus, getAccountInfo, deletePermCode } from '/@/api/demo/system';
  import { Description, DescItem } from '/@/components/Description/index';
  import { useModal } from '/@/components/Modal';
  import addPermCodeMedal from './addPermCodeMedal.vue';
  export default defineComponent({
    name: 'AccountDetail',
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      Description,
      ATag: Tag,
      addPermCodeMedal,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const userId = ref(route.params?.id);
      const currentKey = ref('detail');
      const wrapEl = ref(null);
      // const userStatus = ref('0');
      const { setTitle } = useTabs();
      const userInfo = reactive({
        createTime: '',
        deptId: {
          deptName: '',
        },
        email: '',
        giteeId: '',
        homePath: '',
        nickName: '',
        permCode: [],
        remark: '',
        role: {
          roleName: '',
          roleValue: '',
        },
        status: '0',
        userName: '',
        _id: '',
      });
      const userInfoSchema: DescItem[] = [
        {
          field: 'userName',
          label: '用户名',
        },
        {
          field: 'nickName',
          label: '昵称',
        },
        {
          field: '_id',
          label: '用户Id',
        },
        {
          field: 'role',
          label: '角色信息',
          render: (curVal, data) => {
            console.log(curVal);
            return `角色名：${data.role.roleName}，角色值：${data.role.roleValue}`;
          },
        },
        {
          field: 'status',
          label: '用户状态',
        },
        {
          field: 'email',
          label: '邮箱',
        },
        {
          field: 'giteeId',
          label: '码云Id',
        },
        {
          field: 'deptId.deptName',
          label: '部门',
        },
        {
          field: 'createTime',
          label: '创建时间',
        },
        {
          field: 'homePath',
          label: '首页路径',
        },
        {
          field: 'remark',
          label: '用户备注',
        },
      ];
      const [open, close, setTip] = useLoading({
        target: wrapEl,
        props: {
          tip: '加载中...',
          absolute: true,
        },
      });
      const tagColors = ref(['#f50', '#2db7f5', '#87d068', '#108ee9']);
      const getColors = (index) => {
        return tagColors.value[index % 4];
      };
      const [registerModal, { openModal }] = useModal();
      // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料
      onMounted(async () => {
        await getUserInfo();
      });
      const getUserInfo = async () => {
        const res = await getAccountInfo(userId.value);
        Object.keys(userInfo).forEach((key) => {
          userInfo[key] = res[key];
        });
        // 设置Tab的标题（不会影响页面标题）
        setTitle('详情：用户' + userInfo.userName);
      };
      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/account');
      }
      /**
       * 禁用账号按钮
       */
      function changeAccountStatus(status) {
        const { createMessage } = useMessage();
        setTip('禁用中');
        open();
        setUserStatus(userId.value as string, status)
          .then(() => {
            createMessage.success(`已成功修改用户状态`);
          })
          .catch(() => {
            createMessage.error('修改用户状态失败');
          })
          .finally(() => {
            close();
          });
      }
      /**
       * 删除权限按钮
       */
      async function deletePermCodeHandler(value: string) {
        if (userId.value) {
          await deletePermCode(userId.value as string, value);
          await getUserInfo();
        }
      }
      /**
       * 添加权限model框回调
       */
      async function handleSuccess() {
        await getUserInfo();
      }
      /**
       * 添加权限按钮单机事件
       */
      function addPermCodeHandler() {
        openModal(true, {
          id: userId.value,
        });
      }
      return {
        userId,
        currentKey,
        userInfoSchema,
        userInfo,
        getColors,
        goBack,
        changeAccountStatus,
        deletePermCodeHandler,
        registerModal,
        handleSuccess,
        addPermCodeHandler,
      };
    },
  });
</script>

<style></style>
