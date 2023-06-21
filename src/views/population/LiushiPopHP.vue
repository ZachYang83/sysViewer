<template>
  <div>
    <Legend
      :title="legendTitle"
      :items="items"
      style="bottom: 20px; left: 10px; width: 200px; height: auto"
    >
    </Legend>
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
import { removeLayers, removeLayers2 } from "utils/removeLayers.js";
import Legend from "components/common/Legend.vue";
export default {
  data() {
    return {
      legendTitle: "流失人口",
      items: [
        {
          index: 1,
          text: "50以下",
          style: "backgroundColor:rgba(69,117,181,1)",
        },
        {
          index: 2,
          text: "50 - 100",
          style: "backgroundColor:rgba(141,165,186,1)",
        },
        {
          index: 3,
          text: "100 - 150",
          style: "backgroundColor:rgba(217,224,191,1)",
        },
        {
          index: 4,
          text: "150- 200",
          style: "backgroundColor:rgba(252,211,154,1)",
        },
        {
          index: 5,
          text: "200 - 250",
          style: "backgroundColor:rgba(240,129,89,1)",
        },
        {
          index: 6,
          text: "250 - 300",
          style: "backgroundColor:rgba(214,47,39,1)",
        },
        {
          index: 7,
          text: "300以上",
          style: "backgroundColor:rgba(204,30,21,1)",
        },
      ],
      pic_value: "",
    };
  },
  components: {
    Legend,
  },
  mounted() {
    this.init();
    this.init_layer();
  },
  methods: {
    init() {
      init_map(window.MAP, [113.697084, 23.240441], 8.5);
    },
    init_layer() {
      var paint = {
        "fill-color": [
          "case",
          ["<", ["get", "pop"], 50],
          "rgba(69,117,181,0.7)",
          ["<", ["get", "pop"], 100],
          "rgba(141,165,186,0.7)",
          ["<", ["get", "pop"], 150],
          "rgba(217,224,191,0.7)",
          ["<", ["get", "pop"], 200],
          "rgba(252,211,154,0.7)",
          ["<", ["get", "pop"], 250],
          "rgba(240,129,89,0.7)",
          ["<", ["get", "pop"], 300],
          "rgba(214,47,39,0.7)",
          "rgba(204,30,21,0.7)",
        ],
      };
      add_tms(window.MAP, "wlsys-huangpu_liushi_20_22", "fill", paint);
      var paint2 = {
        "line-color": "#fff",
        "line-width": 1.3,
      };
      add_tms(window.MAP, "wlsys-gz_line", "line", paint2);
      
      window.MAP.addLayer({
        id: "wlsys-huangpu_liushi_20_22_sym",
        source: "wlsys-huangpu_liushi_20_22",
        "source-layer": "wlsys-huangpu_liushi_20_22",
        type: "symbol",
        layout: {
          "icon-image": "",
          "text-field": "{pop}", //此属性为需要显示的字段
          "text-size": 14,
          "text-anchor": "top",
        },
        paint:{
            'text-color':'#fff',
            'text-translate-anchor': 'map'
        }
      });

    },
  },
  destroyed() {
    removeLayers(window.MAP, [
      "wlsys-huangpu_liushi_20_22_sym",
      "wlsys-huangpu_liushi_20_22",
      "wlsys-gz_line",
    ]);
    
  },
};
</script>
<style lang="scss" scoped>
.census {
  position: absolute;
  top: 30px;
  left: 10px;
  height: 50px;
  width: 200px;
  color: aliceblue;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-select {
  width: 110px;
}
</style>