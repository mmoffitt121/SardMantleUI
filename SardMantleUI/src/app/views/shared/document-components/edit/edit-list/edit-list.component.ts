import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditIntComponent } from '../edit-int/edit-int.component';
import { EditDoubleComponent } from '../edit-double/edit-double.component';
import { EditStringComponent } from '../edit-string/edit-string.component';
import { EditSummaryComponent } from '../edit-summary/edit-summary.component';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { EditDataPointComponent } from '../edit-data-point/edit-data-point.component';
import { EditBoolComponent } from '../edit-bool/edit-bool.component';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements AfterViewInit {
  @Input() parameterName: string = '';
  @Input() parameterSummary: string = '';
  @Input() items: any[] = [];
  @Output() itemsChange = new EventEmitter();
  @Input() dataType: string;

  public parameterComponents: any[] = [];

  @ViewChild('itemContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;

  public loadList() {
    this.container.clear();
    this.parameterComponents = [];
    let index = 0;
    this.items.forEach(i => {
      switch (this.dataType) {
        case 'int':
          let component = this.container.createComponent(EditIntComponent);
          this.parameterComponents.push(component);
          component.instance.setValue(i);
          component.instance.thin = true;
          component.instance.canDelete = true;
          component.instance.delete.pipe(take(1)).subscribe((event: any) => this.deleteItem(event));
          component.instance.valueChanged.pipe(take(1)).subscribe((event: any) => this.updateItem(event));
          component.instance.index = index;
          break;
        case 'dub':
          this.parameterComponents.push(this.container.createComponent(EditDoubleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(i);
          break;
        case 'sum':
          this.parameterComponents.push(this.container.createComponent(EditSummaryComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(i);
          break;
        case 'doc':
          this.parameterComponents.push(this.container.createComponent(EditArticleComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(i);
          break;
        case 'bit':
          this.parameterComponents.push(this.container.createComponent(EditBoolComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(i);
          break;
        case 'dat': // Not Implemented
        default:
          this.parameterComponents.push(this.container.createComponent(EditStringComponent));
          this.parameterComponents[this.parameterComponents.length - 1].instance.setValue(i);
          break;
      }
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterName = '';
      this.parameterComponents[this.parameterComponents.length - 1].instance.parameterSummary = '';
      this.parameterComponents[this.parameterComponents.length - 1].instance.control.valueChanges.subscribe((value: any) => this.getItemList());
      index++;
    });
  }

  public addItem() {
    this.items.push('');
    this.loadList();
    this.itemsChange.emit(this.items);
  }

  public deleteItem($event: any) {
    this.items.splice($event, 1);
    this.loadList();
    this.itemsChange.emit(this.items);
  }

  public updateItem($event: any) {
    this.items[$event.index] = $event.value;
    this.itemsChange.emit(this.items);
  }

  public getItemList() {
    let items = [] as any[];
    this.parameterComponents.forEach(i => items.push(i.instance.getValue()));
    this.items = items;
    return(this.items);
  }

  constructor(private cdref: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.loadList();
    this.cdref.detectChanges();
  }
}
