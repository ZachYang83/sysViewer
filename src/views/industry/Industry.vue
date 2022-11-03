<template>
  <div>
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
      visible: false,
      propsData: [],
    };
  },
  components: {
    Popup,
  },
  mounted() {
    init_map(window.MAP, [113.297084, 23.140441], 9);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
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
      add_tms(window.MAP, "wlsys-industry", "fill", circle);

      window.MAP.addLayer({
        id: "wlsys-industry-hl",
        type: "line",
        source: "wlsys-industry",
        "source-layer": "wlsys-industry",
        paint: {
          "line-color": "#18ffff",
          "line-width": 3,
        },
        filter: ["in", "objectid", ""],
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
      console.log(event, "ddsfsdf");
      var features = window.MAP.queryRenderedFeatures(e.point);
      if (features[0].layer.id == "wlsys-industry") {
        var props = features[0].properties;
        console.log(props, "props");
         window.MAP.setFilter("wlsys-industry-hl",[
          "in",
          "objectid",
          features[0].properties.objectid
        ])
        _this.propsData = [
          {
            prop: "地块名称",
            value: props["地块名称"],
          },
          {
            prop: "地块位置",
            value: props["地块位置"],
          },
          {
            prop: "地块面积",
            value: props["地块面积（"],
          },
          {
            prop: "所属平台",
            value: props["所属平台（"],
          },
          {
            prop: "产业定位",
            value: props["产业定位"],
          },
          {
            prop: "控规情况",
            value: props["控规情况"],
          },
          {
            prop: "优先发展产业",
            value: props["优先发展产"],
          },
          {
            prop: "总体分析",
            value: props["总体分析"],
          },
        ];
      }
      _this.visible = true;
      var infoBox = document.getElementById("infoBox");
      infoBox.style.top = e.originalEvent.clientY - 120 + "px";
      infoBox.style.left = e.originalEvent.clientX + 40 + "px";
    },
    onCancel() {
      this.visible = false;
    },
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, ["wlsys-industry","wlsys-industry-hl"]);
    window.MAP.off("click", _this.getInfo);
    window.MAP.off("mousemove", _this.cursorMove);
  },
};
</script>

<style lang="scss" scoped>
.info-box {
  position: absolute;
  width: 300px;
  height: auto;
}
</style>