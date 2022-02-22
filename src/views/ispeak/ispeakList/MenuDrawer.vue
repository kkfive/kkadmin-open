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
  import { formSchema } from './ispeak.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { addIspeak, updateIspeak } from '/@/api/ispeak/ispeak';

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
          // data.record.tag = data.record.tag[0]._id;
        } else {
          updateObject.value = null;
        }
        setFieldsValue({
          ...data.record,
          tag: data.record.tag ? data.record.tag[0]._id : '',
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '添加speak' : '编辑speak'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          const formValue = (value) => {
            let obj = {
              _id: updateObject.value,
            };
            Object.keys(value).forEach((item: string) => {
              const itemValue = value[item];
              obj[item] = itemValue;
            });
            return obj;
          };

          if (updateObject.value) {
            // 修改接口
            await updateIspeak(formValue(values));
          } else {
            // 新增接口
            await addIspeak(values);
          }
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
