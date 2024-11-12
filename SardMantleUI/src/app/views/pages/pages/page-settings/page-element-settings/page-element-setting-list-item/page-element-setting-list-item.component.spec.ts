import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageElementSettingListItemComponent } from './page-element-setting-list-item.component';

describe('PageElementSettingListItemComponent', () => {
  let component: PageElementSettingListItemComponent;
  let fixture: ComponentFixture<PageElementSettingListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageElementSettingListItemComponent]
    });
    fixture = TestBed.createComponent(PageElementSettingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
