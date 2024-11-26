import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { QueriedDataPoint } from 'src/app/models/document/document-query-result';
import { Document } from 'src/app/models/document/document-types/document';

@Injectable({
  providedIn: 'root'
})
export class ViewCommunicationService {
  public selected$ = new Subject<QueriedDataPoint | undefined>();

  public select(obj?: QueriedDataPoint) {
    this.selected$.next(obj);
  }
  constructor() { }
}
