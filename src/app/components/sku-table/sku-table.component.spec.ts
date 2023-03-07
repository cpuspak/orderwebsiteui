import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuTableComponent } from './sku-table.component';

describe('SkuTableComponent', () => {
  let component: SkuTableComponent;
  let fixture: ComponentFixture<SkuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkuTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
