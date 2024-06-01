import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent {
  @Input() documentId: number | undefined;

  @Output() submit = new EventEmitter();
}
