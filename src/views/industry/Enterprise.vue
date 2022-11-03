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
} from "utils/loadLayer2.js";
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
    init_map(window.MAP, [113.297084, 23.140441], 14);
    this.initLayers();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      removeLayers(window.MAP, ["hhg-hongxian"]);
      add_wms(window.MAP, "hhg-hongxian");
      var circle = {
        "circle-color": "#ffff00",
        "circle-radius": 6,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      };
      add_tms(window.MAP, "hhg-enterprise", "circle", circle);

      window.MAP.addLayer({
        id: "hhg-enterprise-hl",
        type: "circle",
        source: "hhg-enterprise",
        "source-layer": "hhg-enterprise",
        paint: {
          "circle-color": "#18ffff",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        filter: ["in", "myid", ""],
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
      if (features[0].layer.id == "hhg-enterprise") {
        var props = features[0].properties;
         window.MAP.setFilter("hhg-enterprise-hl",[
          "in",
          "myid",
          features[0].properties.myid
        ])
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
            prop: "所属行业",
            value: props["所属行"],
          },
          {
            prop: "注册号码",
            value: props["注册号"],
          },
          {
            prop: "注册资金",
            value: props["注册资"],
          },
          {
            prop: "法人",
            value: props["法定代"],
          },
          {
            prop: "电话",
            value: props["电话"],
          },
          {
            prop: "经营状况",
            value: props["经营状"],
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
    removeLayers(window.MAP, ["hhg-enterprise-hl","hhg-enterprise","hhg-hongxian"]);
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