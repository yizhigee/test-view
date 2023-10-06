import image from '@/assets/images/chart/charts/pie-circle.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieNightingaleConfig: ConfigType = {
  key: 'PieNightingale',
  chartKey: 'VPieNightingale',
  conKey: 'VCPieNightingale',
  title: '饼图-南丁格尔玫瑰图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'pie-circle.png'
}
