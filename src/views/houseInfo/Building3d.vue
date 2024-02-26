<template>
  <div class="cityName">
    <el-select v-model="value" placeholder="请选择" @change="addCity">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
const geoCoord = {
  guangzhou: [113.330297, 22.921482],
  shenzhen: [114.03534, 22.617941],
  zhuhai: [113.502394, 22.260375],
  dongguan: [113.76283, 22.997459],
  foshan: [113.133873, 23.018216],
  zhongshan: [113.39819, 22.516017],
  jiangmen: [112.796395, 22.279389],
  huizhou: [112.796395, 22.279389],
  zhaoqing: [112.46921, 23.073592],
  qingyuan: [113.076321, 23.719947],
  shantou: [116.507417, 23.317543],
  chaozhou: [116.857671, 23.569019],
  jieyang: [116.383235, 23.574292],
  shanwei: [115.471419, 22.905915],
  shaoguan: [113.592595, 24.813626],
  heyuan: [113.592595, 24.813626],
  meizhou: [116.129122, 24.30513],
  yunfu: [112.044922, 22.932544],
  yangjiang: [111.974208, 21.876701],
  maoming: [110.933036, 21.658655],
  zhanjiang: [110.376518, 21.266842],
};
export default {
  data() {
    return {
      options: [
        { label: "广州市", value: "guangzhou2" },
        { label: "深圳市", value: "shenzhen" },
        { label: "珠海市", value: "zhuhai" },
        { label: "东莞市", value: "dongguan" },
        { label: "佛山市", value: "foshan" },
        { label: "中山市", value: "zhongshan" },
        { label: "江门市", value: "jiangmen" },
        { label: "惠州市", value: "huizhou" },
        { label: "肇庆市", value: "zhaoqing" },
        { label: "清远市", value: "qingyuan" },
        { label: "汕头市", value: "shantou" },
        { label: "潮州市", value: "chaozhou" },
        { label: "揭阳市", value: "jieyang" },
        { label: "汕尾市", value: "shanwei" },
        { label: "韶关市", value: "shaoguan" },
        { label: "河源市", value: "heyuan" },
        { label: "梅州市", value: "meizhou" },
        { label: "云浮市", value: "yunfu" },
        { label: "阳江市", value: "yangjiang" },
        { label: "茂名市", value: "maoming" },
        { label: "湛江市", value: "zhanjiang" },
      ],
      value: "",
      mode: null,
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      let _this = this;
      window.MAP.getCanvas().style.cursor = "pointer";
      window.MAP.on("click", _this.getLngLat);
    },
    getLngLat(e) {
      let _this = this;
      var lngLat = e.lngLat;
      console.log(lngLat);
      var lng = lngLat.lng;
      var lat = lngLat.lat;
      _this.addTimeCircle(lng, lat);
    },
    addCity(e) {
      if (window.MAP.getLayer("cityId")) {
        window.MAP.removeLayer("cityId");
      }
      if (window.MAP.getSource("citySource")) {
        window.MAP.removeSource("citySource");
      }
      var url =
        "http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3A" +
        e +
        "_building@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf";
      var layer = e + "_building";
      console.log("yesss");
      var citySource = {
        type: "vector",
        scheme: "tms",
        tiles: [url],
        maxzoom: 22,
      };
      var cityLayer = {
        id: "cityId",
        source: "citySource",
        "source-layer": layer,
        type: "fill-extrusion",
        paint: {
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["get", "height"], //height字段是数据里面的高度字段名，注意改
            0,
            "#3388BA",
            30,
            "#7EB4BC",
            60,
            "#C9E0BE", //0，10，20是指高度，后面的是这个对应的颜色
            90,
            "#FFFDBE", //0，10，20是指高度，后面的是这个对应的颜色
            120,
            "#F3B98D", //0，10，20是指高度，后面的是这个对应的颜色
            150,
            "#E35E4D", //0，10，20是指高度，后面的是这个对应的颜色
            180,
            "#D81D1F", //0，10，20是指高度，后面的是这个对应的颜色
          ],
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-opacity": 0.8, //透明度不必解释了
        },
      };
      window.MAP.addSource("citySource", citySource);
      window.MAP.addLayer(cityLayer);
      window.MAP.flyTo({
        center: geoCoord[e],
        zoom: 9,
        pitch: 0,
        bearing: 0,
      });
    },
  },
  destroyed() {
    if (window.MAP.getLayer("cityId")) {
      window.MAP.removeLayer("cityId");
    }
    if (window.MAP.getSource("citySource")) {
      window.MAP.removeSource("citySource");
    }
  },
};
</script>
    
<style lang='scss' scoped>
.cityName {
  position: absolute;
  top: 30px;
  left: 10px;
  height: 40px;
  width: 100px;
  z-index: 9999;
}
</style>