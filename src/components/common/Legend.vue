<template>
  <div class="legendClass" ref="legendClass">
    <div v-if="!isFold" class="showState">
      <div class="head" @click="unShowData">
        <span class="title">
          <!-- <i class="el-icon-s-data" style="padding:0 3px"></i> -->
          <span>{{ title }}</span>
        </span>
        <!-- <span class="cancel" @click="unShowData">
            <i class="el-icon-close"></i>
        </span> -->
      </div>
      <div class="body">
        <template v-for="item in items">
          <li :index="item.index" :key="item.key" class="legendItem">
            <div class="color" :style="item.style"></div>
            <div class="legendText" :style='legentText'>{{item.text}}</div>
          </li>
        </template>
      </div>
    </div>
    <div v-else class="foldState" @click="unShowData">
        <!-- <i class="el-icon-s-data" style="padding:0 3px"></i> -->
        <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "legendClass",
  props: {
    title: {
      default: null,
    },
    items:{
      default:Array,
    },
    legentText:{
      default:null,
    }
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
.legendClass {
  position: absolute;
  width: fit-content;
  height: auto;
  min-height:40px;
  cursor: pointer;
  z-index: 999;
}

.showState {
  width:100%;
  height: 100%;
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
    height: 30px;
    background: rgba(100, 191, 255, 0.3);
    margin:5px;
    border-radius: 5px;
    box-sizing: border-box;
    color: aliceblue;
    line-height: 30px;
    font-size: 20px;
    text-align: center;
  }

  .body{
    width:100%;
    height: calc(100% - 40px);
    box-sizing: border-box;

    li{
      list-style: none;
    }

    .legendItem{
      width:100%;
      height: 30px;
      margin-bottom: 10px;
      display: flex;

      .color{
        display: flex;
        flex:1;
        height: 30px;
        margin:0 10px;
        border-radius: 7px;
        // background: #17c5a5;
      }

      .legendText{
        display: flex;
        flex:2;
        height: 30px;
        color:aliceblue;
        align-items: center;
        justify-content: center;
        line-height: 30px;
      }
    }
  }

}

.foldState{
    position: absolute;
    width:fit-content;
    left:0px;
    bottom:0px;
    height: 40px;
    color: aliceblue;
    font-size: 18px;
    line-height: 40px;
    background-color: rgba(38,40,41,0.9);
    padding:0px 15px;
    border-radius: 10px;
    border: 1px solid rgba(38,40,41,0.9);
}

.foldState:hover{
    border: 1px solid aliceblue;
    cursor: pointer;
}
</style>