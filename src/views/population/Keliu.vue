<template>
  <div id="shangquan_keliu">
    <el-button type="primary" id="table" @click="changeShow">{{
      buttonName
    }}</el-button>
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
    <div class="keliu" v-show="showTable">
      <ve-table
        border-y
        :columns="columns"
        :table-data="tableData"
        :height="860"
        :cell-span-option="cellSpanOption"
        :cell-style-option="cellStyleOption"
      />
    </div>
  </div>
</template>

<script>
import { init_map } from "utils/initMap.js";
import {
  add_tms,
  add_wms,
  addgeojson_S,
  addgeojson_L,
} from "utils/loadLayer.js";
import { removeLayers } from "utils/removeLayers.js";
import Popup from "@/components/Popup.vue";
export default {
  data() {
    return {
      buttonName: "展开图表",
      showTable: false,
      visible: false,
      propsData: [],
      cellSpanOption: {
        bodyCellSpan: this.bodyCellSpan,
      },
      columns: [
        { field: "col1", key: "a", title: "商圈等级", width: "5%" },
        { field: "col2", key: "b", title: "重点商圈", width: "15%" },
        {
          title: "元旦",
          children: [
            {
              field: "col3",
              key: "c",
              title: "20230101",
              width: "5%",
            },
            {
              field: "col4",
              key: "d",
              title: "20230102",
              width: "5%",
            },
            {
              field: "col5",
              key: "e",
              title: "20230103",
              width: "5%",
            },
          ],
        },
        {
          field: "col6",
          key: "f",
          title: "元旦假期日均客流",
          width: "15%",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const cellData = row[column.field];

            const colorClass =
              cellData > 60
                ? "demo-blue"
                : cellData > 30
                ? "demo-orange"
                : "demo-red";

            return (
              <div class="proficiency-span-container">
                <span
                  class={"proficiency-span " + colorClass}
                  style={"width:" + (cellData / (14.24 - 0.08)) * 100 + "%;"}
                >
                  {cellData}
                </span>
              </div>
            );
          },
        },
        {
          title: "春节",
          children: [
            {
              field: "col7",
              key: "g",
              title: "20230121",
              width: "5%",
            },
            {
              field: "col8",
              key: "h",
              title: "20230122",
              width: "5%",
            },
            {
              field: "col9",
              key: "i",
              title: "20230123",
              width: "5%",
            },
            {
              field: "col10",
              key: "j",
              title: "20230124",
              width: "5%",
            },
            {
              field: "col11",
              key: "k",
              title: "20230125",
              width: "5%",
            },
            {
              field: "col12",
              key: "l",
              title: "20230126",
              width: "5%",
            },
            {
              field: "col13",
              key: "m",
              title: "20230127",
              width: "5%",
            },
          ],
        },
        {
          field: "col14",
          key: "n",
          title: "春节假期日均客流",
          width: "15%",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            const cellData = row[column.field];

            const colorClass =
              cellData > 60
                ? "demo-blue"
                : cellData > 30
                ? "demo-orange"
                : "demo-red";

            return (
              <div class="proficiency-span-container">
                <span
                  class={"proficiency-span " + colorClass}
                  style={"width:" + (cellData / (8.9 - 0.02)) * 100 + "%;"}
                >
                  {cellData}
                </span>
              </div>
            );
          },
        },
      ],
      tableData: [
        {
          rowKey: 1,
          col1: "都会级商业功能区",
          col2: "白鹅潭商业功能区",
          col3: 2.21,
          col4: 2.23,
          col5: 2.76,
          col6: 2.4,
          col7: 1.13,
          col8: 1.11,
          col9: 1.1,
          col10: 1.05,
          col11: 1.07,
          col12: 1.19,
          col13: 1.38,
          col14: 1.15,
        },
        {
          rowKey: 2,
          col1: "都会级商业功能区",
          col2: "白云新城",
          col3: 3.94,
          col4: 3.62,
          col5: 4.88,
          col6: 4.15,
          col7: 1.35,
          col8: 2.31,
          col9: 1.84,
          col10: 2.08,
          col11: 2.22,
          col12: 2.53,
          col13: 2.72,
          col14: 2.15,
        },
        {
          rowKey: 3,
          col1: "都会级商业功能区",
          col2: "北京路商业功能区",
          col3: 9.82,
          col4: 7.2,
          col5: 6.31,
          col6: 7.78,
          col7: 5.76,
          col8: 8.14,
          col9: 6.97,
          col10: 7.94,
          col11: 7.98,
          col12: 8.39,
          col13: 8.1,
          col14: 7.61,
        },
        {
          rowKey: 4,
          col1: "都会级商业功能区",
          col2: "广州国际金融城",
          col3: 10.25,
          col4: 10.3,
          col5: 12.87,
          col6: 11.14,
          col7: 3.68,
          col8: 3.22,
          col9: 3.35,
          col10: 3.22,
          col11: 3.34,
          col12: 3.9,
          col13: 4.74,
          col14: 3.64,
        },
        {
          rowKey: 5,
          col1: "都会级商业功能区",
          col2: "广州塔商业功能区",
          col3: 0.53,
          col4: 0.3,
          col5: 0.25,
          col6: 0.36,
          col7: 0.55,
          col8: 1.16,
          col9: 1.22,
          col10: 1.26,
          col11: 1.29,
          col12: 1.18,
          col13: 0.91,
          col14: 1.08,
        },
        {
          rowKey: 6,
          col1: "都会级商业功能区",
          col2: "环市东商业功能区",
          col3: 4.56,
          col4: 4.69,
          col5: 7.15,
          col6: 5.47,
          col7: 3.77,
          col8: 3.45,
          col9: 3.63,
          col10: 3.58,
          col11: 3.68,
          col12: 3.99,
          col13: 4.5,
          col14: 3.8,
        },
        {
          rowKey: 7,
          col1: "都会级商业功能区",
          col2: "蕉门河商业功能区",
          col3: 1.62,
          col4: 1.19,
          col5: 0.96,
          col6: 1.26,
          col7: 0.28,
          col8: 1.09,
          col9: 0.82,
          col10: 1.01,
          col11: 1.02,
          col12: 1.06,
          col13: 1.15,
          col14: 0.92,
        },
        {
          rowKey: 8,
          col1: "都会级商业功能区",
          col2: "科学城商业功能区",
          col3: 0.18,
          col4: 0.16,
          col5: 0.47,
          col6: 0.27,
          col7: 0.08,
          col8: 0.13,
          col9: 0.13,
          col10: 0.11,
          col11: 0.12,
          col12: 0.16,
          col13: 0.19,
          col14: 0.13,
        },
        {
          rowKey: 9,
          col1: "都会级商业功能区",
          col2: "农林下路商业功能区",
          col3: 0.31,
          col4: 0.34,
          col5: 0.58,
          col6: 0.41,
          col7: 0.23,
          col8: 0.2,
          col9: 0.2,
          col10: 0.19,
          col11: 0.22,
          col12: 0.24,
          col13: 0.28,
          col14: 0.22,
        },
        {
          rowKey: 10,
          col1: "都会级商业功能区",
          col2: "上下九",
          col3: 2.19,
          col4: 1.99,
          col5: 1.94,
          col6: 2.04,
          col7: 0.67,
          col8: 0.85,
          col9: 0.83,
          col10: 0.85,
          col11: 0.86,
          col12: 0.89,
          col13: 0.85,
          col14: 0.83,
        },
        {
          rowKey: 11,
          col1: "都会级商业功能区",
          col2: "十三行",
          col3: 0.46,
          col4: 1.09,
          col5: 1.23,
          col6: 0.93,
          col7: 0.17,
          col8: 0.16,
          col9: 0.15,
          col10: 0.15,
          col11: 0.14,
          col12: 0.15,
          col13: 0.16,
          col14: 0.15,
        },
        {
          rowKey: 12,
          col1: "都会级商业功能区",
          col2: "天河路商业功能区",
          col3: 15.72,
          col4: 12.82,
          col5: 13.38,
          col6: 13.97,
          col7: 4.83,
          col8: 8.72,
          col9: 8.01,
          col10: 9.74,
          col11: 9.85,
          col12: 10.44,
          col13: 10.69,
          col14: 8.9,
        },
        {
          rowKey: 13,
          col1: "都会级商业功能区",
          col2: "万博长隆汉溪商业功能区",
          col3: 4.48,
          col4: 3.73,
          col5: 4.24,
          col6: 4.15,
          col7: 1.08,
          col8: 2.31,
          col9: 2.11,
          col10: 2.62,
          col11: 2.6,
          col12: 2.8,
          col13: 2.96,
          col14: 2.35,
        },
        {
          rowKey: 14,
          col1: "都会级商业功能区",
          col2: "新华-广州北商圈",
          col3: 0.3,
          col4: 0.2,
          col5: 0.18,
          col6: 0.23,
          col7: 0.08,
          col8: 0.08,
          col9: 0.09,
          col10: 0.08,
          col11: 0.1,
          col12: 0.1,
          col13: 0.13,
          col14: 0.09,
        },
        {
          rowKey: 15,
          col1: "都会级商业功能区",
          col2: "增城广场",
          col3: 1.48,
          col4: 1.18,
          col5: 0.96,
          col6: 1.21,
          col7: 0.41,
          col8: 1.71,
          col9: 1.11,
          col10: 1.77,
          col11: 1.63,
          col12: 1.7,
          col13: 1.74,
          col14: 1.44,
        },
        {
          rowKey: 16,
          col1: "都会级商业功能区",
          col2: "珠江新城商业功能区",
          col3: 9.83,
          col4: 9.82,
          col5: 23.08,
          col6: 14.24,
          col7: 5.87,
          col8: 7.72,
          col9: 7.45,
          col10: 7.92,
          col11: 7.98,
          col12: 8.71,
          col13: 8.32,
          col14: 7.71,
        },
        {
          rowKey: 17,
          col1: "区级商业功能区",
          col2: "1978电影小镇",
          col3: 0.04,
          col4: 0.04,
          col5: 0.04,
          col6: 0.04,
          col7: 0.02,
          col8: 0.03,
          col9: 0.02,
          col10: 0.03,
          col11: 0.03,
          col12: 0.04,
          col13: 0.03,
          col14: 0.03,
        },
        {
          rowKey: 18,
          col1: "区级商业功能区",
          col2: "奥体商业功能区",
          col3: 4.43,
          col4: 4.55,
          col5: 5.02,
          col6: 4.67,
          col7: 0.97,
          col8: 1.23,
          col9: 1.14,
          col10: 1.18,
          col11: 1.22,
          col12: 1.4,
          col13: 1.71,
          col14: 1.27,
        },

        {
          rowKey: 19,
          col1: "区级商业功能区",
          col2: "滨江岭南文化商业功能区",
          col3: 0.22,
          col4: 0.25,
          col5: 0.3,
          col6: 0.26,
          col7: 0.19,
          col8: 0.2,
          col9: 0.2,
          col10: 0.21,
          col11: 0.18,
          col12: 0.19,
          col13: 0.2,
          col14: 0.2,
        },

        {
          rowKey: 20,
          col1: "区级商业功能区",
          col2: "大沙地",
          col3: 0.65,
          col4: 0.6,
          col5: 0.53,
          col6: 0.59,
          col7: 0.6,
          col8: 0.64,
          col9: 0.64,
          col10: 0.65,
          col11: 0.66,
          col12: 0.75,
          col13: 0.89,
          col14: 0.69,
        },

        {
          rowKey: 21,
          col1: "区级商业功能区",
          col2: "大学城",
          col3: 0.37,
          col4: 0.35,
          col5: 0.57,
          col6: 0.43,
          col7: 0.07,
          col8: 0.09,
          col9: 0.08,
          col10: 0.09,
          col11: 0.09,
          col12: 0.1,
          col13: 0.14,
          col14: 0.09,
        },

        {
          rowKey: 22,
          col1: "区级商业功能区",
          col2: "海塱商业功能区",
          col3: 0.68,
          col4: 0.6,
          col5: 0.54,
          col6: 0.61,
          col7: 0.29,
          col8: 0.84,
          col9: 0.56,
          col10: 0.81,
          col11: 0.86,
          col12: 0.92,
          col13: 0.92,
          col14: 0.74,
        },
        {
          rowKey: 23,
          col1: "区级商业功能区",
          col2: "海珠湿地商业功能区",
          col3: 0.12,
          col4: 0.15,
          col5: 0.4,
          col6: 0.22,
          col7: 0.01,
          col8: 0.01,
          col9: 0.02,
          col10: 0.02,
          col11: 0.02,
          col12: 0.02,
          col13: 0.03,
          col14: 0.02,
        },

        {
          rowKey: 24,
          col1: "区级商业功能区",
          col2: "江南商业功能区",
          col3: 3.07,
          col4: 2.97,
          col5: 3.03,
          col6: 3.02,
          col7: 1.82,
          col8: 2.17,
          col9: 2.1,
          col10: 2.18,
          col11: 2.25,
          col12: 2.44,
          col13: 2.7,
          col14: 2.24,
        },
        {
          rowKey: 25,
          col1: "区级商业功能区",
          col2: "江南西-太古仓",
          col3: 1.68,
          col4: 1.43,
          col5: 1.31,
          col6: 1.47,
          col7: 1.3,
          col8: 1.42,
          col9: 1.4,
          col10: 1.43,
          col11: 1.45,
          col12: 1.56,
          col13: 1.67,
          col14: 1.46,
        },
        {
          rowKey: 26,
          col1: "区级商业功能区",
          col2: "金沙洲",
          col3: 0.08,
          col4: 0.08,
          col5: 0.08,
          col6: 0.08,
          col7: 0.03,
          col8: 0.04,
          col9: 0.04,
          col10: 0.03,
          col11: 0.03,
          col12: 0.04,
          col13: 0.05,
          col14: 0.04,
        },
        {
          rowKey: 27,
          col1: "区级商业功能区",
          col2: "南岗新城",
          col3: 1.09,
          col4: 0.81,
          col5: 0.6,
          col6: 0.83,
          col7: 0.25,
          col8: 0.66,
          col9: 0.51,
          col10: 0.59,
          col11: 0.57,
          col12: 0.63,
          col13: 0.73,
          col14: 0.56,
        },
        {
          rowKey: 28,
          col1: "区级商业功能区",
          col2: "琶洲商业功能区",
          col3: 0.93,
          col4: 0.95,
          col5: 2.86,
          col6: 1.58,
          col7: 0.49,
          col8: 0.46,
          col9: 0.48,
          col10: 0.51,
          col11: 0.55,
          col12: 0.6,
          col13: 0.62,
          col14: 0.53,
        },
        {
          rowKey: 29,
          col1: "区级商业功能区",
          col2: "融创茂商业功能区",
          col3: 1.94,
          col4: 1.17,
          col5: 0.81,
          col6: 1.3,
          col7: 0.37,
          col8: 2.58,
          col9: 2.14,
          col10: 2.64,
          col11: 2.62,
          col12: 2.61,
          col13: 2.12,
          col14: 2.15,
        },

        {
          rowKey: 30,
          col1: "区级商业功能区",
          col2: "狮岭商业功能区",
          col3: 0.8,
          col4: 1.02,
          col5: 1.01,
          col6: 0.94,
          col7: 0.21,
          col8: 0.19,
          col9: 0.19,
          col10: 0.19,
          col11: 0.19,
          col12: 0.21,
          col13: 0.26,
          col14: 0.2,
        },

        {
          rowKey: 31,
          col1: "区级商业功能区",
          col2: "市桥商圈",
          col3: 0.16,
          col4: 0.14,
          col5: 0.14,
          col6: 0.15,
          col7: 0.03,
          col8: 0.05,
          col9: 0.05,
          col10: 0.05,
          col11: 0.06,
          col12: 0.08,
          col13: 0.08,
          col14: 0.06,
        },
        {
          rowKey: 32,
          col1: "区级商业功能区",
          col2: "晓港商业功能区",
          col3: 0.83,
          col4: 0.85,
          col5: 1.14,
          col6: 0.94,
          col7: 0.61,
          col8: 0.57,
          col9: 0.57,
          col10: 0.55,
          col11: 0.58,
          col12: 0.62,
          col13: 0.71,
          col14: 0.6,
        },
        {
          rowKey: 33,
          col1: "区级商业功能区",
          col2: "新塘牛仔城",
          col3: 0.86,
          col4: 0.96,
          col5: 0.94,
          col6: 0.92,
          col7: 0.15,
          col8: 0.13,
          col9: 0.12,
          col10: 0.12,
          col11: 0.13,
          col12: 0.16,
          col13: 0.22,
          col14: 0.15,
        },
        {
          rowKey: 34,
          col1: "总计",
          col2: "总计",
          col3: 85.82,
          col4: 77.79,
          col5: 100.57,
          col6: 88.06,
          col7: 37.38,
          col8: 53.67,
          col9: 49.26,
          col10: 54.86,
          col11: 55.6,
          col12: 59.81,
          col13: 61.92,
          col14: 53.21,
        },
      ],
      cellStyleOption: {
        bodyCellClass: ({ row, column, rowIndex }) => {
          if (
            (column.field === "col6" && rowIndex !== 33) ||
            (column.field === "col14" && rowIndex !== 33)
          ) {
            return "table-body-cell-class";
          } else if (column.field === "col1" && rowIndex !== 33) {
            return "body-cell-class-rank";
          } else if (rowIndex !== 33 && column.field !== "col2") {
            let yuandan = [row.col3, row.col4, row.col5];
            yuandan.sort((a, b) => {
              return a - b;
            });
            // return "table-body-cell-class-red1";
            // console.log(yuandan, "yuandan");
            // return "table-body-cell-class-red1";
            // [row.col3, row.col4, row.col5].forEach((item) => {
            //   if (yuandan.indexOf(item) === 1) {
            //     // console.log("true");
            //     return "table-body-cell-class-red1";
            //   }
            // });
          }
        },
      },
    };
  },
  components: {
    Popup,
  },
  mounted() {
    init_map(window.MAP, [113.697084, 23.240441], 8.5);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    changeShow() {
      this.showTable = !this.showTable;
      if (this.showTable) {
        this.buttonName = "折叠图表";
      } else {
        this.buttonName = "展开图表";
      }
    },
    initLayers() {
      var circle = {
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
          0.8,
        ],
      };
      add_tms(window.MAP, "shangquan_keliu", "fill", circle);
      var line = {
        "line-color": "#9e9e9e",
        "line-width": 2,
      };
      add_tms(window.MAP, "gz_line", "line", line);
      var layoutO = {
        "icon-image": "",
        "text-field": "{商圈}", //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      window.MAP.addLayer({
        id: "shangquan_keliu_sym",
        source: "shangquan_keliu",
        "source-layer": "shangquan_keliu",
        type: "symbol",
        layout: layoutO,
        paint: {
          "text-color": "rgba(247,255,62,1)",
        },
      });

      window.MAP.addLayer({
        id: "shangquan_keliu-hl",
        type: "line",
        source: "shangquan_keliu",
        "source-layer": "shangquan_keliu",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "OBJECTID", ""],
      });
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
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "shangquan_keliu") {
        var props = features[0].properties;
        window.MAP.setFilter("shangquan_keliu-hl", [
          "in",
          "OBJECTID",
          features[0].properties.OBJECTID,
        ]);
        _this.propsData = [
          {
            prop: "商圈名称",
            value: props["商圈"],
          },
          {
            prop: "1月1日",
            value: props["1月1日"],
          },
          {
            prop: "1月2日",
            value: props["1月2日"],
          },
          {
            prop: "1月3日",
            value: props["1月3日"],
          },
          {
            prop: "元旦平均客流",
            value: props["元旦平"],
          },
          {
            prop: "1月21日",
            value: props["1月21日"],
          },
          {
            prop: "1月22日",
            value: props["1月22日"],
          },
          {
            prop: "1月23日",
            value: props["1月23日"],
          },
          {
            prop: "1月24日",
            value: props["1月24日"],
          },
          {
            prop: "1月25日",
            value: props["1月25日"],
          },
          {
            prop: "1月26日",
            value: props["1月26日"],
          },
          {
            prop: "1月27日",
            value: props["1月27日"],
          },
          {
            prop: "春节平均客流",
            value: props["春节平"],
          },
        ];
      }
      _this.visible = true;
      var infoBox = document.getElementById("infoBox");
      infoBox.style.top = e.originalEvent.clientY + 10 + "px";
      infoBox.style.left = e.originalEvent.clientX + 20 + "px";
    },
    onCancel() {
      this.visible = false;
    },
    bodyCellSpan({ row, column, rowIndex }) {
      if (column.field === "col1") {
        if (rowIndex === 0) {
          return {
            rowspan: 16,
            colspan: 1,
          };
        } else if (rowIndex === 16) {
          return {
            rowspan: 17,
            colspan: 1,
          };
        } else if (rowIndex === 33) {
          return {
            rowspan: 1,
            colspan: 2,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      } else if (column.field === "col2") {
        if (rowIndex === 33) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, [
      "gz_line",
      "shangquan_keliu-hl",
      "shangquan_keliu_sym",
      "shangquan_keliu",
    ]);
    window.MAP.off("click", _this.getInfo);
    window.MAP.off("mousemove", _this.cursorMove);
  },
};
</script>

<style lang="scss">
#shangquan_keliu {
  position: absolute;
  width: 100%;
  height: 100%;
}

#table {
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 999;
  width: 80px !important;
  height: 30px !important;
  box-sizing: border-box !important;
}

.info-box {
  position: absolute;
  width: 300px;
  height: auto;
}

.keliu {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #fafafa;
  height: 100%;
  z-index: 99;
}

.body-cell-class-rank {
  background-color: RGBA(255, 179, 0, 0.7) !important;
  font-weight: 600;
}

.table-body-cell-class {
  // background: linear-gradient(
  //   90deg,
  //   rgba(75, 150, 249, 1),
  //   rgba(75, 150, 249, 0.6) 0,
  //   rgba(0, 150, 247, 0.3)
  // ) !important;
  // color: #fff !important;
  padding: 0 !important;
  text-align: center;
}

.table-body-cell-proficiency {
  padding: 0 !important;
}
.proficiency-span-container {
  height: 100% !important;
  width: 100% !important;
  text-align: left !important;
  .proficiency-span {
    height: 100% !important;
    display: inline-flex !important;
    align-items: center !important;
    padding-left: 10px !important;
    font-weight: bold !important;
    color: #555 !important;
    text-align: center !important;

    &.demo-red {
      background: linear-gradient(
        90deg,
        rgba(75, 150, 249, 1),
        rgba(75, 150, 249, 0.6) 0,
        rgba(0, 150, 247, 0.3)
      ) !important;
    }
  }
}

.table-body-cell-class-red1 {
  background: yellowgreen !important;
}
</style>

<style>
.ve-table
  .ve-table-container
  .ve-table-content-wrapper
  table.ve-table-content
  thead.ve-table-header
  tr.ve-table-header-tr {
  height: 37px !important;
}

.ve-table
  .ve-table-container
  .ve-table-content-wrapper
  table.ve-table-content
  thead.ve-table-header
  tr.ve-table-header-tr
  th.ve-table-header-th {
  background-color: #fafafa;
  padding: 7px !important;
  font-weight: 800;
  color: #000000d9;
  font-size: 14px;
}

.ve-table
  .ve-table-container
  .ve-table-content-wrapper
  table.ve-table-content
  tbody.ve-table-body
  tr.ve-table-body-tr,
.ve-table
  .ve-table-container
  .ve-table-content-wrapper
  table.ve-table-content
  tbody.ve-table-body
  tr.ve-table-expand-tr {
  height: 20px !important;
}

.ve-table
  .ve-table-container
  .ve-table-content-wrapper
  table.ve-table-content
  tbody.ve-table-body
  tr.ve-table-body-tr
  td.ve-table-body-td,
.ve-table
  .ve-table-container
  .ve-table-content-wrapper
  table.ve-table-content
  tbody.ve-table-body
  tr.ve-table-expand-tr
  td.ve-table-body-td {
  padding: 1px !important;
  white-space: pre-wrap;
  overflow: hidden;
}

.el-button {
  padding: 0px !important;
}
</style>

