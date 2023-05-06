import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Area, Subregion, Region, Subcontinent, Continent, CelestialObject } from "../models/location-data-types/area-data-types";
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  public selectedMapObject: any;
  public dataType: number;

  mapDataTypeControl = new FormControl('', []);
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  locationTypeControl = new FormControl('', []);

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

  @Output() editComplete = new EventEmitter();
  @Output() cancel = new EventEmitter();

  public submitEdit() {
    this.editComplete.emit();
  }

  public cancelEdit() {
    this.cancel.emit();
  }

  public setSelectedMapObject(model: any, dataType: number) {
    this.selectedMapObject = model;
    this.dataType = dataType;
    console.log(this.selectedMapObject);
  }

  constructor() { }

  ngOnInit(): void {
    this.selectedMapObject = { id: -1, name: "NONE" };
  }
}
