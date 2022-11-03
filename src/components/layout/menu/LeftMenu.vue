<template>
  <div class="leftMenu" ref="leftMenu">
    <div class="menu-content">
      <el-menu
       :default-active="$route.path"
        background-color="rgba(0,0,0,0)"
        text-color="rgb(200,200,200)"
        active-text-color="#357599"
        mode="vertical"
      >
      <MenuItem
        v-for="(route, index) in routersList"
        :key="index"
        :item="route"
        :fatherPath="route.path"
      ></MenuItem>
      </el-menu>
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import router from "@/router/index.js"
export default {
  data() {
    return {
      clickCount: 0,
      isFold: true,
      routersList:[],
    };
  },
  components:{
    MenuItem,
  },
  mounted(){
    this.routersList = router.options.routes[2].children;
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.leftMenu {
  width: 100%;
  height: 100%;
  // background-color:rgba(0, 25, 46, 0);
  // background: rgba(0, 25, 46, 0);
  position: absolute;
  left: 0px;
  z-index: 999;
  overflow-y: scroll;
}
::-webkit-scrollbar {display:none}
.el-menu {
  border: 0 !important;
}
</style>

<style>
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #003366 !important;
  /* min-width:100% !important; */
}
</style>