import { Injectable } from '@angular/core';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';

@Injectable({
  providedIn: 'root'
})
export class DocumentIOService {
  public export(dp: QueriedDataPoint) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dp)));

    element.setAttribute('download', dp.name + " (" + dp.typeName + ")");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  constructor() { }
}
