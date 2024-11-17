import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocumentType, DocumentTypeParameter } from 'src/app/models/document/document-types/document-type';
import { SearchBinCriteria, SearchCriteriaOptions, View } from 'src/app/models/pages/view';
import { FormItem, FormItemOption } from 'src/app/views/shared/form/form.component';
import { DocumentIconMaps } from 'src/app/models/document/document-icon-maps/document-icon-maps';
import { EditLabelledSelectionListComponent } from 'src/app/views/shared/edit/edit-labelled-selection-list/edit-labelled-selection-list.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-searchbins',
  templateUrl: './edit-searchbins.component.html',
  styleUrls: ['./edit-searchbins.component.scss']
})
export class EditSearchbinsComponent {
  public view: View;
  public selected?: SearchBinCriteria;
  public selectedIndex: number;

  public isPrimaryForTimeline = false;

  private filterModeMap = new Map<number, string>([
    [0, "Equals"],
    [1, "Contains"],
    [2, "Starts With"],
    [3, "Ends With"],
    [5, "Greater Than"],
    [6, "Less Than"],
    [7, "True"],
    [8, "False"],
  ]);
  private availableFilterModesMap = new Map<string, number[]>([
    ["doc", [0, 1]],
    ["bit", [0, 7, 8]],
    ["tim", [0, 5, 6]],
    ["dub", [0, 5, 6]],
    ["dat", [0]],
    ["int", [0, 5, 6]],
    ["str", [0, 1, 2, 3]],
    ["sum", [0, 1, 2, 3]],
    ["uni", [0, 5, 6]]
  ])

  public types: DocumentType[];
  public params: DocumentTypeParameter[];
  public availableParams: DocumentTypeParameter[];
  public typeValues: string[];

  public items: FormItem[];

  public nameMap = new DocumentIconMaps().nameMap;

  private setItems() {
    this.items = [];
    this.items.push({
      name: "Name",
      value: this.selected?.name,
    } as FormItem);
    this.items.push({
      name: "Parameter Type",
      value: this.selected?.typeValue,
      options: this.typeValues.map(tv => ({ name: this.nameMap.get(tv), value: tv }))
    } as FormItem);
    this.isPrimaryForTimeline = this.isPrimaryTimelineBin();
    // Do not show filter settings if this is the primary search bin for a timeline view
    if (!this.isPrimaryTimelineBin()) {
      this.items.push({
        name: "Filter Mode",
        value: this.selected?.filterMode + "",
        options: this.availableFilterModesMap.get(this.selected?.typeValue ?? "")?.map(tv => ({name: this.filterModeMap.get(tv) ?? "", value: tv + ""}))
      } as FormItem);
      this.items.push({
        name: "Value (Blank to make user-searchable)",
        value: this.selected?.value,
        type: this.selected?.typeValue
      } as FormItem);
    }
    this.filterAvailableParameters();
  }

  private isPrimaryTimelineBin() {
    return (this.view.viewType.includes("Timeline") && this.selected?.typeValue == 'tim' && this.selectedIndex == 0);
  }

  public change(formData: any[]) {
    if (!this.selected) {
      return;
    }

    let reload = false;

    if (this.selected.typeValue != formData[1].value) {
      this.selected.parameters = [];
      reload = true;
    }

    this.selected.name = formData[0].value;
    this.selected.typeValue = formData[1].value;
    if (!this.isPrimaryTimelineBin()) {
      this.selected.filterMode = Number(formData[2].value);
      this.selected.value = formData[3].value;
    }
    
    let options = this.availableFilterModesMap.get(this.selected?.typeValue ?? "")?.map(tv => ({name: this.filterModeMap.get(tv) ?? "", value: tv + ""})) ?? [];
    if (!this.isPrimaryTimelineBin() && !options?.map(opt => Number(opt.value)).includes(Number(formData[2].value))) {
      this.selected.filterMode = 0;
      this.selected.value = "";
      reload = true;
    } else {
      this.filterAvailableParameters();
    }

    if (reload) {
      this.setItems();
    }
  }

  public filterAvailableParameters() {
    this.availableParams = this.params.filter(p => p.typeValue == this.selected?.typeValue);
  }

  public selectParameters() {
    const dialogRef = this.dialog.open(EditLabelledSelectionListComponent, {
      width: '500px',
      height: 'min(100vh, 600px)',
      data: { 
        title: "Parameters User Can Filter By", 
        items: this.availableParams.map(p => ({label: p.name + " (" + this.types.find(t => t.id == p.dataPointTypeId)?.name + ")", value: p.id})),
        selectedItems: this.selected?.parameters
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selected) {
        this.selected.parameters = result;
      }
    });
  }

  public remove() {
    this.view!.searchCriteriaOptions!.criteria!.searchBinCriteria!.splice(this.selectedIndex, 1);
    this.selected = undefined;
    this.selectedIndex = -1;
  }

  public select(item: SearchBinCriteria | undefined, index?: number) {
    this.selected = item;
    if (index !== undefined) {
      this.selectedIndex = index;
    }
    this.setItems();
  }

  public drop(event: any) {
    moveItemInArray(this.view!.searchCriteriaOptions!.criteria!.searchBinCriteria!, event.previousIndex, event.currentIndex);
  }

  public add() {
    this.view.searchCriteriaOptions?.criteria.searchBinCriteria?.push({
      name: "Search",
      value: "",
      typeValue: "str",
      parameters: [],
      filterMode: 0,
    })
  }

  constructor(public dialogRef: MatDialogRef<EditSearchbinsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.view = data.view;
    if (!this.view.searchCriteriaOptions) {
      this.view.searchCriteriaOptions = {} as SearchCriteriaOptions;
    }
    if (!this.view.searchCriteriaOptions?.criteria.searchBinCriteria) {
      this.view.searchCriteriaOptions.criteria.searchBinCriteria = [];
    }

    this.params = [];
    this.types = data.types;
    data.types.forEach((t: any) => this.params = this.params.concat(t.typeParameters));
    this.typeValues = this.params.filter(p => !p.subType).map(p => p.typeValue).filter((value, index, arr) => arr.indexOf(value) === index).sort((a, b) => (this.nameMap.get(a) ?? '').localeCompare(this.nameMap.get(b) ?? ''));
  }
}
