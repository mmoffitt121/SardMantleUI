import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-data-point',
  templateUrl: './edit-data-point.component.html',
  styleUrls: ['./edit-data-point.component.scss']
})
export class EditDataPointComponent implements OnChanges {
  formControl = new FormControl();
  public filteredItems: any[];
  @Input() items: any[];
  @Input() maxItemLength = 25;
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() selectedItem: any;
  @Input() disabled = false;
  public filter: string | undefined;
  @Output() selected = new EventEmitter();

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.formControl.setValue(value);
  }

  public onInput(event: any) {
    console.log(event);
    if (this.filter == undefined) {
      this.formControl.setValue((event.data ? event.data : ''));
    }
    this.filter = this.formControl.value;
    this.handleFilterChange();
  }

  public handleSelectionChange(event: any) {
    this.selectedItem = this.items.find(i => i.id == event?.option?.value);
    this.formControl.setValue(this.selectedItem?.name);
    this.filter = undefined;
    this.selected.emit(this.selectedItem);
    this.handleFilterChange();
  }

  public handleFilterChange() {
    if (this.filter === undefined) {
      this.filteredItems = this.items?.slice(0, this.maxItemLength);
    }
    else {
      this.filteredItems = this.items?.filter(i => i.name.toLocaleLowerCase().includes(this.filter?.toLocaleLowerCase()))
        ?.slice(0, this.maxItemLength);
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
  }
}
