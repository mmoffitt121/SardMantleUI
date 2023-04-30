import * as L from 'leaflet';

export class DataMarker<P = any> extends L.CircleMarker {
    constructor(latlng: L.LatLngExpression, options?: L.CircleMarkerOptions, id?: number){
        super(latlng, options);
    }
    public id: number | undefined;
}

export function dataMarker(latlng: L.LatLngExpression, options?: L.CircleMarkerOptions, id?: number): DataMarker
{
    var marker = L.circleMarker(latlng, options);
    var dataMarker = marker as DataMarker;
    dataMarker.id = id;
    return dataMarker;
}