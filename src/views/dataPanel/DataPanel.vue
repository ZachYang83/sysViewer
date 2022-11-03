<template>
  <div id="dataPanel" ref="dataPanel">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <!-- 第一行 -->
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <span class="title-text">食药环智能情报大数据应用平台</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="decorationColor"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
              <span class="text">数据分析</span>
            </div>
            <div class="react-left bg-color-blue ml-3">
              <span class="text"></span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b"></span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text"
                >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span
              >
            </div>
          </div>
        </div>

        <!-- 第三行 -->
        <div class="content-box">
          <div class="box-left">
            <div>
              <dv-border-box-13>
                <div style="height: 460px"></div>
              </dv-border-box-13>
              <dv-border-box-12>
                <div style="height: 460px"></div>
              </dv-border-box-12>
            </div>
          </div>
          <div class="box-center">
            <div>
              <dv-border-box-10 >
                <div style="height: 920px;padding:5px">
                  <panelMap/>
                </div>
              </dv-border-box-10>
            </div>
          </div>
          <div class="box-right">
            <div>
              <dv-border-box-13>
                <div style="height: 460px"></div>
              </dv-border-box-13>
              <dv-border-box-12>
                <div style="height: 460px"></div>
              </dv-border-box-12>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/utils/drawMixin"; 
import { formatTime } from "@/utils/time.js";
import panelMap from "./Map";

export default {
  mixins: [ drawMixin ],
  data() {
    return {
      loading: true,
      decorationColor: ["#568aea", "#000000"],
      timing: null,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    };
  },
  components:{
    panelMap,
  },
  mounted() {
    this.cancelLoading();
    this.timeFn();
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
};
</script>

<style lang="scss" scoped>
#dataPanel {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
  overflow: hidden;
  color: #d3d6dd;

  .bg {
    width: 100%;
    height: 100%;
    padding: 16px 16px 0px 16px;
    background-image: url("./png/pageBg.png");
    background-size: cover;
    background-position: center center;
  }

  .host-body {
    height: 100%;

    .dv-dec-10,
    .dv-dec-10-s {
      width: 20%;
      height: 5px;
    }
    .dv-dec-10-s {
      transform: rotateY(180deg);
    }
    .dv-dec-8 {
      width: 200px;
      height: 50px;
    }
    .title {
      position: relative;
      width: 730px;
      text-align: center;
      background-size: cover;
      background-repeat: no-repeat;

      .title-text {
        font-size: 26px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        color: aliceblue;
      }

      .dv-dec-6 {
        position: absolute;
        bottom: -30px;
        left: 50%;
        width: 250px;
        height: 8px;
        transform: translate(-50%);
      }
    }

    // 第二行
    .aside-width {
      width: 40%;
    }
    .react-r-s,
    .react-l-s {
      background-color: #0f1325;
    }

    // 平行四边形
    .react-right {
      &.react-l-s {
        text-align: right;
        width: 500px;
      }
      font-size: 18px;
      width: 300px;
      line-height: 50px;
      text-align: center;
      transform: skewX(-45deg);

      .react-after {
        position: absolute;
        right: -25px;
        top: 0;
        height: 50px;
        width: 50px;
        background-color: #0f1325;
        transform: skewX(45deg);
      }

      .text {
        display: inline-block;
        transform: skewX(45deg);
      }
    }

    .react-left {
      &.react-l-s {
        width: 500px;
        text-align: left;
      }
      font-size: 18px;
      width: 300px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      transform: skewX(45deg);
      //   background-color: #0f1325;

      .react-left {
        position: absolute;
        left: -25px;
        top: 0;
        height: 50px;
        width: 50px;
        background-color: #0f1325;
        transform: skewX(-45deg);
      }

      .text {
        display: inline-block;
        transform: skewX(-45deg);
      }
    }

    .content-box {
      display: flex;
      width: 100%;
      height: calc(100% - 100px);
      padding-top: 20px;
      .box-left {
        flex: 1.5;
        height: 100%;
        // background-color: #af7ac4;
      }

      .box-center {
        flex: 5;
        height: 100%;
        // background-color: #48c9b0;
      }

      .box-right {
        flex: 1.5;
        height: 100%;
        // background-color: #f39c13;
      }
    }
  }
}
</style>