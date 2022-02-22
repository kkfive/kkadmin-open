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
  import { formSchema } from './friend.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { addFriend, getAllTagList, updateFriend } from '/@/api/friend/friend';
  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const updateObject = ref<null | string>(null);
      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
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
          const theme = data.record.theme;
          let obj = {};
          Object.keys(theme).forEach((item) => {
            obj['theme.' + item] = theme[item];
          });
          getAllTagList({ userId: data.record.to[0]._id }).then((res) => {
            const options = res.map((item) => {
              return { label: item.name, value: item._id };
            });
            updateSchema({
              field: 'tag',
              componentProps: {
                options: options,
              },
            });
            updateSchema({
              field: 'to',
              dynamicDisabled: true,
            });
            setFieldsValue({
              ...data.record,
              tag: data.record.tag[0]._id,
              from: data.record.from[0]._id,
              to: data.record.to[0]._id,
              ...obj,
            });
          });
        } else {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '添加友链' : '编辑友链'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          const formValue = (value) => {
            let obj = {
              _id: updateObject.value,
              theme: {},
            };
            Object.keys(value).forEach((item: string) => {
              const itemValue = value[item];
              if (item.includes('theme')) {
                obj.theme[item.split('.')[1]] = itemValue;
              } else {
                obj[item] = itemValue;
              }
            });
            return obj;
          };

          if (updateObject.value) {
            // 修改接口
            await updateFriend(formValue(values));
          } else {
            // 新增接口
            console.log(formValue(values));
            await addFriend(formValue(values));
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
