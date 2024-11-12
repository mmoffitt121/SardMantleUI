import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderSettingsComponent } from './page-header-settings.component';

describe('PageHeaderSettingsComponent', () => {
  let component: PageHeaderSettingsComponent;
  let fixture: ComponentFixture<PageHeaderSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderSettingsComponent]
    });
    fixture = TestBed.createComponent(PageHeaderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
