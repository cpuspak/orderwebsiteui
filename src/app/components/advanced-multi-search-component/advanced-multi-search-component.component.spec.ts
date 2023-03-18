import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedMultiSearchComponentComponent } from './advanced-multi-search-component.component';

describe('AdvancedMultiSearchComponentComponent', () => {
  let component: AdvancedMultiSearchComponentComponent;
  let fixture: ComponentFixture<AdvancedMultiSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedMultiSearchComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedMultiSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
