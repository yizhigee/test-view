import { ref } from 'vue'
import { goDialog } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { ChartList } from '../../..'
import { get } from '@/api/http'
// 数据初始化
export const useDataListInit = () => {
  // 从接口获取项目列表
  const list = ref<ChartList>([])
  get('project/list', ).then(res => {
    list.value = res.data.map(item => {
      return {
        id: item.id,
        title: item.title,
        release: item.release == 1,
        label: '首页模板',
      }
    })
  })

  // 删除
  const deleteHandle = (cardData: object, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () =>
        new Promise(res => setTimeout(() => res(1), 1000)),
      promiseResCallback: (e: any) => {
        window.$message.success('删除成功')
        list.value.splice(index, 1)
      }
    })
  }

  return {
    list,
    deleteHandle
  }
}
