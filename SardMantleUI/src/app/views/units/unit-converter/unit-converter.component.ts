import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, forkJoin, takeUntil } from 'rxjs';
import { Unit } from 'src/app/models/units/unit';
import { UnitsService } from 'src/app/services/units/units.service';

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.scss']
})
export class UnitConverterComponent implements OnInit, OnDestroy {
  public to = new BehaviorSubject<Unit | undefined>(undefined);
  public from = new BehaviorSubject<Unit | undefined>(undefined);
  public units: Unit[] | undefined;
  public compatibleUnits: Unit[] | undefined;
  public conversionInput = new BehaviorSubject<number | undefined>(0);
  public conversionResult: string;

  private unsubscribe$ = new Subject();

  public convert() {
    if (this.to.value == undefined || this.from.value == undefined || this.conversionInput == undefined) {
      this.conversionResult = "";
    }
    else if (!this.from.value.amountPerParent || !this.to.value.amountPerParent) {
      this.conversionResult = "0"
    }
    else {
      this.conversionResult = ((this.conversionInput.value ?? 0) * this.from.value.amountPerParent / this.to.value.amountPerParent).toString()
    }
  }

  public filterUnits() {
    if (this.from.value?.measurableId != this.to.value?.measurableId) {
      this.compatibleUnits = this.units?.filter(u => u.measurableId == this.from.value?.measurableId)
      this.to.next(undefined);
    }
    else {
      this.to.next(this.to.value);
    }
  }

  public loadUnits() {
    this.unitService.get({}).subscribe(result => this.units = result);
  }

  constructor(private unitService: UnitsService) {}

  ngOnInit(): void {
    this.loadUnits();

    this.from.pipe(takeUntil(this.unsubscribe$)).subscribe(from => {
      this.filterUnits();
    });

    combineLatest(this.to, this.conversionInput).pipe(takeUntil(this.unsubscribe$)).subscribe((values: any) => {
      this.convert();
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next("");
    this.unsubscribe$.complete();
  }
}
