<template>
  <div id="timeline">
    <div ref="timeline-table" class="timeline-table"></div>
  </div>
</template>
<script>
import Timeline from "utils/timeline";
export default {
  name: "Timeline",
  data() {
    return {};
  },
  mounted: function () {
	let _this = this;
    let node = this.$refs["timeline-table"];
    let self = this;
    let dataJson = {
      timeline: {
        data: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
        ],
        label: {
          formatter: function (s) {
            return s;
          },
        },
      },
    };
    let limitPage = [1, 20];
    let curPage = 10;
    let callback = {
      callback: (timeline, param) => {
        let index = param.currentIndex;
        console.log("curPage:" + curPage + ",curIndex:" + index);
		_this.changeData(index);
      },
      last: (timeline, param) => {
        let index = param.currentIndex;
        if (curPage > limitPage[0]) {
          curPage -= 1;
          dataJson.timeline.data = self.getDataJson(start, len, -1);
          let maxIndex = dataJson.timeline.data.length - 1;
          dataJson.timeline.currentIndex = maxIndex;
          timeline.update(dataJson);

          start -= len;
        }
        console.log("-curPage:" + curPage + ",curIndex:" + index);
      },
      next: (timeline, param) => {
        let index = param.currentIndex;
        if (curPage < limitPage[1]) {
          curPage += 1;
          dataJson.timeline.data = self.getDataJson(start, len, 1);
          dataJson.timeline.currentIndex = 0;
          timeline.update(dataJson);

          start += len;
        }
        console.log("+curPage:" + curPage + ",curIndex:" + index);
      },
    };

    Timeline.makeTimeline(node, dataJson, callback);
  },
  methods:{
	  changeData(index){
		  console.log("子组件");
		  this.$emit("changeData",index)
	  }
  }
};
</script>
<style scoped>
.timeline-table {
  text-align: center;
  width: 70px;
  height: 750px;
  /* background: #fff; */
}
</style>