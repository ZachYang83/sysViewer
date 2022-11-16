<template>
  <div id="lc_zhanbiData">
    <div id="lc_barpan"></div>
    <div id="lc_piepan"></div>
  </div>
</template>

<script>
let barChart;
let pieChart;
export default {
  name: "liuchu_zb",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    var dataBar = document.getElementById("lc_barpan");
    barChart = echarts.init(dataBar);
    var dataPie = document.getElementById("lc_piepan");
    pieChart = echarts.init(dataPie);
    this.setChart(this.datas);
  },
  methods: {
    setChart(datas) {
      this.$nextTick(() => {
        barChart.resize();
        pieChart.resize();
      });
      let monthData = [
        { key: "1月", value: datas.monthdata[0] },
        { key: "2月", value: datas.monthdata[1] },
        { key: "3月", value: datas.monthdata[2] },
        { key: "4月", value: datas.monthdata[3] },
        { key: "5月", value: datas.monthdata[4] },
        { key: "6月", value: datas.monthdata[5] },
        { key: "7月", value: datas.monthdata[6] },
        { key: "8月", value: datas.monthdata[7] },
        { key: "9月", value: datas.monthdata[8] },
      ];
      let datax = [];
      let datay = [];
      monthData.forEach((item) => {
        datax.push(item.key);
        datay.push(item.value);
      });
      let bar_option = {
        title: {
          left: "center",
          text: "区县月度流入人口",
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
      barChart.setOption(bar_option, true);

      let qxData = datas.countydata;
      qxData.sort((a, b) => {
        return a.temp - b.temp;
      });
      let qxData2 = []
      qxData.forEach((item) => {
        qxData2.push({
          name:item.county,
          value:item.temp,
        })
      });
      var pie_option = {
        title: {
          left: "center",
          text: "当月流入占全市流入比值",
          textStyle: {
            color: "#BDBDBD",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}{d}%",
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "80%"],
            avoidLabelOverlap: true,
            selectedMode: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inner",
                  textStyle: {
                    color: "#fff",
                    fontSize: 13,
                  },
                  formatter: "{b}\n{d}%",
                },
                labelLine: {
                  show: false,
                },
                // color: function (params) {
                //   //自定义颜色
                //   var colorList = [
                //     "#dfcf20",
                //     "#80df20",
                //     "#20dfdf",
                //     "#2060df",
                //     "#8020df",
                //     "#df20af",
                //   ];
                //   return colorList[params.dataIndex];
                // },
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: "{b}\n{d}%",
                },
              },
            },
            data:qxData2,
          },
        ],
      };
      pieChart.setOption(pie_option, true);
    },
  },
};
</script>

<style lang='scss' scoped>
#lc_zhanbiData {
  width: 100%;
  height: 100%;
}

#lc_barpan {
  width: 100%;
  height: 50%;
  padding: 5px;
}

#lc_piepan {
  width: 100%;
  height: 50%;
  padding: 5px;
}
</style>