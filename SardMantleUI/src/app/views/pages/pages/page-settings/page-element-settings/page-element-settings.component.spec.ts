import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageElementSettingsComponent } from './page-element-settings.component';

describe('PageElementSettingsComponent', () => {
  let component: PageElementSettingsComponent;
  let fixture: ComponentFixture<PageElementSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageElementSettingsComponent]
    });
    fixture = TestBed.createComponent(PageElementSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
