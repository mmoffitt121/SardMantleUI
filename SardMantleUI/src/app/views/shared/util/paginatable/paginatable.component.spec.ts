import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatableComponent } from './paginatable.component';

describe('PaginatableComponent', () => {
  let component: PaginatableComponent;
  let fixture: ComponentFixture<PaginatableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatableComponent]
    });
    fixture = TestBed.createComponent(PaginatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
