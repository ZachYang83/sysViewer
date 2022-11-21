<template>
  <div id="gyy_hujiData"></div>
</template>

<script>
let dataChart;
export default {
  name: "gyy_hj",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var dataDom = document.getElementById("gyy_hujiData");
    dataChart = echarts.init(dataDom);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        dataChart.resize();
      });
      let hujidata = [
        { key: "北京", value: datas.hujidata.beijing },
        { key: "天津", value: datas.hujidata.tianjin },
        { key: "河北", value: datas.hujidata.hebei },
        { key: "山西", value: datas.hujidata.shanxi },
        { key: "内蒙古", value: datas.hujidata.neimenggu },
        { key: "辽宁", value: datas.hujidata.liaoning },
        { key: "吉林", value: datas.hujidata.jilin },
        { key: "黑龙江", value: datas.hujidata.heilongjiang },
        { key: "上海", value: datas.hujidata.shanghai },
        { key: "江苏", value: datas.hujidata.jiangsu },
        { key: "浙江", value: datas.hujidata.zhejiang },
        { key: "安徽", value: datas.hujidata.anhui },
        { key: "福建", value: datas.hujidata.fujian },
        { key: "江西", value: datas.hujidata.jiangxi },
        { key: "山东", value: datas.hujidata.shandong },
        { key: "河南", value: datas.hujidata.henan },
        { key: "湖北", value: datas.hujidata.hubei },
        { key: "湖南", value: datas.hujidata.hunan },
        { key: "广东", value: datas.hujidata.guangdong },
        { key: "广西", value: datas.hujidata.guangxi },
        { key: "海南", value: datas.hujidata.hainan },
        { key: "重庆", value: datas.hujidata.chongqing },
        { key: "四川", value: datas.hujidata.sichuan },
        { key: "贵州", value: datas.hujidata.guizhou },
        { key: "云南", value: datas.hujidata.yunnan },
        { key: "西藏", value: datas.hujidata.xizang },
        { key: "陕西", value: datas.hujidata.shannxi },
        { key: "甘肃", value: datas.hujidata.gansu },
        { key: "青海", value: datas.hujidata.qinghai },
        { key: "宁夏", value: datas.hujidata.ningxia },
        { key: "新疆", value: datas.hujidata.xinjiang },
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
#gyy_hujiData {
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>