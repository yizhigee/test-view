<template>
  <!-- 遍历 seriesList -->
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="`饼图-${index + 1}`"
    :expanded="true"
  >
    <SettingItemBox name="边框">
      <SettingItem name="颜色">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.itemStyle.color"
        ></n-color-picker>
      </SettingItem>
      <!-- 颜色粗细等等... -->
    </SettingItemBox>
    <!-- Echarts 全局设置 --> 
    <global-setting :optionData="optionData" :in-chart="true"></global-setting>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
// 以下是封装的设置模块布局组件，具体效果可在官网查看
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

</script>