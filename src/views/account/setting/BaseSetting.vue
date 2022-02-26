<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="24">
        <BasicForm @register="register" />
        <div class="text-center">
          <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
        </div>
      </a-col>
    </a-row>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col } from 'ant-design-vue';
  import { defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { updateUserInfoApi, userInfoApi } from '/@/api/user/user';
  import { baseSetschemas } from './data';
  // import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const { createMessage } = useMessage();
      // const userStore = useUserStore();

      const [register, { setFieldsValue, getFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const data = await userInfoApi();
        setFieldsValue(data);
      });

      async function updateAccount() {
        try {
          await updateUserInfoApi(getFieldsValue());
          createMessage.success('修改成功');
        } catch (e) {
          console.log(e);
        }
      }

      return {
        register,
        handleSubmit: updateAccount,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
