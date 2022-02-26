<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="新增Token" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { addTokenFormSchema } from './data';
  import { addUserTokenApi } from '/@/api/user/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'TokenModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: addTokenFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        console.log(data);
        resetFields();
      });
      const { createMessage } = useMessage();

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          await addUserTokenApi(values);
          createMessage.success('添加成功');
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
