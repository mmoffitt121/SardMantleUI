import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-document-filter',
  templateUrl: './document-filter.component.html',
  styleUrls: ['./document-filter.component.scss']
})
export class DocumentFilterComponent {
  public documentTypeControl = new FormControl();
  public documentControl = new FormControl();

  @Output() searchTypes = new EventEmitter();
  @Output() search = new EventEmitter();

  public documentTypeFilter: string;
  public documentFilter: string;

  public filterDocumentTypes() {
    this.documentTypeFilter = this.documentTypeControl.value;
    this.searchTypes.emit();
  }

  public filterDocuments() {
    this.documentFilter = this.documentControl.value;
    this.search.emit();
  }
}
