export function init_map(MAP,center,zoom,pitch = 0){
   MAP.setCenter(center);
   MAP.setZoom(zoom);
   MAP.setPitch(pitch);
}