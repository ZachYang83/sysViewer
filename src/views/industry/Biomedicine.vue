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
    init_map(window.MAP, [113.697084, 23.240441], 8.5);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      var circle = {
        "circle-radius": 5,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
        "circle-color": [
          "match",
          ["get", "产业链"],
          "上游",
          "#dce775",
          "中游",
          "#ff80ab",
          "下游",
          "#4fc3f7",
          "#d4e157",
        ],
      };
      add_tms(window.MAP, "biomedical_comp", "circle", circle);

      var layoutName = {
        "icon-image": "",
        "text-field": "{公司名}", //此属性为需要显示的字段
        "text-size": 12,
        "text-anchor": "top",
      };
      window.MAP.addLayer({
        id: "biomedical_comp_sym",
        source: "biomedical_comp",
        "source-layer": "biomedical_comp",
        type: "symbol",
        layout: layoutName,
        paint: {
          "text-color": "rgba(247,255,62,1)",
        },
      });

      window.MAP.addLayer({
        id: "biomedical_comp-hl",
        type: "circle",
        source: "biomedical_comp",
        "source-layer": "biomedical_comp",
        paint: {
          "circle-color": "#18ffff",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        filter: ["in", "OBJECTID", ""],
      });

      var line = {
        "line-color": "#9e9e9e",
        "line-width": 2,
      };
      add_tms(window.MAP, "gz_line", "line", line);
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
      console.log(features, "features");
      if (features[0].layer.id == "biomedical_comp") {
        var props = features[0].properties;
        console.log(props, "props");
        window.MAP.setFilter("biomedical_comp-hl", [
          "in",
          "OBJECTID",
          features[0].properties.OBJECTID,
        ]);
        _this.propsData = [
          {
            prop: "公司名称",
            value: props["公司名"],
          },
          {
            prop: "公司类型",
            value: props["公司类"],
          },
          {
            prop: "经营状况",
            value: props["经营状"],
          },
          {
            prop: "所属行业",
            value: props["所属行"],
          },
          {
            prop: "领域",
            value: props["领域"],
          },
          {
            prop: "注册资本",
            value: props["注册资"],
          },
          {
            prop: "实缴资本",
            value: props["实缴资"],
          },
          {
            prop: "参保人数",
            value: props["参保人"],
          },
          {
            prop: "所属园区",
            value: props["所属园"],
          },
          {
            prop: "地址",
            value: props["地址"],
          },
          {
            prop: "经营范围",
            value: props["经营范"],
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
  },
  destroyed() {
    let _this = this;
    removeLayers(window.MAP, [
      "gz_line",
      "biomedical_comp_sym",
      "biomedical_comp-hl",
      "biomedical_comp",
    ]);
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