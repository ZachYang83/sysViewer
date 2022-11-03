
import deepEqual from 'deep-equal'
import axios from "axios";

/**
 * 切换地图样式 [保留命中sourcesList、layersList的数据]
 */
 interface ISwitchMapStyleParams {
  map: mapboxgl.Map; // 地图实例
  style: string | mapboxgl.Style; // 地图样式，支持外部解析完导入 和 mapbox自带地图
  layersList: string[]; // ["mapbox-gl-draw-", "ml-"]; // key 对应对比的位置 sources{[key]: obj}
  sourcesList: string[]; // ["gl-draw-", "ml-layerInfo-"]; // key 对应对比的位置 layers[{id: [key]}]
}

export async function switchMapStyle({
  map,
  style,
  sourcesList,
  layersList,
}: ISwitchMapStyleParams) {
  let newStyle;
  if (typeof style !== "string") {
    newStyle = style;
  } else {
    const res = await axios.get(
      `https://api.mapbox.com/styles/v1/${style}?access_token=pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ`
    );
    newStyle = res.data;
  }
  const currentStyle = map.getStyle();
  const currentSources = Object.keys(currentStyle.sources).reduce(
    (obj, key) => {
      for (let i = 0; i < sourcesList.length; i++) {
        const sourcesKey = sourcesList[i];
        if (key.startsWith(sourcesKey)) {
          // if (true) {
          obj[key] = currentStyle.sources[key];
          break;
        }
      }
      return obj;
    },
    {}
  );
  // console.log("过滤出来 要保留的source ", currentSources);
  newStyle.sources = { ...newStyle.sources, ...currentSources };
  // console.log("合并完成的 newStyle.sources", newStyle.sources);
  const currentLayer = currentStyle.layers.filter((e) => {
    for (let i = 0; i < layersList.length; i++) {
      const layersKey = layersList[i];
      if (e.id.startsWith(layersKey)) {
        // if (true) {
        return true;
      }
    }
    return false;
  });
  // console.log("过滤出来 要保留的 layer ", currentLayer);
  newStyle.layers = [...newStyle.layers, ...currentLayer];
  // console.log("合并完成的 newStyle.layers", newStyle.layers);
  // console.log("======>  newStyle", newStyle);
  map.setStyle(newStyle);
}

// styleID should be in the form "mapbox/satellite-v9"
export async function switchBaseMap(map, styleID) {
  const response = await fetch(
    `https://api.mapbox.com/styles/v1/${styleID}?access_token=pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ`
  );
  const responseJson = await response.json();
  const newStyle = responseJson;

  const currentStyle = map.getStyle();
  // ensure any sources from the current style are copied across to the new style
  newStyle.sources = Object.assign(
    {},
    currentStyle.sources,
    newStyle.sources
  );

  // find the index of where to insert our layers to retain in the new style
  let labelIndex = newStyle.layers.findIndex((el) => {
    return el.id == "waterway-label";
  });

  // default to on top
  if (labelIndex === -1) {
    labelIndex = newStyle.layers.length;
  }
  const appLayers = currentStyle.layers.filter((el) => {
    // app layers are the layers to retain, and these are any layers which have a different source set
    return (
      el.source &&
      el.source != "mapbox://mapbox.satellite" &&
      el.source != "mapbox" &&
      el.source != "composite"
    );
  });
  newStyle.layers = [
    ...newStyle.layers.slice(0, labelIndex),
    ...appLayers,
    ...newStyle.layers.slice(labelIndex, -1),
  ];
  map.setStyle(newStyle);
}
