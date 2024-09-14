import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-param',
  templateUrl: './view-param.component.html',
  styleUrls: ['./view-param.component.scss']
})
export class ViewParamComponent implements OnInit {
  @Input() parameter: any;
  public name = "";
  public value = "";

  ngOnInit() {
    this.name = this.parameter.typeParameterName;
    switch (this.parameter.typeParameterTypeValue) {
      default:
        this.value = this.parameter.value;
        break;
    }
  }
}
