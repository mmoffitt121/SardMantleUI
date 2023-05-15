import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHeiarchyComponent } from './view-heiarchy.component';

describe('ViewHeiarchyComponent', () => {
  let component: ViewHeiarchyComponent;
  let fixture: ComponentFixture<ViewHeiarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHeiarchyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHeiarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
