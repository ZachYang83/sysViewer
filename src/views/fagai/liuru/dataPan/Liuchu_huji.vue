<template>
  <div id="lc_hujiData"></div>
</template>

<script>
let dataChart;
export default {
  name: "liuchu_hj",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var dataDom = document.getElementById("lc_hujiData");
    dataChart = echarts.init(dataDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        dataChart.resize();
      });
      let hujidata = [
        { key: "北京", value: datas.huji.beijing },
        { key: "天津", value: datas.huji.tianjin },
        { key: "河北", value: datas.huji.hebei },
        { key: "山西", value: datas.huji.shanxi },
        { key: "内蒙古", value: datas.huji.neimenggu },
        { key: "辽宁", value: datas.huji.liaoling },
        { key: "吉林", value: datas.huji.jilin },
        { key: "黑龙江", value: datas.huji.heilongjiang },
        { key: "上海", value: datas.huji.shanghai },
        { key: "江苏", value: datas.huji.jiangsu },
        { key: "浙江", value: datas.huji.zhejiang },
        { key: "安徽", value: datas.huji.anhui },
        { key: "福建", value: datas.huji.fujian },
        { key: "江西", value: datas.huji.jiangxi },
        { key: "山东", value: datas.huji.shandong },
        { key: "河南", value: datas.huji.henan },
        { key: "湖北", value: datas.huji.hubei },
        { key: "湖南", value: datas.huji.hunan },
        { key: "广东", value: datas.huji.guangdong },
        { key: "广西", value: datas.huji.guangxi },
        { key: "海南", value: datas.huji.hainan },
        { key: "重庆", value: datas.huji.chongqing },
        { key: "四川", value: datas.huji.sichuan },
        { key: "贵州", value: datas.huji.guizhou },
        { key: "云南", value: datas.huji.yunnan },
        { key: "西藏", value: datas.huji.xizang },
        { key: "陕西", value: datas.huji.shannxi },
        { key: "甘肃", value: datas.huji.gansu },
        { key: "青海", value: datas.huji.qinghai },
        { key: "宁夏", value: datas.huji.ningxia },
        { key: "新疆", value: datas.huji.xinjiang },
      ];
      hujidata.sort((a, b) => {
        return a.value - b.value;
      });
      let datax = [];
      let datay = [];
      hujidata.forEach((item) => {
        datay.push(item.key);
        datax.push(item.value);
      });
      let hj_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          x: 50,
          y: 10,
          y2: 20,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.02],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: datay,
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
            interval: 0,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
        },
        color: "#00FFFF",
        series: [
          {
            type: "bar",
            data: datax,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#00FFFF",
                    fontSize: 10,
                  },
                },
              },
            },
          },
        ],
      };
      dataChart.setOption(hj_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#lc_hujiData {
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>