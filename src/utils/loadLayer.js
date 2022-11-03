export function add_wms(MAP, layer, opacity = 1) {
  MAP.addSource(layer, {
    type: "raster",
    tiles: [
      'http://8.134.70.156:8181/geoserver/gpzi/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES&LAYERS=gpzi:' + layer + '&exceptions=application/vnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=769&HEIGHT=750&BBOX={bbox-epsg-3857}',
    ],
    tileSize: 512,
  })
  MAP.addLayer({
    id: layer,
    type: "raster",
    source: layer,
    paint: {
      "raster-opacity": opacity,
    },
  })
}

export function add_tms(MAP, layer, type,paint) {
  MAP.addSource(layer, {
    type: "vector",
    scheme: "tms",
    tiles: [
      'http://8.134.70.156:8181/geoserver/gwc/service/tms/1.0.0/gpzi%3A'+layer+'@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
    ],
    tileSize: 512,
  })
  MAP.addLayer({
    id: layer,
    type: type,
    source: layer,
    "source-layer": layer,
    paint:paint,
  })
}

export function addgeojson_S(MAP,source,datalist){
  MAP.addSource(
    source,{
      type: "geojson",
      data:datalist,
    }
  )
}

export function addgeojson_L(MAP,layer,source,{filter,paint}){
  MAP.addLayer({
    id:layer,
    source:source,
    type:'line',
    filter:filter,
    paint:paint,
  })
}

