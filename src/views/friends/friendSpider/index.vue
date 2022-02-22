<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="mySubscription"> 我的订阅链接 </a-button>
        <a-button type="primary" @click="handleCreate"> 新增订阅链接 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './friendCircle.data';
  import { getFriendSpiderByPage, deleteFriendSpider } from '/@/api/friend/friend';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'FriendSpiderList',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const globSetting = useGlobSetting();
      const { userInfo } = useUserStore();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '我的朋友圈链接订阅列表',
        api: getFriendSpiderByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        isTreeTable: false,
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });
      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteFriendSpider({ _id: record._id });
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }
      function mySubscription() {
        window.open(
          globSetting.apiUrl + globSetting.urlPrefix + `/friend/spider/subscribe/${userInfo?._id}`,
        );
      }
      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        mySubscription,
      };
    },
  });
</script>
