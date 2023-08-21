import { Component } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  public settingPage: number = 0;

  public setSettingPage(settingPage: number) {
    this.settingPage = settingPage;
  }
}
