<template>
  <div>
    <div class="tool-bar">
      <el-popover placement="bottom" width="300" trigger="click">
        <!-- <Tree></Tree> -->
        <h2 style="textalign: center">图层</h2>
        <div slot="reference" class="icon-box">
          <i class="icon-layer"></i> 图层
        </div>
      </el-popover>
      <el-dropdown trigger="hover">
        <div class="icon-box el-dropdown-link">
          <i class="icon-baselayer"></i> 底图
        </div>
        <el-dropdown-menu slot="dropdown">
          <template v-for="item in mapStylies">
            <el-dropdown-item
              :key="item.index"
              :index="item.index"
              @click.native="selectMap(item)"
              class="dropdown"
            >
              <img class="basemap" :src="item.img" />
              <div class="basemap_name">{{ item.title }}</div>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Tree from "../components/Tree.vue";
import axios from "axios";
import {switchMapStyle,switchBaseMap} from "../utils/resetStyle.ts";

const geoqMap = {
  version: 8,
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  sources: {
    mapsource: {
      type: "raster",
      tiles: [
        "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "mapsource",
      type: "raster",
      source: "mapsource",
      minzoom: 0,
      maxzoom: 18,
    },
  ],
};
export default {
  data() {
    return {
      mapStylies: [
        {
          index: "satellite",
          title: "卫星",
          img: require("assets/map/satellite.png"),
          style: "mapbox/satellite-v9",
        },
        {
          index: "dark",
          title: "幻影黑",
          img: require("../assets/map/dark.png"),
          style: "mapbox/dark-v10",
        },
        {
          index: "light",
          title: "远山黛",
          img: require("../assets/map/light.png"),
          style: "mapbox/light-v10",
        },
        {
          index: "outdoor",
          title: "草色青",
          img: require("../assets/map/outdoor.png"),
          style: "mapbox/outdoors-v11",
        },
        {
          index: "geoq",
          title: "极夜蓝",
          img: require("../assets/map/blue.png"),
          style: geoqMap,
        },
      ],
    };
  },
  components: {
    Tree,
  },
  methods: {
    selectMap(item) {
      console.log(item.style);
      switchBaseMap(window.MAP, item.style);
      switchMapStyle({
        map: window.MAP,
        style: item.style,
        layersList: ["fg_gongyeyuan", "fg_gongyeyuan"],
        sourcesList: ["fg_gongyeyuan", "fg_gongyeyuan"],
      });
    },

    
  },
};
</script>

<style lang="scss" scoped>
.tool-bar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.6);
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
}

.icon-box {
  height: 36px;
  width: 60px;
  display: inline-block;
  cursor: pointer;
  margin-left: 20px;
}
.icon-box i {
  opacity: 0.8;
}
.icon-box:hover {
  color: #fff;
}
.icon-box:hover i {
  opacity: 1;
}

.icon-baselayer {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("../assets/basemap.png") no-repeat;
  background-size: 100%;
  vertical-align: -4px;
}

.icon-layer {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: url("../assets/layer.png") no-repeat;
  background-size: 100%;
  vertical-align: -8px;
}

.basemap {
  width: 100%;
  height: 50px;
  display: block;
  box-sizing: border-box;
}

.basemap_name {
  height: auto;
  width: 100%;
  text-align: center;
  line-height: 20px;
}
</style>

<style>
.el-popover[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: rgba(153, 163, 171, 1) !important;
}
.el-popover[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(153, 163, 171, 1) !important;
}
.el-popover {
  background-color: rgba(153, 163, 171, 1) !important;
  border-color: rgba(153, 163, 171, 1) !important;
}

.el-dropdown-menu__item {
  padding: 0 5px !important;
  width: 60px !important;
  height: auto !important;
  margin-bottom: 10px !important;
}
</style>