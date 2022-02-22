<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './friendTag.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { addFriendTag, updateFriendTag } from '/@/api/friend/friend';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const updateObject = ref<null | string>(null);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;
        if (isUpdate.value) {
          updateObject.value = data.record._id;
        } else {
          updateObject.value = null;
        }
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
            user: data.record.user[0]._id,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '添加标签' : '编辑标签'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          if (updateObject.value) {
            // 修改接口
            await updateFriendTag({ _id: updateObject.value, ...values });
          } else {
            // 新增接口
            await addFriendTag(values);
          }
          console.log(values);
          // 成功
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
