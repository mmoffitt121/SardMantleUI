import * as L from 'leaflet';

export class DataMarker<P = any> extends L.Marker {
    constructor(latlng: L.LatLngExpression, options?: L.CircleMarkerOptions, id?: number){
        super(latlng, options);
    }
    public id: number | undefined;
    public dataType: number | undefined;
}

export function dataMarker(latlng: L.LatLngExpression, options?: L.MarkerOptions, id?: number): DataMarker
{
    var marker = L.marker(latlng, options);
    var dataMarker = marker as DataMarker;
    dataMarker.id = id;
    return dataMarker;
}