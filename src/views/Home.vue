<template>
  <div class="base-page">
    <div class="head"><Header></Header></div>
    <div class="container">
      <div class="sidebar" :class="{fold: isFold}">
        <LeftMenu></LeftMenu>
        <span class="fold-button" @click="foldClick">
          <i class="el-icon-arrow-right" :class="{ right: isFold }"></i>
        </span>
      </div>
      <div class="mapbox">
        <BaseMap></BaseMap>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/layout/Header.vue";
import BaseMap from "../components/layout/BaseMap.vue";
import LeftMenu from "../components/layout/menu/LeftMenu.vue";

export default {
  name: "Home",
  components: {
    Header,
    BaseMap,
    LeftMenu,
  },
  data() {
    return {
      isFold: false,
    };
  },
  methods: {
    foldClick() {
      this.isFold = !this.isFold;
      var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
      mapCanvas.style.width = '100%';
      setTimeout(()=>{window.MAP.resize();},10)
    },
  },
};
</script>

<style lang="scss" scoped>
.base-page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.head{
  width: 100%;
  height: 80px;
}

.container {
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  // table-layout: fixed;
  // width: 100%;
}

.sidebar {
  z-index: 999;
  width: 200px;
  height: 100%;
  display: inline-block;
  background: url('~assets/menu-bg.png') no-repeat  rgba(0,18,37,0.9);
  background-size: 100% 100%;
  position: relative;
  &.fold {
    width: 0;
  }
}

.mapbox {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.fold-button {
  display: inline-block;
  padding: 15px 0px;
  border-radius: 0 3px 3px 0;
  border: 1px solid #ddd;
  border-left: none;
  background: rgba(255, 255, 255,0.5);
  position: absolute;
  left: 100%;
  top: 50%;
  transform:translate(-0%,-50%);
  cursor: pointer;
  > i {
    transform: rotate(180deg);
    transition: 0.5s all;
    &.right {
      transform: rotate(0deg);
    }
  }
}
</style>
