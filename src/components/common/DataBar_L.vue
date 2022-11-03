<template>
  <div class="dataBar" ref="dataBar">
    <div v-if="!isFold" class="showState">
      <div class="head">
        <span class="title">
          <i class="el-icon-s-data" style="padding:0 3px"></i>
          <span>{{ title }}</span>
        </span>
        <span class="cancel" @click="unShowData">
            <i class="el-icon-close"></i>
        </span>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
    <div v-else class="foldState" @click="unShowData">
        <i class="el-icon-s-data" style="padding:0 3px"></i>
        <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataBar",
  props: {
    title: {
      default: null,
    },
  },
  data() {
    return {
      isFold: false,
    };
  },
  methods:{
      unShowData(){
          this.isFold = !this.isFold;
      }
  }
};
</script>

<style lang='scss' scoped>
.dataBar {
  position: absolute;
  width: fit-content;
  cursor: pointer;
  // top: 0px;
  // right: 50px;
  z-index: 999;
}

.showState {
  width:100%;
  height: 100%;
  // width: 354px;
  // height: 500px;
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
  padding: 2px;
  box-sizing: border-box;

  .head {
    position: relative;
    // width: 100%;
    height: 30px;
    background: rgba(100, 191, 255, 0.3);
    margin:5px 15px 0 5px ;
    border-left: 10px solid #64bfff;
    box-sizing: border-box;
    color: aliceblue;
    line-height: 30px;
    font-size: 20px;

    .cancel{
        float: right;
    }
  }

  .head::before{
    position: absolute;
    right: -10px;
    bottom: 0;
    content: "";
    border-bottom: 5px solid rgba(100,191,255,.3);
    border-right: 5px solid rgba(100,191,255,.3);
    border-color: rgba(100,191,255,.3) transparent transparent rgba(100,191,255,.3);
    border-style: solid;
    border-width: 5px;
    width: 0px;
    height: 0px;
    pointer-events: none;
  }

  .head::after{
    position: absolute;
    right: -10px;
    bottom: 10px;
    top: 0;
    content: "";
    background: rgba(100,191,255,.3);
    width: 10px;
    pointer-events: none;
  }

  .body{
    width:100%;
    height: calc(100% - 30px);
  }

}

.foldState{
    position: absolute;
    width:fit-content;
    left:0px;
    height: 40px;
    color: aliceblue;
    font-size: 18px;
    line-height: 40px;
    background-color: rgba(38,40,41,0.9);
    padding:4px 15px;
    border: 1px solid rgba(38,40,41,0.9);
}

.foldState:hover{
    border: 1px solid aliceblue;
    cursor: pointer;
}
</style>