import * as L from 'leaflet';

export class DataMarker<P = any> extends L.CircleMarker {
    constructor(latlng: L.LatLngExpression, options?: L.CircleMarkerOptions, id?: number){
        super(latlng, options);
    }
    public id: number | undefined;
    public dataType: number | undefined;
}

export function dataMarker(latlng: L.LatLngExpression, options?: L.CircleMarkerOptions, id?: number, dataType?: number): DataMarker
{
    var marker = L.circleMarker(latlng, options);
    var dataMarker = marker as DataMarker;
    dataMarker.id = id;
    dataMarker.dataType = dataType;
    return dataMarker;
}