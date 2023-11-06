import { Component, Output, Input, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocationType } from 'src/app/models/map/location-data-types/location-data-types';
import { PagedQuery } from 'src/app/models/shared/paged-query';
import { ImageService } from 'src/app/services/image/image.service';
import { MapService } from 'src/app/services/map/map.service';
import { EditLocationTypeComponent } from './edit-location-type/edit-location-type.component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-location-type',
  templateUrl: './location-type.component.html',
  styleUrls: ['./location-type.component.scss']
})
export class LocationTypeComponent implements OnInit  {
  @Output() filter = new EventEmitter();
  public locationTypes: LocationType[];
  public locationTypesSelectedCount: number;
  public someSelected: boolean = false;
  public allSelected: boolean = true;
  public locationTypesFiltered: LocationType[];
  public locationTypeQuery = { pageNumber: 0, pageSize: 7, query: '' };
  public length: number = 0;
  public pageSizeOptions = [5, 7, 10, 20];

  public onPageChange(event: any) {
    this.locationTypeQuery.pageNumber = event.pageIndex;
    this.locationTypeQuery.pageSize = event.pageSize;
    this.load();
  }

  public onSearch(event: any) {
    this.locationTypeQuery.query = event;
    this.load();
  }

  public select(selected: any) {
    selected.selected = !selected.selected;
    this.filter.emit();
    this.calculateSelectionCount();
  }

  public reset() {
    this.mapService.getLocationTypes({}).subscribe(data => {
      this.locationTypes = data;
      this.locationTypes.forEach(t => {
        t.selected = true;
      })
      this.length = this.locationTypes.length;
      this.filter.emit();
      this.load();
    });
  }

  public load() {
    this.locationTypesFiltered = this.locationTypes.filter(lt => 
      lt.name.toLocaleLowerCase().includes(this.locationTypeQuery.query.toLocaleLowerCase())
    )
    this.length = this.locationTypesFiltered.length;

    this.cdref.detectChanges();

    this.locationTypesFiltered = this.locationTypesFiltered.slice(
      this.locationTypeQuery.pageNumber * this.locationTypeQuery.pageSize, 
      (this.locationTypeQuery.pageNumber +1 ) * this.locationTypeQuery.pageSize);
    
    this.calculateSelectionCount();
  }

  public setAllSelected(selected: boolean) {
    this.locationTypes.forEach(lt => lt.selected = selected);
    this.calculateSelectionCount();
  }

  public calculateSelectionCount() {
    this.locationTypesSelectedCount = this.locationTypes.filter(lt => lt.selected).length;
    this.allSelected = this.locationTypesSelectedCount == this.locationTypes.length;
    this.someSelected = !this.allSelected && this.locationTypesSelectedCount != 0
  }

  public addLocationType() {
    const dialogRef = this.dialog.open(EditLocationTypeComponent, {
      width: '525px',
      data: { adding: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reset();
      }
    });
  }

  public editLocationType(locationType: LocationType) {
    const dialogRef = this.dialog.open(EditLocationTypeComponent, {
      width: '525px',
      data: { adding: false, locationType: locationType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reset();
      }
    });
  }

  constructor(public mapService: MapService, private imageService: ImageService, private dialog: MatDialog, private cdref: ChangeDetectorRef, public loginService: LoginService) {

  }

  ngOnInit(): void {
    this.reset();
  }
}
