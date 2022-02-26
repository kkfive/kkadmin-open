<template>
  <CollapseContainer title="token列表" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="24">
        <div class="text-right py-2">
          <Button type="primary" @click="addTokenHandler"> 添加Token </Button>
        </div>
      </a-col>
      <a-col :span="24">
        <BasicForm @register="registerForm" />
        <div class="text-center">
          <Button type="primary" @click="handleSubmit"> 更新Token </Button>
          <PopConfirmButton
            type="primary"
            class="ml-2"
            danger
            title="是否删除此Token"
            @confirm="tokenDeleteHandle"
            >删除Token</PopConfirmButton
          >
        </div>
      </a-col>
    </a-row>
  </CollapseContainer>
  <TokenModal @register="registerModal" @success="addSuccess" />
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { getUserTokenApi, updateUserTokenApi, deleteUserTokenApi } from '/@/api/user/user';
  import { tokenSchemas } from './data';
  import { useModal } from '/@/components/Modal';
  import { PopConfirmButton } from '/@/components/Button';
  import TokenModal from './TokenModal.vue';
  // import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      TokenModal,
      PopConfirmButton,
    },
    setup() {
      const { createMessage } = useMessage();
      // const userStore = useUserStore();

      const [registerForm, { getFieldsValue, updateSchema, resetFields }] = useForm({
        labelWidth: 120,
        schemas: tokenSchemas,
        showActionButtonGroup: false,
      });
      const [registerModal, { openModal }] = useModal();

      onMounted(async () => {
        await getTypeList();
      });
      const tokenList = ref<any>({});
      async function getTypeList() {
        const data = await getUserTokenApi();
        const list: any[] = [];
        data.forEach((item) => {
          tokenList.value[item._id] = item;
          list.push({
            label: item.title,
            value: item._id,
            key: item._id,
          });
        });
        resetFields();
        updateSelectSchema(list);
        return list;
      }
      async function updateSelectSchema(options) {
        updateSchema({
          field: '_id',
          componentProps: ({ formModel }) => {
            return {
              onChange: (e) => {
                formModel.title = tokenList.value[e].title;
                formModel.value = tokenList.value[e].value;
              },
              options,
            };
          },
        });
      }
      async function updateAccount() {
        try {
          await updateUserTokenApi(getFieldsValue());
          createMessage.success('修改成功');

          await getTypeList();
        } catch (e) {
          console.log(e);
        }
      }
      async function addTokenHandler() {
        openModal(true);
      }
      async function addSuccess() {
        await getTypeList();
      }
      async function tokenDeleteHandle() {
        console.log(getFieldsValue());
        const { _id } = getFieldsValue();
        if (!_id) {
          return createMessage.error('请先选择Token');
        } else {
          try {
            await deleteUserTokenApi(_id);
            createMessage.success('删除成功');
            await getTypeList();
          } catch (e) {}
        }
      }

      return {
        registerForm,
        addSuccess,
        registerModal,
        addTokenHandler,
        tokenDeleteHandle,
        handleSubmit: updateAccount,
      };
    },
  });
</script>

<style lang="less" scoped></style>
