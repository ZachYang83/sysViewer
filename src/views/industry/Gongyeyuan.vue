<template>
  <div>
    <div class="infoGroup" v-show="showInfoPan">
      <div
        class="infoItem"
        style="marginright: 20px; backgroundcolor: rgba(224, 90, 57, 0.5)"
      >
        <div class="icon">
          <img :src="infoImgs[0]" />
        </div>
        <div class="content">
          <div class="text">就业人口</div>
          <div class="value">{{ jiuye }}</div>
        </div>
      </div>
      <div
        class="infoItem"
        style="marginright: 20px; backgroundcolor: rgba(241, 151, 17, 0.5)"
      >
        <div class="icon">
          <img :src="infoImgs[1]" />
        </div>
        <div class="content">
          <div class="text">居住人口</div>
          <div class="value">{{ juzhu }}</div>
        </div>
      </div>
      <div class="infoItem" style="backgroundcolor: rgba(62, 140, 110, 0.5)">
        <div class="icon">
          <img :src="infoImgs[2]" />
        </div>
        <div class="content">
          <div class="text">职住比</div>
          <div class="value">{{ percent }}</div>
        </div>
      </div>
    </div>
    <MulDataPan
      v-show="showDataPan"
      :tabItems="tabItems"
      :activeName="activeName"
      style="top: 90px; right: 70px; width: 350px; height: auto"
    >
      <div id="dataBody"></div>
    </MulDataPan>
    <Popup
      id="infoBox"
      v-model="visible"
      title="属性"
      class="info-box"
      @onCancel="onCancel"
    >
      <el-table :data="propsData" border style="width: 100%" height="400">
        <el-table-column align="center" prop="prop" label="属性" width="100">
        </el-table-column>
        <el-table-column align="center" prop="value" label="值" width="195">
        </el-table-column>
      </el-table>
    </Popup>
  </div>
</template>

<script>
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import { get_gyyData } from "api/industry/getGyy.js";
import { deleteEvt } from "utils/draw/delete.js";
import {
  postPopData,
  postOccuData,
  postHjData,
  postNlData,
} from "api/population/queryMap.js";
import MulDataPan from "components/common/MulDataPan.vue";
import Popup from "@/components/Popup.vue";
let dataChart;
let popData;
let occuData;
let hjData;
let nlData;
export default {
  components: {
    MulDataPan,
    Popup,
  },
  data() {
    return {
      visible: false,
      propsData: [],
      jiuye: 0,
      juzhu: 0,
      percent: 0,
      infoImgs: [
        require("assets/population/jiuye.png"),
        require("assets/population/juzhu.png"),
        require("assets/population/percent.png"),
      ],
      tabItems: [
        {
          name: "zhiye",
          label: "职业",
          text: "职 业",
        },
        {
          name: "huji",
          label: "户籍",
          text: "户 籍",
        },
        {
          name: "nianling",
          label: "年龄",
          text: "年 龄",
        },
        {
          name: "population",
          label: "分时人口",
          text: "分时人口",
        },
      ],
      activeName: "huji",
      position: "",
      showDataPan: false,
      showInfoPan: false,
    };
  },
  mounted() {
    this.init();
    this.loadWMS();
    this.mouseEvent();
  },
  methods: {
    init() {
      window.MAP.setCenter([113.35, 22.9]);
      window.MAP.setZoom(6.5);
    },
    loadWMS() {
      removeLayers(window.MAP, ["fg_gongyeyuan"]);
      var gongyeyuan = {
        "fill-outline-color": "#ea80fc",
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "#ea80fc",
          "#fff",
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.3,
        ],
      };
      add_tms(window.MAP, "fg_gongyeyuan", "fill", gongyeyuan);

      window.MAP.addLayer({
        id: "fg_gongyeyuan-line",
        type: "line",
        source: "fg_gongyeyuan",
        "source-layer": "fg_gongyeyuan",
        paint: {
          "line-color": "#ec407a",
          "line-width": 1.5,
        },
      });

      window.MAP.addLayer({
        id: "fg_gongyeyuan-hl",
        type: "line",
        source: "fg_gongyeyuan",
        "source-layer": "fg_gongyeyuan",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "id", ""],
      });

      var layoutName = {
        "icon-image": "",
        "text-field": "{开发区}", //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      window.MAP.addLayer({
        id: "fg_gongyeyuan_sym",
        source: "fg_gongyeyuan",
        "source-layer": "fg_gongyeyuan",
        type: "symbol",
        layout: layoutName,
        paint: {
          "text-color": "rgba(247,255,62,1)",
        },
      });
      var line = {
        "line-color": "#9e9e9e",
        "line-width": 2,
      };
      add_tms(window.MAP, "gdxzbj", "line", line);
    },
    mouseEvent() {
      let _this = this;
      window.MAP.on("mousemove", _this.cursorMove);
      window.MAP.on("click", _this.getInfo);
    },
    cursorMove(e) {
      window.MAP.getCanvas().style.cursor = "pointer";
    },
    getInfo(e) {
      let _this = this;
      let ids = [];
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "fg_gongyeyuan") {
        var props = features[0].properties;
        window.MAP.setFilter("fg_gongyeyuan-hl", [
          "in",
          "id",
          features[0].properties.id,
        ]);
        _this.propsData = [
          {
            prop: "开发区",
            value: props["开发区"],
          },
          {
            prop: "运营主体",
            value: props["园区运"],
          },
          {
            prop: "聚集产业",
            value: props["聚集产"],
          },
          {
            prop: "园区公司",
            value: props["园区内"],
          },
          {
            prop: "企业数",
            value: props["入驻企"],
          },
          {
            prop: "规划面积",
            value: props["园区规"],
          },
        ];
        let id = props.id;
        let url = "/industry/gyy-jz/getGyyId?id=" + id;
        get_gyyData(url).then((res) => {
          var res_data = res.data.data.gridids;
          console.log(res_data, "dfasfasdfs");
          let strs = res_data.split(",");
          for (let i of strs) {
            ids.push(parseInt(i));
          }
          console.log(ids, "ids");
          if (ids.length == 0) {
            _this.$message.error("该园区内无基站");
            return;
          } else {
            _this.showDataPan = true;
            _this.showInfoPan = true;
            var dataDom = document.getElementById("dataBody");
            dataChart = echarts.init(dataDom);
            console.log(ids, "ids2");
            postPopData("/pop_perceive/gd-zy500/getPop", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              // _this.$message.success("获取数据成功");
              popData = res.data.data;
              console.log(popData, "popData");
              var datax = [];
              var datay = [];
              for (let i = 0; i < popData.length; i++) {
                datax.push(popData[i].time);
                datay.push(popData[i].sums);
              }
              var max = Math.max.apply(null, datay);
              var min = Math.min.apply(null, datay);
              this.juzhu = Math.round(min);
              this.jiuye = Math.round(max - min * 0.8 + min * 0.3);
              this.percent = ((this.jiuye - this.juzhu) / this.juzhu).toFixed(
                2
              );
            });
            postOccuData("/pop_perceive/gd-zy500/getOccu", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              occuData = res.data.data;
              _this.setOccuData();
            });
            postHjData("/pop_perceive/gd-hj500/getHj", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              hjData = res.data.data;
              // _this.setHjData();
            });
            postNlData("/pop_perceive/gd-nl500/getNl", {
              ids: JSON.stringify(ids),
            }).then((res) => {
              nlData = res.data.data;
            });
          }
        });
      }
      _this.visible = true;
      var infoBox = document.getElementById("infoBox");
      infoBox.style.top = e.originalEvent.clientY - 120 + "px";
      infoBox.style.left = e.originalEvent.clientX + 40 + "px";
    },
    onCancel() {
      this.visible = false;
    },
    setPopData() {
      console.log(popData, "popData");
      var datax = [];
      var datay = [];
      for (let i = 0; i < popData.length; i++) {
        datax.push(popData[i].time);
        datay.push(popData[i].sums);
      }
      var max = Math.max.apply(null, datay);
      var min = Math.min.apply(null, datay);
      var datax = datax.reverse();
      var bar_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{c}",
        },
        grid: {
          left: 60,
          right: 80,
          top: 40,
          bottom: 25,
        },
        yAxis: {
          name: "时",
          type: "category",
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          data: datax,
          nameTextStyle: {
            fontSize: 12, //字体大小
          },
        },
        xAxis: {
          name: "人数",
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#00FFFF",
            },
          },
          nameTextStyle: {
            fontSize: 12, //字体大小
          },
        },
        color: "#00FFFF",
        series: [
          {
            type: "line",
            smooth: false,
            areaStyle: {},
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
      dataChart.setOption(bar_option);
    },
    setOccuData() {
      console.log(occuData, "occuData");
      this.$nextTick(() => {
        var getName = {
          adMedia: "广告媒体",
          architecture: "建筑",
          businessman: "商务人士",
          correspondence: "通信",
          eduTra: "教育培训",
          finance: "金融",
          indiBussiness: "个体客户",
          it: "it",
          logistics: "物流",
          manuIndustry: "制造业",
          medTreatment: "医疗",
          realEstate: "地产",
          salariatFixed: "工薪固定",
          salariatUnfixed: "工薪不固定",
          service: "服务",
          student: "学生",
          taxiDriver: "网约车司机",
        };
        var occu = occuData[0];
        var sortable = [];
        for (var key in occu) {
          if (occu[key] != null) {
            sortable.push([key, occu[key]]);
          }
        }

        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        let datax = [];
        let datay = [];
        for (let i = 0; i < sortable.length; i++) {
          datax.push(sortable[i][1]);
          datay.push(getName[sortable[i][0]]);
        }

        let zyDatax = datax;
        let zyDatay = datay;
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}",
          },
          grid: {
            x: 80,
            y: 10,
            y2: 20,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
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
        dataChart.setOption(bar_option, true);
      });
    },
    setHjData() {
      console.log(hjData, "hjData");
      this.$nextTick(() => {
        var getName = {
          anhui: "安徽",
          beijing: "北京",
          chongqing: "重庆",
          fujian: "福建",
          gansu: "甘肃",
          guangdong: "广东",
          guangxi: "广西",
          guizhou: "贵州",
          hainan: "海南",
          hebei: "河北",
          heilongjiang: "黑龙江",
          henan: "河南",
          hubei: "湖北",
          hunan: "湖南",
          jiangsu: "江苏",
          jiangxi: "江西",
          jilin: "吉林",
          liaoning: "辽宁",
          neimenggu: "内蒙古",
          ningxia: "宁夏",
          qinghai: "青海",
          shandong: "山东",
          shanghai: "上海",
          shanxi: "山西",
          sichuan: "四川",
          sx: "陕西",
          tianjin: "天津",
          xinjiang: "新疆",
          xizang: "西藏",
          yunnan: "云南",
          zhejiang: "浙江",
        };
        var hj = hjData[0];
        var sortable = [];
        for (var key in hj) {
          if (hj[key] != null && key != "sb") sortable.push([key, hj[key]]);
        }

        sortable.sort(function (a, b) {
          return a[1] - b[1];
        });
        let datax = [];
        let datay = [];
        for (let i = 0; i < sortable.length; i++) {
          datax.push(sortable[i][1]);
          datay.push(getName[sortable[i][0]]);
        }
        var bar_option = {
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
        dataChart.setOption(bar_option, true);
      });
    },
    setNlData() {
      console.log(nlData, "nlData");
      this.$nextTick(() => {
        var getName = {
          above65: ">65",
          betw611: "6-11",
          betw1215: "12-15",
          betw1618: "16-18",
          betw1922: "19-22",
          betw2325: "23-25",
          betw2634: "26-34",
          betw3545: "35-45",
          betw4655: "46-55",
          betw5665: "56-65",
        };
        var nl = nlData[0];
        var sortable = [];
        for (var key in nl) {
          if (nl[key] != null && key != "sb" && key != "totalPop") {
            sortable.push([key, nl[key]]);
          }
        }
        let datax = [];
        let datay = [];
        for (let i = 0; i < sortable.length; i++) {
          datax.push(sortable[i][1]);
          datay.push(getName[sortable[i][0]]);
        }
        var bar_option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}:{c}",
          },
          grid: {
            x: 80,
            y: 10,
            y2: 40,
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
              // barWidth: 12,
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
        dataChart.setOption(bar_option, true);
      });
    },
  },

  destroyed() {
    let _this = this;
    removeLayers(window.MAP, [
      "gdxzbj",
      "fg_gongyeyuan_sym",
      "fg_gongyeyuan-hl",
      "fg_gongyeyuan-line",
      "fg_gongyeyuan",
    ]);
    window.MAP.off("click", _this.getInfo);
    window.MAP.off("mousemove", _this.cursorMove);
  },
};
</script>

<style lang='scss' scoped>
.drawGroup {
  position: absolute;
  top: 40px;
  left: 10px;
  width: fit-content;
  height: auto;
  cursor: pointer;
  z-index: 999;
  // padding:3px;
  border-radius: 5px;
  background-color: aliceblue;

  .drawItem {
    width: 42px;
    height: 42px;
    // background-color: aquamarine;
    padding: 1px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-bottom: solid 2px darkgrey;
  }

  .drawItem:hover {
    background-color: rgba(102, 102, 102, 0.2);
  }

  div:not(:last-child) {
    border-bottom: solid 2px darkgrey;
  }

  .isActive {
    background-color: rgba(102, 102, 102, 0.4);
  }
}

#dataBody {
  width: 350px;
  height: 680px;
  // padding: 5px;
  box-sizing: border-box;
  z-index: 999;
}

.infoGroup {
  position: absolute;
  display: flex;
  top: 10px;
  right: 10px;
  width: 490px;
  height: 70px;
  padding: 5px;
  box-sizing: border-box;

  background-color: rgba(44, 47, 48, 0.7);
  z-index: 999;
  justify-content: space-evenly;

  .infoItem {
    display: flex;
    flex: 1;
    border-radius: 10px;
    // background-color: aqua;

    .icon {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      // background-color: aqua;
    }

    .content {
      display: flex;
      flex: 2;
      flex-direction: column;
      // background-color:aquamarine;

      .text {
        flex: 2;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: aliceblue;
        padding-right: 10px;
        font-weight: 600;
        font-size: 18px;
        // background-color:blueviolet;
      }

      .value {
        flex: 1.5;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: aliceblue;
        padding-right: 10px;
        // background-color:brown;
      }
    }
  }
}
</style>