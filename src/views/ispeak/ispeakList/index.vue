<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增speak </a-button>
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

  import { columns, searchFormSchema } from './ispeak.data';
  import { getIspeakListByPage, deleteIspeakById } from '/@/api/ispeak/ispeak';
  // import { useUserStore } from '/@/store/modules/user';
  import { useGo } from '/@/hooks/web/usePage';
  export default defineComponent({
    name: 'FriendList',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const [registerDrawer] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '友链列表',
        api: getIspeakListByPage,
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
      // const { userInfo } = useUserStore();
      const go = useGo();
      function handleCreate() {
        // openDrawer(true, {
        //   isUpdate: false,
        //   record: { from: userInfo?._id },
        // });
        go('/ispeak/edit');
      }

      function handleEdit(record: Recordable) {
        // openDrawer(true, {
        //   record,
        //   isUpdate: true,
        //   tag: record.tag[0]._id,
        // });
        go('/ispeak/edit/' + record._id);
      }

      async function handleDelete(record: Recordable) {
        await deleteIspeakById(record._id);
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        registerDrawer,
      };
    },
  });
</script>
