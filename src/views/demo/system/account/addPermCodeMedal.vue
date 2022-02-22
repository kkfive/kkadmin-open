<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="新增权限" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountAddPermCodeSchema } from './account.data';
  import { addPermCode } from '/@/api/demo/system';

  export default defineComponent({
    name: 'AddPermCodeModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const userId = ref('');
      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountAddPermCodeSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        userId.value = data.id;
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          await addPermCode(userId.value, values.code);
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
