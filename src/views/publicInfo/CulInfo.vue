<template>
  <div>
    <data-bar
      title="全市类型占比"
      style="top: 40px; right: 10px; width: 356px; height: 330px"
    >
      <div id="pie_culdata"></div>
    </data-bar>
    <data-bar
      title="各区文化设施数量"
      style="top: 390px; right: 10px; width: 356px; height: 460px"
    >
      <div id="bar_culdata"></div>
    </data-bar>
  </div>
</template>

<script>
import EchartsLayer from "utils/EchartsLayer.js";
import { get_culData, getPubDistData } from "api/publicInfo/culInfo.js";
import DataBar from "components/common/DataBar_R.vue";

let cul_data = [];
let echartslayer = null;
export default {
  components: {
    DataBar,
  },
  mounted() {
    this.init();
    this.setScatter();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 23.1]);
      window.MAP.setZoom(12);
    },
    setScatter() {
      get_culData("/public_info/pub-cul/all").then((res) => {
        var res_data = res.data.data;
        console.log(res_data, "res_data");
        for (let i = 0; i < res_data.length; i++) {
          var obj = {
            name: res_data[i].name,
            value: [
              res_data[i].lon,
              res_data[i].lat,
              res_data[i].name,
              res_data[i].ssdl,
              res_data[i].ssxl,
              res_data[i].zt,
              res_data[i].adress,
              res_data[i].area,
              res_data[i].ssjb,
              res_data[i].scale,
              res_data[i].hallArea,
              res_data[i].visitors,
              res_data[i].books,
              res_data[i].useTimes,
              res_data[i].exhibits,
            ],
          };
          cul_data.push(obj);
        }
        console.log(cul_data, "cul_data");
        var option = {
          tooltip: {
            trigger: "item",
            formatter: function (d) {
              let info =
                "<strong style='font-size:15px'>设施名称:  " +
                d.value[2] +
                "</strong><br />  设施大类:  " +
                d.value[3] +
                "<br />  设施小类:  " +
                d.value[4] +
                "<br />  详细地址:  " +
                d.value[6] +
                "<br />  状态:  " +
                d.value[5] +
                "<br />  建筑面积:  " +
                d.value[7] +
                "<br />  设施级别:  " +
                d.value[8] +
                "<br />  规模级别:  " +
                d.value[9] +
                "<br />  展厅面积:  " +
                d.value[10] +
                "<br />  平均每年接待参观人次:  " +
                d.value[11] +
                "<br />  总藏书量:  " +
                d.value[11] +
                "<br />  平均每年使用人次:  " +
                d.value[12] +
                "<br />  上一年度展品总数:  " +
                d.value[13];
              return info;
            },
          },
          GLMap: {
            roam: false,
          },
          coordinateSystem: "GLMap",
          //   color: "#9c27b0",
          series: [
            {
              name: "eduInfo",
              type: "scatter",
              coordinateSystem: "GLMap",
              data: cul_data,
              symbolSize: 10,
              large: true,
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: "#2060df",
                },
                emphasis: {
                  borderColor: "#fff",
                  borderWidth: 1,
                },
              },
            },
          ],
        };
        echartslayer = new EchartsLayer(window.MAP);
        console.log(echartslayer, "echartslayer");
        echartslayer.chart.setOption(option);
        this.pie_chart();
        this.bar_chart();
      });
    },
    renderEcharts() {
      this.pie_chart();
      this.bar_chart();
    },
    pie_chart() {
      var pie_Dom = document.getElementById("pie_culdata");
      var pie_Chart = echarts.init(pie_Dom);
      var pie_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}{d}%",
        },
        series: [
          {
            name: "全市类型占比",
            type: "pie",
            radius: ["40%", "90%"],
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
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#dfcf20",
                    "#80df20",
                    "#20dfdf",
                    "#2060df",
                    "#8020df",
                    "#df20af",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: "{b}\n{d}%",
                },
              },
            },
            data: [
              { value: 1792, name: "民政" },
              { value: 182, name: "体育" },
              { value: 1794, name: "医疗" },
              { value: 271, name: "文化", selected: true  },
              { value: 416, name: "政法"},
              { value: 3482, name: "教育" },
            ],
          },
        ],
      };
      pie_Chart.setOption(pie_option);
      pie_Chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 3,
      });
    },
    bar_chart() {
      var bar_Dom = document.getElementById("bar_culdata");
      var bar_Chart = echarts.init(bar_Dom);
      getPubDistData("/public_info/pubinfo-dist/cul_info").then((res) => {
        var pubDist_data = res.data.data;
        console.log(pubDist_data, "pubDist_data");
        let bar_datax = [];
        let bar_datay = [];
        for (let i = 0; i < pubDist_data.length; i++) {
          bar_datax.push(pubDist_data[i].sumCul);
          bar_datay.push(pubDist_data[i].xzq);
        }
        console.log(bar_datax, bar_datay, "bar_datax");
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}{c}",
          },
          grid: {
            x: 40,
            y: 20,
            y2: 20,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
          },
          yAxis: {
            type: "category",
            data: bar_datay,
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              rotate: 45,
              interval: 0,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
          },
          color: "#2060df",
          series: [
            {
              type: "bar",
              data: bar_datax,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "right", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "white",
                      fontSize: 13,
                    },
                  },
                },
              },
            },
          ],
        };
        bar_Chart.setOption(bar_option);
      });
    },
  },
  destroyed() {
    echartslayer.remove();
    window.MAP.setCenter([113.35, 23.1]);
  },
};
</script>

<style lang="scss" scoped>
#pie_culdata {
  width: 100%;
  height: calc(100% - 30px);
  padding: 5px;
  box-sizing: border-box;
  z-index: 9999;
}

#bar_culdata {
  width: 100%;
  height: calc(100% - 30px);
  padding: 5px;
  box-sizing: border-box;
  z-index: 9999;
}
</style>