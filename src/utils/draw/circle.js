import * as turf from "@turf/turf";

export function circleEvt(callback, MAP, e) {
    MAP.getCanvas().style.cursor = "crosshair";
    // e.stopPropagation();
    clearLayerAndSource(MAP);
    var isDraws = true;
    // 禁止双击缩放
    MAP.doubleClickZoom.disable();
    var radius = 0;
    var jsonCircle = {
        type: "FeatureCollection",
        features: [],
    };
    let _pixelRadius = 0;
    var source = MAP.getSource("circle");
    if (source) {
        //MAP.getSource('circle').setData(jsonCircle);
    } else {
        MAP.addSource("circle", {
            type: "geojson",
            data: jsonCircle,
        });
        MAP.addLayer({
            id: "circle",
            type: "fill",
            source: "circle",
            layout: {},
            paint: {
                "fill-color": "#e6205e",
                "fill-opacity": 0.3,
                //"circle-radius": {
                //    stops: [
                //    [0, 0],
                //    [20, _pixelRadius]],
                //    base: 2
                //   },
                //  "circle-opacity": 0.5,
                // "circle-stroke-width": 1,
                // "circle-color": "#00f",
                // "circle-pitch-alignment": "MAP"
            },
        });
    }
    var points = [];
    var starCoords = [];
    let isMousemove = false;
    let isFilst = true;
    let filstCoords = [];
    MAP.on("click", click);
    function click(_e) {
        if (isDraws) {
            starCoords = [];
            starCoords.push(_e.lngLat.lat);
            starCoords.unshift(_e.lngLat.lng);
            if (isFilst) {
                filstCoords = starCoords;
                isFilst = false;
            }
            points.push(starCoords);
            MAP.getSource("circle").setData(
                createGeoJSONCircle(starCoords, 0)
            );
            isMousemove = true;
            isDraws = true;
        }
    };
    var moveCoords = [];
    MAP.on("mousemove", mousemove);
    function mousemove(_e) {
        if (isDraws && isMousemove) {
            isDraws = true;
            var centerCoords = [];

            moveCoords = [_e.lngLat.lng, _e.lngLat.lat];
            if (filstCoords.length != 0) {
                centerCoords = [
                    (parseFloat(filstCoords[0]) + parseFloat(moveCoords[0])) / 2,
                    (parseFloat(filstCoords[1]) + parseFloat(moveCoords[1])) / 2,
                ];
                var _points = [];
                _points.push(moveCoords);
                _points.unshift(filstCoords);
                //points.concat([moveCoords]);
                var line = turf.lineString(_points);
                var len = turf.length(line);
                if (len < 1) {
                    _pixelRadius = len;
                    //m
                    // len = Math.round(len * 1000);
                    //  MAP.getSource('circle').setData(createGeoJSONCircle(filstCoords, len));
                } else {
                    //km
                    len = len.toFixed(2);
                    _pixelRadius = len;
                    MAP.getSource("circle").setData(
                        createGeoJSONCircle(filstCoords, len)
                    );
                }
            }
        }
    }
    MAP.on("dblclick", dblclick);
    function dblclick(_e) {
        if (isDraws) {
            MAP.getCanvas().style.cursor = "grab";
            jsonCircle = {
                type: "FeatureCollection",
                features: [],
            };
            //MAP.getSource('circle').setData(jsonCircle);
            isMousemove = false;
            isDraws = false;
            MAP.getCanvas().style.cursor = "";
            var endCoords = [_e.lngLat.lng, _e.lngLat.lat];
            if (filstCoords.length != 0) {
                //var _points = points.concat([endCoords]);
                var _points = [];
                _points.push(moveCoords);
                _points.unshift(filstCoords);
                var line = turf.lineString(_points);
                var len = turf.length(line);
                if (len < 1) {
                    _pixelRadius = len;
                    // len = Math.round(len * 1000);
                    // MAP.getSource('circle').setData(createGeoJSONCircle(filstCoords, len));
                } else {
                    len = len.toFixed(2);
                    _pixelRadius = len;
                    MAP.getSource("circle").setData(
                        createGeoJSONCircle(filstCoords, len)
                    );
                }
            }
        };
        callback();
        MAP.off('click', click);
        MAP.off('mousemove', mousemove);
        MAP.off('dblclick', dblclick);
    }

};
function createGeoJSONCircle(center, radiusInKm, points) {
    if (!points) points = 64;
    var coords = {
        latitude: center[1],
        longitude: center[0],
    };
    var km = radiusInKm;
    var ret = [];
    var distanceX =
        km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    var distanceY = km / 110.574;

    var theta, x, y;
    for (var i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);
    return {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [ret],
        },
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