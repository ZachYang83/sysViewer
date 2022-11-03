import * as turf from "@turf/turf";

export function polygonEvt(callback, MAP, e) {
    MAP.getCanvas().style.cursor = 'crosshair';
    // e.stopPropagation();
    clearLayerAndSource(MAP);
    var isMeasure = true;
    // 禁止双击缩放
    MAP.doubleClickZoom.disable();
    var jsonPoint = {
        'type': 'FeatureCollection',
        'features': []
    };
    var jsonLine = {
        'type': 'FeatureCollection',
        'features': []
    };
    var points = [];
    var source = MAP.getSource('points-area');
    if (source) {
        MAP.getSource('points-area').setData(jsonPoint);
        MAP.getSource('line-area').setData(jsonLine);
    } else {
        MAP.addSource('points-area', {
            type: 'geojson',
            data: jsonPoint
        });
        MAP.addSource('line-area', {
            type: 'geojson',
            data: jsonLine
        });
        MAP.addLayer({
            id: 'line-area',
            type: 'fill',
            source: 'line-area',
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.05
            }
        });
        MAP.addLayer({
            id: 'line-area-stroke',
            type: 'line',
            source: 'line-area',
            paint: {
                'line-color': '#ff0000',
                'line-width': 4,
                'line-opacity': 0.7
            }
        });
        MAP.addLayer({
            id: 'points-area',
            type: 'circle',
            source: 'points-area',
            paint: {
                'circle-color': '#ffffff',
                'circle-radius': 3,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ff0000'
            }
        });
    }
    function addPoint(coords) {
        jsonPoint.features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: coords
            }
        });
        MAP.getSource('points-area').setData(jsonPoint);
    }

    MAP.on('click', click);
    function click(_e) {
        if (isMeasure) {
            var coords = [_e.lngLat.lng, _e.lngLat.lat];
            points.push(coords);
            addPoint(coords);
        }
    }

    MAP.on('dblclick', dblclick);
    function dblclick(_e) {
        if (isMeasure) {
            var coords = [_e.lngLat.lng, _e.lngLat.lat];
            points.push(coords);
            isMeasure = false;
            MAP.getCanvas().style.cursor = 'grab'
        }
        callback();
        MAP.off('click', click);
        MAP.off('mousemove', mousemove);
        MAP.off('dblclick', dblclick);
    }

    MAP.on('mousemove', mousemove);
    function mousemove(_e) {
        if (isMeasure) {
            var coords = [_e.lngLat.lng, _e.lngLat.lat];
            var len = jsonPoint.features.length;
            if (len != 0 && len != 1) {
                var pts = points.concat([coords]);
                pts = pts.concat([points[0]]);
                var json = {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [pts]
                    }
                };
                MAP.getSource('line-area').setData(json);
            }
        }
    }
}

function clearLayerAndSource(MAP) {
    if (MAP.getLayer("circle")) {
        MAP.removeLayer("circle");
    }
    if (MAP.getSource("circle")) {
        MAP.removeSource("circle");
    }
    if (MAP.getLayer("points")) {
        MAP.removeLayer("points");
    }
    if (MAP.getSource("points")) {
        MAP.removeSource("points");
    }
    if (MAP.getLayer("line")) {
        MAP.removeLayer("line");
    }
    if (MAP.getSource("line")) {
        MAP.removeSource("line");
    }
    if (MAP.getLayer("polygon")) {
        MAP.removeLayer("polygon");
    }
    if (MAP.getSource("polygon")) {
        MAP.removeSource("polygon");
    }
    if (MAP.getLayer("rectangle")) {
        MAP.removeLayer("rectangle");
    }
    if (MAP.getSource("rectangle")) {
        MAP.removeSource("rectangle");
    }
    if (MAP.getLayer("line-move")) {
        MAP.removeLayer("line-move");
    }
    if (MAP.getSource("line-move")) {
        MAP.removeSource("line-move");
    }
    if (MAP.getLayer("points-area")) {
        MAP.removeLayer("points-area");
    }
    if (MAP.getSource("points-area")) {
        MAP.removeSource("points-area");
    }
    if (MAP.getLayer("line-area-stroke")) {
        MAP.removeLayer("line-area-stroke");
    }
    if (MAP.getSource("line-area-stroke")) {
        MAP.removeSource("line-area-stroke");
    }
    if (MAP.getLayer("line-area")) {
        MAP.removeLayer("line-area");
    }
    if (MAP.getSource("line-area")) {
        MAP.removeSource("line-area");
    }
};
