<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a :href="GITHUB_URL" target="_blank">{{ name }}</a>
          是基于 <a :href="VBEN_URL" target="_blank">vben</a>解决方案对接<a
            :href="DOC_URL"
            target="_blank"
            >kk-api</a
          >的一套后台系统。
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h, onMounted, ref } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { GITHUB_URL, DOC_URL, VBEN_URL } from '/@/settings/siteSetting';
  import { apiVersionApi } from '/@/api/open/openApi';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  // const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: '前端版本',
      field: 'version',
      render: commonTagRender('blue'),
    },
    {
      label: '最后编译时间',
      field: 'lastBuildTime',
      render: commonTagRender('blue'),
    },
    {
      label: 'API版本',
      field: 'apiVersion',
      render: commonTagRender('red'),
    },
    {
      label: 'API更新时间',
      field: 'apiDate',
      render: commonTagRender('red'),
    },
    // {
    //   label: 'Github',
    //   field: 'github',
    //   render: commonLinkRender('Github'),
    // },
  ];

  const infoData = ref({
    version,
    lastBuildTime,
    apiVersion: 'loading...',
    apiDate: 'loading...',
  });

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: '生产环境依赖',
    data: dependencies,
    schema: schema,
    column: 3,
  });

  const [registerDev] = useDescription({
    title: '开发环境依赖',
    data: devDependencies,
    schema: devSchema,
    column: 3,
  });

  const [infoRegister] = useDescription({
    title: '项目信息',
    data: infoData,
    schema: infoSchema,
    column: 2,
  });
  onMounted(async () => {
    const result = await apiVersionApi();
    console.log(result);
    infoData.value.apiDate = result.date;
    infoData.value.apiVersion = result.version;
  });
</script>
