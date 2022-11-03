export function deleteEvt(MAP) {
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