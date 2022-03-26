<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
  import type { Ref } from 'vue';
  import {
    defineComponent,
    ref,
    unref,
    nextTick,
    computed,
    watch,
    onBeforeUnmount,
    onDeactivated,
  } from 'vue';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { useLocale } from '/@/locales/useLocale';
  import { useModalContext } from '../../Modal';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
  import { useGlobSetting } from '/@/hooks/setting';
  const { uploadUrl, uploadToken, lskyVersion, lskyStrategyId } = useGlobSetting();
  type Lang = 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' | undefined;

  export default defineComponent({
    inheritAttrs: false,
    props: {
      height: { type: Number, default: 360 },
      value: { type: String, default: '' },
    },
    emits: ['change', 'get', 'update:value'],
    setup(props, { attrs, emit }) {
      const wrapRef = ref<ElRef>(null);
      const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
      const initedRef = ref(false);

      const modalFn = useModalContext();

      const { getLocale } = useLocale();
      const { getDarkMode } = useRootSetting();
      const valueRef = ref(props.value || '');

      watch(
        [() => getDarkMode.value, () => initedRef.value],
        ([val, inited]) => {
          if (!inited) {
            return;
          }
          const theme = val === 'dark' ? 'dark' : 'classic';
          instance.getVditor()?.setTheme(theme);
        },
        {
          immediate: true,
          flush: 'post',
        },
      );

      watch(
        () => props.value,
        (v) => {
          if (v !== valueRef.value) {
            instance.getVditor()?.setValue(v);
          }
          valueRef.value = v;
        },
      );

      const getCurrentLang = computed((): 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' => {
        let lang: Lang;
        switch (unref(getLocale)) {
          case 'en':
            lang = 'en_US';
            break;
          case 'ja':
            lang = 'ja_JP';
            break;
          case 'ko':
            lang = 'ko_KR';
            break;
          default:
            lang = 'zh_CN';
        }
        return lang;
      });
      function init() {
        const wrapEl = unref(wrapRef) as HTMLElement;
        if (!wrapEl) return;
        const bindValue = { ...attrs, ...props };
        const uploadHeaders = {};
        const extraData = {};
        const lskyVersionUpper = lskyVersion.toUpperCase();
        if (lskyVersionUpper === 'V2') {
          uploadHeaders['Authorization'] = uploadToken;
          uploadHeaders['Accept'] = 'application/json';
          if (lskyStrategyId) extraData['strategy_id'] = lskyStrategyId;
        } else if (lskyVersionUpper === 'V1') {
          uploadHeaders['token'] = uploadToken;
        }
        const insEditor = new Vditor(wrapEl, {
          theme: getDarkMode.value === 'dark' ? 'dark' : 'classic',
          lang: unref(getCurrentLang),
          mode: 'sv',
          /**
           * emoji , headings , bold , italic , strike ,
           * | , line , quote , list , ordered-list , check ,outdent
           * ,indent , code , inline-code , insert-after , insert-before ,undo ,
           *  redo , upload , link , table , record , edit-mode , both ,
           *  preview , fullscreen , outline , code-theme , content-theme , export, devtools , info , help , br

           */
          toolbar: [
            'headings',
            'bold',
            'italic',
            'strike',
            '|',
            'line',
            'quote',
            'list',
            'ordered-list',
            'check',
            'outdent',
            'code',
            'inline-code',
            'insert-after',
            '|',
            'upload',
            'link',
            '|',
            'undo',
            'redo',
            'edit-mode',
            'both',
            'preview',
            'fullscreen',
          ],
          fullscreen: {
            index: 520,
          },
          preview: {
            actions: [],
          },
          input: (v) => {
            valueRef.value = v;
            emit('update:value', v);
            emit('change', v);
          },
          after: () => {
            nextTick(() => {
              modalFn?.redoModalHeight?.();
              insEditor.setValue(valueRef.value);
              vditorRef.value = insEditor;
              initedRef.value = true;
              emit('get', instance);
            });
          },
          blur: () => {
            //unref(vditorRef)?.setValue(props.value);
          },
          ...bindValue,
          cache: {
            enable: false,
          },
          upload: {
            url: uploadUrl,
            fieldName: lskyVersionUpper === 'V2' ? 'file' : 'image',
            headers: uploadHeaders,
            multiple: false,
            linkToImgUrl: uploadUrl,
            extraData,
            format: (files: File[], resopnText) => {
              const responseJson = JSON.parse(resopnText);
              const result = {
                msg: lskyVersionUpper === 'V2' ? responseJson.message : responseJson.msg,
                code:
                  lskyVersionUpper === 'V2' ? (responseJson.status ? 200 : -1) : responseJson.code,
                data: {
                  errFiles: [] as string[],
                  succMap: {},
                },
              };
              if (lskyVersionUpper === 'V2') {
                if (responseJson.status) {
                  result.data.succMap[responseJson.data.name] = responseJson.data.links.url;
                } else {
                  result.data.errFiles.push(files[0].name);
                }
              } else if (lskyVersionUpper === 'V1') {
                if (responseJson.code === 200) {
                  result.data.succMap[responseJson.data.name] = responseJson.data.url;
                } else {
                  result.data.errFiles.push(files[0].name);
                }
              }
              return JSON.stringify(result);
            },
          },
        });
      }

      const instance = {
        getVditor: (): Vditor => vditorRef.value!,
      };

      function destroy() {
        const vditorInstance = unref(vditorRef);
        if (!vditorInstance) return;
        try {
          vditorInstance?.destroy?.();
        } catch (error) {}
        vditorRef.value = null;
        initedRef.value = false;
      }

      onMountedOrActivated(init);

      onBeforeUnmount(destroy);
      onDeactivated(destroy);
      return {
        wrapRef,
        ...instance,
      };
    },
  });
</script>
