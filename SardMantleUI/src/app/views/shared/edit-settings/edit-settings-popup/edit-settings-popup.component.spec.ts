import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettingsPopupComponent } from './edit-settings-popup.component';

describe('EditSettingsPopupComponent', () => {
  let component: EditSettingsPopupComponent;
  let fixture: ComponentFixture<EditSettingsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSettingsPopupComponent]
    });
    fixture = TestBed.createComponent(EditSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
