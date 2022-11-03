<template>
  <div>
    <!-- 年度开工率 -->
    <Echart
      :options="options"
      id="bottomLeftChart"
      height="600px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/components/common/echart/index.vue";
import hexGrid from "@turf/hex-grid";
import TransportationODVue from "../../population/TransportationOD.vue";
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
          grid: {
            left: "30%",
            right: "15%",
            width: "55%",
            bottom: "10%",
            top:"5%"
          },
          yAxis: {
            type: 'category',
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
          },
          xAxis: [
            {
              type: "value",
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4",
                },
              },
              name: "万人",
              axisLabel: {
                formatter: "{value} ",
              },
            },
          ],
          series: [
            {
              name: "常住人口",
              type: "bar",
              barWidth: 15,
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#956FD4" },
                    { offset: 1, color: "#3EACE5" },
                  ]),
                  label: {
                    show: true,
                    position: "left",
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