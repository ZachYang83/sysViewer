<template>
  <div>
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="325px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/components/common/echart/index.vue";
import hexGrid from "@turf/hex-grid";
import TransportationODVue from '../../population/TransportationOD.vue';
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.5)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC",
              },
            },
          },
          legend: {
            data: ["常住人口", "环比"],
            textStyle: {
              color: "#B4B4B4",
            },
            top: "2%",
          },
          grid: {
            x: "6%",
            width: "88%",
            y: "10%",
            bottom: "15%",
          },
          xAxis: {
            data: newData.category,
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              rotate: 45,
            },
            splitArea: {
              show: TransportationODVue,
              areaStyle: {
                color: [
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#50ffd54f",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                  "#90ff7043",
                ],
              },
            },
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4",
                },
              },
              name: "万人",
              axisLabel: {
                formatter: "{value}",
              },
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4",
                },
              },
              axisLabel: {
                formatter: function (value) {
                  return value * 100 + "%";
                },
              },
            },
          ],
          series: [
            {
              name: "环比",
              type: "line",
              smooth: true,
              showAllSymbol: true,
              symbol: "emptyCircle",
              symbolSize: 8,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: "#F02FC2",
                  label: {
                    show: true,
                    position: "bottom",
                    formatter: function (params) {
                      return (params.value * 100).toFixed(2) + "%";
                    },
                    textStyle: {
                      color: "#fff",
                      fontSize: 12,
                    },
                  },
                },
              },
              data: newData.rateData,
            },
            {
              name: "常住人口",
              type: "bar",
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#956FD4" },
                    { offset: 1, color: "#3EACE5" },
                  ]),
                  label: {
                    show: true,
                    position: "top",
                    textStyle: {
                      color: "#fff",
                      fontSize: 12,
                    },
                  },
                },
              },
              data: newData.barData,
            },
          ],
        };
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>