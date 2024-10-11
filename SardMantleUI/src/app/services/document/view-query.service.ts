import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { DataPointSearchCriteria } from 'src/app/models/pages/view';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewQueryService {
  public query(data: DataPointSearchCriteria) {
    return this.http.post<any>(environment.baseUrl + '/Library/DataPointQuery/Get', data).pipe(map(result => {
      result.results.forEach((d: any) => {
        d.parameters?.forEach((p: any) => {
          if (p.typeParameterTypeValue == 'bit') {
            p.value = (p.value != undefined) ? (p.value.toLowerCase() == "true") : (undefined)
          }
        });
      });
      return result;
    }));
  }

  public getValueKeyFromTypeValue(typeValue: string) {
    switch (typeValue) {
      case 'int':
        return "intValueString";
      case 'dub':
        return "doubleValue";
      case 'str':
        return "stringValue";
      case 'sum':
        return "summaryValue";
      case 'doc':
        return "documentValue";
      case 'dat':
        return "dataPointValueId";
      case 'bit':
        return "boolValue";
      case 'uni':
        return "unitValue";
      case 'tim':
        return "timeValue";
      default:
        return "stringValue";
    }
  }

  public convertValue(value: string, typeValue: string) {
    switch (typeValue) {
      case 'int':
        return value;
      case 'dub':
        return Number(value);
      case 'str':
        return value;
      case 'sum':
        return value;
      case 'doc':
        return value;
      case 'dat':
        return Number(value);
      case 'bit':
        return Boolean(value);
      case 'uni':
        return Number(value);
      case 'tim':
        return value;
      default:
        return "stringValue";
    }
  }

  public queryDocumentToRealDocument(qdp: QueriedDataPoint) {
    let parameters = qdp?.parameters.map(p => {
      let newParam = { dataPointId: qdp.id, dataPointTypeParameterId: p.typeParameterId } as any
      newParam[this.getValueKeyFromTypeValue(p.typeParameterTypeValue)] = this.convertValue(p.value, p.typeParameterTypeValue);
      if (!(newParam[this.getValueKeyFromTypeValue(p.typeParameterTypeValue)])) {
        newParam[this.getValueKeyFromTypeValue(p.typeParameterTypeValue)] = undefined;
      }
      return newParam;
    }) ?? [];

    return {
      id: qdp.id,
      name: qdp.name,
      typeId: qdp.typeId,
      parameters: parameters
    }
  }

  /*public put(data: any) {
    return this.http.put(environment.baseUrl + '/Library/DataPointQuery/Put', data);
  }*/

  constructor(private http: HttpClient) { }
}
