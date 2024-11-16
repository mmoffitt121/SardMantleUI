import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSearchbinsComponent } from './edit-searchbins.component';

describe('EditSearchbinsComponent', () => {
  let component: EditSearchbinsComponent;
  let fixture: ComponentFixture<EditSearchbinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSearchbinsComponent]
    });
    fixture = TestBed.createComponent(EditSearchbinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
