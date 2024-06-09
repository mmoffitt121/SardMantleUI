import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-destroyable',
  templateUrl: './destroyable.component.html',
  styleUrls: ['./destroyable.component.scss']
})
export class DestroyableComponent implements OnDestroy {
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
