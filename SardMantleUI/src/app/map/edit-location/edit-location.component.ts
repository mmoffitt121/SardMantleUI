import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Area, Subregion, Region, Subcontinent, Continent, CelestialObject } from "../models/location-data-types/area-data-types";
import { LocationType, Location } from '../models/location-data-types/location-data-types';
import { FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange, MatSelect } from '@angular/material';
import { MapService } from '../services/map-services/map.service';
import { MapErrorService } from '../services/map-services/map-error.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
  providers: [ MapService ]
})
export class EditLocationComponent implements OnInit {
  public selectedMapObject: any;
  public dataType: number;
  public editing: boolean;

  mapDataTypeControl = new FormControl('', []);
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  locationTypeControl = new FormControl('', []);

  public markerLat: number;
  public markerLng: number;

  public selectedArea: number = -1;
  public selectedSubregion: number = -1;
  public selectedRegion: number = -1;
  public selectedSubcontinent: number = -1;
  public selectedContinent: number = -1;
  public selectedCelestialObject: number = -1;

  public locationTypes: LocationType[] = [];
  public areas: Area[];
  public subregions: Subregion[];
  public regions: Region[];
  public subcontinents: Subcontinent[];
  public continents: Continent[];
  public celestialObjects: CelestialObject[];

  public filteredAreas: Area[];
  public filteredSubregions: Subregion[];
  public filteredRegions: Region[];
  public filteredSubcontinents: Subcontinent[];
  public filteredContinents: Continent[];
  public filteredCelestialObjects: CelestialObject[];

  areaControl = new FormControl('', []);
  subregionControl = new FormControl('', []);
  regionControl = new FormControl('', []);
  subcontinentControl = new FormControl('', []);
  continentControl = new FormControl('', []);
  celestialObjectControl = new FormControl('', []);

  @ViewChild('locationTypeSelect') locationTypeSelect: MatSelect;
  @ViewChild('areaSelect') areaSelect: MatSelect;
  @ViewChild('subregionSelect') subregionSelect: MatSelect;
  @ViewChild('regionSelect') regionSelect: MatSelect;
  @ViewChild('subcontinentSelect') subcontinentSelect: MatSelect;
  @ViewChild('continentSelect') continentSelect: MatSelect;
  @ViewChild('celestialObjectSelect') celestialObjectSelect: MatSelect;

  @Output() complete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public submitOperation() {
    this.complete.emit();
  }

  public cancelOperation() {
    this.cancel.emit();
  }

  public setSelectedMapObject(model: any, dataType: number) {
    this.selectedMapObject = model;
    this.dataType = dataType;
    console.log(this.selectedMapObject);
  }

  // #region Group Queries
  public queryLocationTypes() {
    this.mapService.getLocationTypes([]).subscribe(data => {
      this.locationTypes = data;
    },
    error => {
      console.error(error);
    })
  }

  public queryAreas() {
    this.mapService.getAreas([]).subscribe(data => {
      this.areas = data;
      this.filteredAreas = this.areas;
    },
    error => {
      console.error(error);
    })
  }

  public querySubregions() {
    this.mapService.getSubregions([]).subscribe(data => {
      this.subregions = data;
      this.filteredSubregions = this.subregions;
    },
    error => {
      console.error(error);
    })
  }

  public queryRegions() {
    this.mapService.getRegions([]).subscribe(data => {
      this.regions = data;
      this.filteredRegions = this.regions;
    },
    error => {
      console.error(error);
    })
  }

  public querySubcontinents() {
    this.mapService.getSubcontinents([]).subscribe(data => {
      this.subcontinents = data;
      this.filteredSubcontinents = this.subcontinents;
    },
    error => {
      console.error(error);
    })
  }

  public queryContinents() {
    this.mapService.getContinents([]).subscribe(data => {
      this.continents = data;
      this.filteredContinents = this.continents;
    },
    error => {
      console.error(error);
    })
  }

  public queryCelestialObjects() {
    this.mapService.getCelestialObjects([]).subscribe(data => {
      this.celestialObjects = data;
      this.filteredCelestialObjects = this.celestialObjects;
    },
    error => {
      console.error(error);
    })
  }
  // #endregion

  // #region Specific Queries
  public queryLocation(id: number): any {
    return this.mapService.getLocation(id);
  }

  public queryArea(id: number): any {
    return this.mapService.getArea(id);
  }

  public querySubregion(id: number): any {
    return this.mapService.getSubregion(id);
  }

  public queryRegion(id: number): any {
    return this.mapService.getRegion(id);
  }

  public querySubcontinent(id: number): any {
    return this.mapService.getSubcontinent(id);
  }

  public queryContinent(id: number): any {
    return this.mapService.getContinent(id);
  }

  public queryCelestialObject(id: number): any {
    return this.mapService.getCelestialObject(id);
  }
  // #endregion

  //#region Field Resetting
  public resetAreaField() {
    var filter = this.areaControl.value ? this.areaControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var areasFiltered = this.areas.filter(area => {
        return area.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (areasFiltered.length > 0) {
        this.selectedArea = areasFiltered[0].id;
        this.areaControl.setValue(areasFiltered[0].name);
      }
      else {
        areasFiltered = this.areas.filter( area => {
          return area.id == this.selectedArea;
        });
        this.areaControl.setValue(areasFiltered[0] != null ? areasFiltered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedArea = -1;
      this.areaControl.setValue(null);
    }
  }

  public resetSubregionField() {
    var filter = this.subregionControl.value ? this.subregionControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.subregions.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedSubregion = filtered[0].id;
        this.subregionControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.subregions.filter( item => {
          return item.id == this.selectedSubregion;
        });
        this.subregionControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedSubregion = -1;
      this.subregionControl.setValue(null);
    }
  }

  public resetRegionField() {
    var filter = this.regionControl.value ? this.regionControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.regions.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedRegion = filtered[0].id;
        this.regionControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.regions.filter( item => {
          return item.id == this.selectedRegion;
        });
        this.regionControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedRegion = -1;
      this.regionControl.setValue(null);
    }
  }

  public resetSubcontinentField() {
    var filter = this.subcontinentControl.value ? this.subcontinentControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.subcontinents.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedSubcontinent = filtered[0].id;
        this.subcontinentControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.subcontinents.filter( item => {
          return item.id == this.selectedSubcontinent;
        });
        this.subcontinentControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedSubcontinent = -1;
      this.subcontinentControl.setValue(null);
    }
  }

  public resetContinentField() {
    var filter = this.continentControl.value ? this.continentControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.continents.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedContinent = filtered[0].id;
        this.continentControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.continents.filter( item => {
          return item.id == this.selectedContinent;
        });
        this.continentControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedContinent = -1;
      this.continentControl.setValue(null);
    }
  }

  public resetCelestialObjectField() {
    var filter = this.celestialObjectControl.value ? this.celestialObjectControl.value : '';
    // If filter value not empty
    if (filter != '') {
      var filtered = this.celestialObjects.filter(item => {
        return item.name.toLowerCase() === filter.toString().toLowerCase();
      });
      if (filtered.length > 0) {
        this.selectedCelestialObject = filtered[0].id;
        this.celestialObjectControl.setValue(filtered[0].name);
      }
      else {
        filtered = this.celestialObjects.filter( item => {
          return item.id == this.selectedCelestialObject;
        });
        this.celestialObjectControl.setValue(filtered[0] != null ? filtered[0].name : '');
      }
    }
    // Else, set to what it was before
    else {
      this.selectedCelestialObject = -1;
      this.celestialObjectControl.setValue(null);
    }
  }
  // #endregion

  // #region Field Select Events
  public selectAreaEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.areas.filter(item => {return item.id == event.source.value})[0];
    this.selectedArea = filtered.id;
    this.areaControl.setValue(filtered.name);
  }

  public selectSubregionEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.subregions.filter(item => {return item.id == event.source.value})[0];
    this.selectedSubregion = filtered.id;
    this.subregionControl.setValue(filtered.name);
  }

  public selectRegionEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.regions.filter(item => {return item.id == event.source.value})[0];
    this.selectedRegion = filtered.id;
    this.regionControl.setValue(filtered.name);
  }

  public selectSubcontinentEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.subcontinents.filter(item => {return item.id == event.source.value})[0];
    this.selectedSubcontinent = filtered.id;
    this.subcontinentControl.setValue(filtered.name);
  }

  public selectContinentEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.continents.filter(item => {return item.id == event.source.value})[0];
    this.selectedContinent = filtered.id;
    this.continentControl.setValue(filtered.name);
  }

  public selectCelestialObjectEvent(event: MatOptionSelectionChange) {
    if (!event.isUserInput) { return; } 
    var filtered = this.celestialObjects.filter(item => {return item.id == event.source.value})[0];
    this.selectedCelestialObject = filtered.id;
    this.celestialObjectControl.setValue(filtered.name);
  }
  // #endregion

  // #region Field Filtering
  public filterAreas(filter: string | null) {
    if (filter == null)
    {
      this.filteredAreas = this.areas; 
      return;
    }
    this.filteredAreas = this.areas.filter(area => {
      return area.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterSubregions(filter: string | null) {
    if (filter == null)
    {
      this.filteredSubregions = this.subregions; 
      return;
    }
    this.filteredSubregions = this.subregions.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterRegions(filter: string | null) {
    if (filter == null)
    {
      this.filteredRegions = this.regions; 
      return;
    }
    this.filteredRegions = this.regions.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterSubcontinents(filter: string | null) {
    if (filter == null)
    {
      this.filteredSubcontinents = this.subcontinents; 
      return;
    }
    this.filteredSubcontinents = this.subcontinents.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterContinents(filter: string | null) {
    if (filter == null)
    {
      this.filteredContinents = this.continents; 
      return;
    }
    this.filteredContinents = this.continents.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }

  public filterCelestialObjects(filter: string | null) {
    if (filter == null)
    {
      this.filteredCelestialObjects = this.celestialObjects; 
      return;
    }
    this.filteredCelestialObjects = this.celestialObjects.filter(item => {
      return item.name.toLowerCase().indexOf(filter.toString().toLowerCase()) > -1;
    })
  }
  // #endregion

  public load(id: number, dataType: number) {
    var func;
    switch (dataType) {
      case 0:
        func = this.queryLocation;
        break;
      case 1:
        func = this.queryArea;
        break;
      case 2:
        func = this.querySubregion;
        break;
      case 3:
        func = this.queryRegion;
        break;
      case 4:
        func = this.querySubcontinent;
        break;
      case 5:
        func = this.queryContinent;
        break;
      default:
        func = this.queryLocation;
        break;
    }

    func(id).subscribe((data: any) => {
      this.selectedMapObject = data;
    },
    (error: any) => {
      this.errorHandler.handle(error)
    })
  }

  public validateAdd() {
    if (this.nameControl.invalid) {
      this.nameControl.markAllAsTouched(); // mark all input fields as touched to trigger error messages
      return false;
    }
    return true;
  }

  public createLocation() {
    if (!this.validateAdd()) return;

    this.dataType = this.mapDataTypeControl.value != null ? +this.mapDataTypeControl.value : -1;

    var model;
    switch (this.dataType) {
      case 0:
        model = {
          locationName: this.nameControl.value,
          areaId: this.selectedArea != -1 ? this.selectedArea: null,
          locationTypeId: (this.locationTypeSelect && this.locationTypeSelect.value) ? this.locationTypeSelect.value.id : null,
          latitude: this.markerLat,
          longitude: this.markerLng
        };
        console.log(model);
        this.mapService.postLocation(model).subscribe((data: any) => {
          this.submitOperation();
        },
        (error: any) => {
          this.errorHandler.handle(error);
        })
        break;
      case 1:
        model = {
          name: this.nameControl.value,
          subregionId: this.selectedSubregion != -1 ? this.selectedSubregion : null,
          latitude: this.markerLat,
          longitude: this.markerLng
        };
        this.mapService.postArea(model).subscribe((data: any) => {
          this.submitOperation();
        },
        (error: any) => {
          this.errorHandler.handle(error);
        })
        break;
      case 2:
        model = {
          name: this.nameControl.value,
          regionId: this.selectedRegion != -1 ? this.selectedRegion : null,
          latitude: this.markerLat,
          longitude: this.markerLng
        };
        this.mapService.postSubregion(model).subscribe((data: any) => {
          this.submitOperation();
        },
        (error: any) => {
          this.errorHandler.handle(error);
        })
        break;
      case 3:
        model = {
          name: this.nameControl.value,
          subcontinentId: this.selectedSubcontinent != -1 ? this.selectedSubcontinent : null,
          latitude: this.markerLat,
          longitude: this.markerLng
        };
        this.mapService.postRegion(model).subscribe((data: any) => {
          this.submitOperation();
        },
        (error: any) => {
          this.errorHandler.handle(error);
        })
        break;
      case 4:
        model = {
          name: this.nameControl.value,
          continentId: this.selectedContinent != -1 ? this.selectedContinent : null,
          latitude: this.markerLat,
          longitude: this.markerLng
        };
        this.mapService.postSubcontinent(model).subscribe((data: any) => {
          this.submitOperation();
        },
        (error: any) => {
          this.errorHandler.handle(error);
        })
        break;
      case 5:
        model = {
          name: this.nameControl.value,
          continentId: this.selectedCelestialObject != -1 ? this.selectedCelestialObject : null,
          latitude: this.markerLat,
          longitude: this.markerLng
        };
        this.mapService.postContinent(model).subscribe((data: any) => {
          this.submitOperation();
        },
        (error: any) => {
          this.errorHandler.handle(error);
        })
        break;
      default:
        break;
    }
  }

  public setMarkerLocations(lat: number, lng: number) {
    this.markerLat = lat;
    this.markerLng = lng;
  }

  public submit() {
    if (this.editing) {

    }
    else {
      this.createLocation();
    }
  }

  public cancelAddEdit() {
    this.cancel.emit();
  }

  constructor(public mapService: MapService, private errorHandler: MapErrorService) { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };

    this.queryLocationTypes();
    this.queryAreas();
    this.querySubregions();
    this.queryRegions();
    this.querySubcontinents();
    this.queryContinents();
    this.queryCelestialObjects();

    this.areaControl.valueChanges.subscribe( data => {
      this.filterAreas(data);
    });
    this.subregionControl.valueChanges.subscribe( data => {
      this.filterSubregions(data);
    });
    this.regionControl.valueChanges.subscribe( data => {
      this.filterRegions(data);
    });
    this.subcontinentControl.valueChanges.subscribe( data => {
      this.filterSubcontinents(data);
    });
    this.continentControl.valueChanges.subscribe( data => {
      this.filterContinents(data);
    });
    this.celestialObjectControl.valueChanges.subscribe( data => {
      this.filterCelestialObjects(data);
    });
  }
}
