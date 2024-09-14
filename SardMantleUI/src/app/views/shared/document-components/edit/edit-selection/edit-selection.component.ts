import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FormItemOption } from '../../../form/form.component';

@Component({
  selector: 'app-edit-selection',
  templateUrl: './edit-selection.component.html',
  styleUrls: ['./edit-selection.component.scss']
})
export class EditSelectionComponent implements OnInit {
  formControl = new FormControl();

  @Input() thin = false;

  @Input() maxItemLength = 50;
  public filter: string;
  public filteredItems: any[];

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() canClear = false;

  public typeParameterId: number;
  public typeId: number;

  @Input() model: any;
  @Input() keyIdentifier: string = "id";
  @Input() nameIdentifier: string = "name";
  @Input() items: any[];
  @Output() modelChange = new EventEmitter<any>();

  public onInput(event: any) {
    this.filter = this.formControl.value;
    this.handleFilterChange();
  }

  public handleSelectionChange(selected: any) {
    if (this.items === undefined) return;
    this.formControl.setValue(selected);
    this.handleFilterChange();
    this.model[this.keyIdentifier] = selected;
    this.modelChange.emit(this.model);
  }

  public clearSelection() {
    this.formControl.setValue("");
  }

  public handleFilterChange() {
      if (this.filter === undefined) {
        this.filteredItems = this.items?.slice(0, this.maxItemLength);
      }
      else {
        this.filteredItems = this.items?.filter(i => i[this.nameIdentifier].toLocaleLowerCase().includes(this.filter?.toLocaleLowerCase()))
          ?.slice(0, this.maxItemLength);
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems = this.items;
      this.handleFilterChange();
    }
    if (changes['model']) {
      this.handleSelectionChange(changes['model'].currentValue[this.keyIdentifier]);
    }
  }

  ngOnInit() {
    if (this.items && this.items.length && this.model != null) {
      this.handleSelectionChange(this.model[this.keyIdentifier]);
    }
  }
}