import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsLoginComponent } from './ds-login.component';

describe('DsLoginComponent', () => {
  let component: DsLoginComponent;
  let fixture: ComponentFixture<DsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
