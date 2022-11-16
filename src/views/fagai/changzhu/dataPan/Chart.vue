<template>
  <div id="changzhu">
    <div id="city_pan"></div>
    <div id="county_pan"></div>
  </div>
</template>

<script>
let barChart;
let pieChart;
export default {
  name: "cz_chart",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var cityBar = document.getElementById("city_pan");
    barChart = echarts.init(cityBar);
    var countyBar = document.getElementById("county_pan");
    pieChart = echarts.init(countyBar);
    // this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      console.log(datas, "dafafafasd");
      this.$nextTick(() => {
        barChart.resize();
        pieChart.resize();
      });
      let shiData = datas.shiData;
      shiData.sort((a, b) => {
        return a.pop - b.pop;
      });
      let datax = [];
      let datay = [];
      shiData.forEach((item) => {
        datay.push(item.city);
        datax.push(item.pop);
      });
      let bar_option = {
        title: {
          left: "center",
          text: "地级市月度常住人口",
          textStyle: {
            color: "#BDBDBD",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          x: 50,
          y: 30,
          y2: 30,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.02],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
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
      barChart.setOption(bar_option, true);

      let monthData = datas.monthdata;
      let pie_option = {
        title: {
          left: "center",
          text: "区县各月常住人口",
          textStyle: {
            color: "#BDBDBD",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          x: 50,
          y: 50,
          y2: 30,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.02],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          axisTick: {
            show: false,
          },
        },
        xAxis: {
          type: "category",
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月'],
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
            data: monthData,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
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
      pieChart.setOption(pie_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#changzhu {
  width: 100%;
  height: 100%;
}

#city_pan {
  width: 100%;
  height: 55%;
  padding: 5px;
}

#county_pan {
  width: 100%;
  height: 45%;
  padding: 5px;
}
</style>