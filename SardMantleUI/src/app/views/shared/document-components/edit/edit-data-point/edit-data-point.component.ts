import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentType } from 'src/app/models/document/document-types/document-type';
import { DocumentTypeService } from 'src/app/services/document/document-type.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-edit-data-point',
  templateUrl: './edit-data-point.component.html',
  styleUrls: ['./edit-data-point.component.scss']
})
export class EditDataPointComponent implements OnChanges, OnInit {
  formControl = new FormControl();
  @Input() control = new FormControl();
  public filteredItems: any[];
  @Input() items: any[];
  @Input() maxItemLength = 25;
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() selectedItem: any;
  @Input() disabled = false;
  @Input() externalFilter = false;
  @Input() automaticallyLoadAllDataPoints = false;
  public filter: string | undefined;
  @Output() selected = new EventEmitter();
  @Output() filterChanged = new EventEmitter();

  public typeParameterId: number;
  public typeId: number;

  private selfLoading = false;

  public setValue(value: any) {
    if (value !== undefined) {
      this.setDataPointId(value.dataPointValueId);
    }
  }

  public setDataPointId(valueId: number) {
    this.documentService.getDocument(valueId).subscribe(data => {
      if (data == null) {
        return;
      }
      this.selectedItem = data;
      this.formControl.setValue(this.selectedItem?.name);
    },
    error => this.errorService.handle(error))
  }

  public setTypeId(type: number) {
    this.selfLoading = true;
    this.typeId = type;
    this.queryChoices();
  }

  public queryChoices() {
    if (this.selfLoading) {
      let criteria = {
        pageSize: 100,
        pageNumber: 1,
        query: this.filter ?? "",
        typeId: this.typeId ?? -1
      };
      this.documentService.getDocuments(criteria).subscribe(data => {
        this.items = data;
        this.handleFilterChange();
      })
    }
  }

  public getValue() {
    return this.selectedItem?.id ?? null;
  }

  public onInput(event: any) {
    if (this.filter == undefined) {
      this.formControl.setValue((event.data ? event.data : ''));
    }
    this.filter = this.formControl.value;
    this.handleFilterChange();
    this.queryChoices();
  }

  public handleSelectionChange(event: any) {
    if (this.items === undefined) return;
    this.selectedItem = this.items.find(i => i.id == event?.option?.value);
    this.formControl.setValue(this.selectedItem?.name);
    this.filter = undefined;
    this.selected.emit(this.selectedItem);
    this.handleFilterChange();
  }

  public clearSelection() {
    this.selectedItem = undefined;
    this.formControl.setValue("");
  }

  public handleFilterChange() {
    if (this.externalFilter) {
      this.filterChanged.emit();
    }
    else {
      if (this.filter === undefined) {
        this.filteredItems = this.items?.slice(0, this.maxItemLength);
      }
      else {
        this.filteredItems = this.items?.filter(i => i.name.toLocaleLowerCase().includes(this.filter?.toLocaleLowerCase()))
          ?.slice(0, this.maxItemLength);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems = this.items;
      this.handleFilterChange();
    }
    if (changes['selectedItem'] && changes['selectedItem'].currentValue) {
      this.handleSelectionChange({option: {value: changes['selectedItem'].currentValue?.id}});
    }
    if (changes['selectedItem'] && !changes['selectedItem'].currentValue) {
      this.clearSelection();
    }
  }

  ngOnInit() {
    if (this.automaticallyLoadAllDataPoints) {
      this.selfLoading = true;
      this.queryChoices();
    }
  }

  constructor (
    private typeService: DocumentTypeService, 
    private documentService: DocumentService, 
    private cdref: ChangeDetectorRef, 
    private errorService: ErrorService) { }
}
