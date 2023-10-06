import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const CustomBarConfig: ConfigType = {
  key: 'CustomBar',
  chartKey: 'VCustomBar',
  conKey: 'VCCustomBar',
  title: '自定义-柱状图',
  category: ChatCategoryEnum.CUSTOM,
  categoryName: ChatCategoryEnumName.CUSTOM,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'bar_x.png'
}
