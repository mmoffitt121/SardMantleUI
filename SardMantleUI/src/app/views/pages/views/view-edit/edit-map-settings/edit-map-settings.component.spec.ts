import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMapSettingsComponent } from './edit-map-settings.component';

describe('EditMapSettingsComponent', () => {
  let component: EditMapSettingsComponent;
  let fixture: ComponentFixture<EditMapSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMapSettingsComponent]
    });
    fixture = TestBed.createComponent(EditMapSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
