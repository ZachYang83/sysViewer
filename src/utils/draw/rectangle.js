import * as turf from "@turf/turf";

export function rectangleEvt(callback, MAP, e) {
    MAP.getCanvas().style.cursor = 'crosshair';
    clearLayerAndSource(MAP);
    var isDraw = true;
    // 禁止双击缩放
    MAP.doubleClickZoom.disable();
    var jsonPoint = {
        'type': 'FeatureCollection',
        'features': []
    };
    jsonPoint.features = [];
    var source = MAP.getSource('rectangle');
    if (source) {
        // MAP.getSource('rectangle').setData(jsonPoint);
    } else {
        MAP.addSource('rectangle', {
            type: 'geojson',
            data: jsonPoint
        });
        MAP.addLayer({
            "id": "rectangle",
            "type": "fill",
            "source": "rectangle",
            "layout": {},
            "paint": {
                "fill-color": "#e6205e",
                "fill-opacity": 0.3
            }
        });
    }
    var starCoords = [];
    let isMousemove = false;
    MAP.on('click', click);
    function click(_e) {
        if (isDraw) {
            starCoords = [_e.lngLat.lng, _e.lngLat.lat];
            isMousemove = true;
        }
    }

    var moveCoords = [];
    MAP.on('mousemove', mousemove);
    function mousemove(_e) {
        if (isDraw && isMousemove) {
            moveCoords = [_e.lngLat.lng, _e.lngLat.lat];
            var rightTopCoords = [];
            rightTopCoords = [moveCoords[0], starCoords[1]];
            var buttomLeftCoords = [];
            buttomLeftCoords = [starCoords[0], moveCoords[1]];
            var coords = [];
            coords = [starCoords, rightTopCoords, moveCoords, buttomLeftCoords]
            jsonPoint.features = [];
            jsonPoint.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [coords]
                }
            });
            MAP.getSource('rectangle').setData(jsonPoint);
        }
    }

    MAP.on('dblclick',dblclick)
    function dblclick(_e) {
        if (isDraw) {
            isMousemove = false;
            isDraw = false;
            MAP.getCanvas().style.cursor = 'grab'
            var endCoords = [_e.lngLat.lng, _e.lngLat.lat];
            var rightTopCoords = [];
            rightTopCoords = [endCoords[0], starCoords[1]];
            var buttomLeftCoords = [];
            buttomLeftCoords = [starCoords[0], endCoords[1]];
            var coords = [];
            coords = [starCoords, rightTopCoords, endCoords, buttomLeftCoords]
            jsonPoint.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: coords
                }
            });
            MAP.getSource('rectangle').setData(jsonPoint);
        }
        callback();
        MAP.off('click', click);
    MAP.off('mousemove', mousemove);
    MAP.off('dblclick', dblclick);
    };
};

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
