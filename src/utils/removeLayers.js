export function removeLayers(MAP, layers) {
    layers.forEach(layer => {
        if (MAP.getLayer(layer)) {
            MAP.removeLayer(layer);
        }
        if (MAP.getSource(layer)) {
            MAP.removeSource(layer);
        }
    });
}

export function removeLayers2(MAP, layers) {
    layers.forEach(layer => {
        if (MAP.getLayer(layer)) {
            MAP.removeLayer(layer);
        }
    });
}