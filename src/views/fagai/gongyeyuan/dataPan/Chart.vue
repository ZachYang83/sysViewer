<template>
  <div id="gyy_pop">
    <div id="workPop"></div>
    <div id="liudongPop"></div>
  </div>
</template>

<script>
let workChart;
let liudongChart;
export default {
  name: "gyy_pop",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var workBar = document.getElementById("workPop");
    workChart = echarts.init(workBar);
    var liudongBar = document.getElementById("liudongPop");
    liudongChart = echarts.init(liudongBar);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        workChart.resize();
        liudongChart.resize();
      });
      let workData = [
        { key: "1月", value: datas.workData[0] },
        { key: "2月", value: datas.workData[1] },
        { key: "3月", value: datas.workData[2] },
        { key: "4月", value: datas.workData[3] },
        { key: "5月", value: datas.workData[4] },
        { key: "6月", value: datas.workData[5] },
        { key: "7月", value: datas.workData[6] },
        { key: "8月", value: datas.workData[7] },
        { key: "9月", value: datas.workData[8] },
        { key: "10月", value: datas.workData[9] },
      ];
      let datax = [];
      let datay = [];
      workData.forEach((item) => {
        datax.push(item.key);
        datay.push(item.value);
      });
      let liudongData = [
        { key: "1月", value: datas.liudongData[0] },
        { key: "2月", value: datas.liudongData[1] },
        { key: "3月", value: datas.liudongData[2] },
        { key: "4月", value: datas.liudongData[3] },
        { key: "5月", value: datas.liudongData[4] },
        { key: "6月", value: datas.liudongData[5] },
        { key: "7月", value: datas.liudongData[6] },
        { key: "8月", value: datas.liudongData[7] },
        { key: "9月", value: datas.liudongData[8] },
        { key: "10月", value: datas.liudongData[9] },
      ];
      let datax1 = [];
      let datay1 = [];
      liudongData.forEach((item) => {
        datax1.push(item.key);
        datay1.push(item.value);
      });
      let work_option = {
        title: {
          left: "center",
          text: "月度工作人口",
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
          data: datax,
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
            data: datay,
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
      workChart.setOption(work_option, true);

      let liudong_option = {
        title: {
          left: "center",
          text: "月度流动人口",
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
          data: datax1,
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
            data: datay1,
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
      liudongChart.setOption(liudong_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#gyy_pop {
  width: 100%;
  height: 100%;
}

#workPop {
  width: 100%;
  height: 50%;
  padding: 5px;
}

#liudongPop {
  width: 100%;
  height: 50%;
  padding: 5px;
}
</style>