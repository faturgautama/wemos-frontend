import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCustomerComponent } from './ds-customer.component';

describe('DsCustomerComponent', () => {
  let component: DsCustomerComponent;
  let fixture: ComponentFixture<DsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
