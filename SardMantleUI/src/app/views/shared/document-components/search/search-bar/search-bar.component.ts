import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() maxLength: number | null = null;

  @Output() valueChanged = new EventEmitter(); 
  @Output() search = new EventEmitter();

  @Input() control = new FormControl();

  public validate(e: any) {
    this.control.markAsTouched();
  }

  public handleSearch() {
    this.search.emit();
  }

  public setValue(value: any) {
    if (value == null) {
      return;
    }
    this.control.setValue(value);
  }

  public getValue() {
    return this.control.value;
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => this.valueChanged.emit(value))
  }
}
