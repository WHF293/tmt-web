import { Random } from "mockjs";

export const pieOption = {
  legend: {
    top: 'bottom',
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: '近期需求', // 表名
      type: 'pie', // 饼图
      radius: [30, 120], // [内圆半径， 外圆半径]
      center: ['50%', '50%'], // 图标距离左上角位置
      roseType: 'area',
      itemStyle: {
        borderRadius: 8,
      },
      data: [
        { value: Random.integer(3, 47), name: '新功能' },
        { value: Random.integer(6, 20), name: '正常迭代' },
        { value: Random.integer(0, 16), name: 'bug修复' },
        { value: Random.integer(8, 60), name: '小优化' },
      ],
    },
  ],
}
