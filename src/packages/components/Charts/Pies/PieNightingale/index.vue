<template>
  <v-chart 
    ref="vChartRef" 
    :theme="themeColor" 
    :option="option" 
    :manual-update="isPreview()" 
    autoresize>
  </v-chart>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import {
  DatasetComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'


// 这里的 themeSetting、themeColor的作用是监听全局样式主题并进行设置，chartConfig 为图表的配置项数据
const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

// 动态注册 ECharts 图表内容
use([
  DatasetComponent,
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

// 应用到图表的 option
const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// 若使用的是 Echarts 原生 dataset 控制需要解决一个bug
// 假设默认的 dadaset 渲染两个柱状图，从后台读取时返回一个柱状图的数据，只更新 dataset 是无效的，依然会渲染两个，需要手动修改 series

// 注：未使用 Echarts 原生 dataset 或此图表只能渲染一个实例，则不需要额外添加此监听
/* start---
watch(
  () => props.chartConfig.option.dataset,
  (newData, oldData) => {
    if (newData.dimensions.length !== oldData.dimensions.length) {
      const seriesArr = []
      for (let i = 0; i < newData.dimensions.length - 1; i++) {
        seriesArr.push(seriesItem)
      }
      replaceMergeArr.value = ['series']
      props.chartConfig.option.series = seriesArr
      nextTick(() => {
        replaceMergeArr.value = []
      })
    }
  },
  {
    deep: false
  }
)
end--- */

// 数据更新处理，使用 dataset 的 Eharts 图表不需要额外处理，hooks 会借助 vChartRef 自动更新
// 若每次更新需要修改其它属性，可添加回调函数处理，参考：src\packages\components\Charts\Pies\PieCircle
const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore)
</script>