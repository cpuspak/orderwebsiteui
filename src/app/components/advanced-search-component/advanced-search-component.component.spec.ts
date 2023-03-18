import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchComponentComponent } from './advanced-search-component.component';

describe('AdvancedSearchComponentComponent', () => {
  let component: AdvancedSearchComponentComponent;
  let fixture: ComponentFixture<AdvancedSearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedSearchComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
