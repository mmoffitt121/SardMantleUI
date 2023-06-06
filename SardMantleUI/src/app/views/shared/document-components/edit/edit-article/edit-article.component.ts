import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public parameterName: string = 'Parameter Name';
  public parameterSummary: string = 'This is a summary of this particular parameter. Pretty cool right?'

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.editor = new Editor({
      content: '',
      plugins: [],
      history: true,
    });
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
