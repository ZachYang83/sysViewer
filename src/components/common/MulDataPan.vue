<template>
  <div class="mulDataPan">
    <div class="head">
      <div
        v-for="(item, index) in tabItems"
        :key="index"
        class="tabItem"
        @click="changeTab(index,item.text)"
        :class="{ isActive: position === index }"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: 0,
    };
  },
  props: {
    tabItems: {
      default: Array,
    },
    activeName: {
      default: null,
    },
  },
  methods: {
    changeTab(index,val) {
        let _this = this;
      console.log(index,val, "index");
      this.position = index;
      switch(index){
          case 0:
              _this.$parent.setOccuData();
              break;
          case 1:
              _this.$parent.setHjData();
              break;
          case 2:
              _this.$parent.setNlData();
              break;
          case 3:
              _this.$parent.setPopData();
              break;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.mulDataPan {
  position: absolute;
  width: fit-content;
  height: auto;
  cursor: pointer;
  padding: 5px;
  z-index: 999;
  background: linear-gradient(to left, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) right top no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to bottom, #17c5a5, #17c5a5) left bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat,
    linear-gradient(to left, #17c5a5, #17c5a5) right bottom no-repeat;
  background-size: 1px 15px, 15px 1px;
  background-color: rgba(44, 47, 48, 0.7);

  .head {
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 5px;
    background: rgba(100, 191, 255, 0.3);
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;

    .tabItem {
      display: flex;
      flex: 1;
      //   border: solid 1px darkmagenta;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      color: aliceblue;
    }

    .tabItem:hover {
      background-color: rgba(102, 102, 102, 0.9);
    }

    .isActive {
      background-color: aquamarine;
    }
  }

  .body{
    width:100%;
    height: calc(100% - 65px);
  }
}
</style>