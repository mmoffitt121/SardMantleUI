import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormFieldBasicComponent } from '../form-field-basic/form-field-basic.component';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-article',
  templateUrl: './form-field-article.component.html',
  styleUrls: ['./form-field-article.component.scss']
})
export class FormFieldArticleComponent extends FormFieldBasicComponent implements OnInit, OnDestroy {
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image']
  ];

  public htmlContent = "";

  public setValue(value: any) {
    if (value == null) {
      this.htmlContent = "";
      return;
    }
    this.htmlContent = value;
  }

  public getValue() {
    return this.htmlContent;
  }

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  public onChange() {
    this.parameter.value = this.htmlContent;
    this.valueChanged.emit(this.htmlContent)
  }

  override ngOnInit(): void {
    this.htmlContent = this.parameter.value ?? "";
    this.editor = new Editor({
      content: '',
      plugins: [],
      history: true,
    });
  }

  // make sure to destory the editor
  override ngOnDestroy(): void {
    this.editor.destroy();
  }
}
