<template>
  <PageWrapper :title="paperTitle" class="bg-white">
    <BasicForm @register="register" @submit="handleSubmit" :submitButtonOptions="{ text: '提交' }">
      <!-- <template #formFooter>
        <div class="py-2 text-center w-full">
          <a-button type="primary" class="w-60">提交</a-button>
        </div>
      </template> -->
    </BasicForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { FormSchemas } from './editor.data';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { addIspeak, getIspeakById, updateIspeak } from '/@/api/ispeak/ispeak';
  const { closeCurrent, setTitle } = useTabs();
  const { createMessage } = useMessage();
  const route = useRoute();
  const { id } = route.params;
  const paperTitle = ref<string>('发布Speak');
  const [register, { setProps, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 100,
    schemas: FormSchemas,
    actionColOptions: {
      span: 24,
    },
  });

  const handleSubmit = async (values: any) => {
    if (id) {
      try {
        await updateIspeak(values);
        createMessage.success('操作成功');
        closeCurrent();
      } catch (e) {
        console.log(e);
      }
    } else {
      await addIspeak(values);
      createMessage.success('操作成功');
      closeCurrent();
    }
  };
  onMounted(async () => {
    if (id) {
      const result = await getIspeakById(id);
      // console.log(result);
      setProps({
        submitButtonOptions: {
          text: '修改',
        },
      });
      paperTitle.value = '修改Speak：' + result.title;
      setTitle('修改Speak：' + result.title);
      updateSchema({
        field: '_id',
        ifShow: true,
      });
      setFieldsValue({
        content: result.content,
        showComment: result.showComment,
        tag: result.tag,
        title: result.title,
        type: result.type,
        _id: result._id,
      });
    } else {
      setTitle('新增speak');
      updateSchema({
        field: '_id',
        ifShow: false,
      });
      setProps({
        submitButtonOptions: {
          text: '提交',
        },
      });
    }
  });
</script>
