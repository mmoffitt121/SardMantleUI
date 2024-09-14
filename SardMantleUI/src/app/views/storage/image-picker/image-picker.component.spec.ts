import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePickerComponent } from './image-picker.component';

describe('ImagePickerComponent', () => {
  let component: ImagePickerComponent;
  let fixture: ComponentFixture<ImagePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePickerComponent]
    });
    fixture = TestBed.createComponent(ImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
