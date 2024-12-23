import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsProfileComponent } from './ds-profile.component';

describe('DsProfileComponent', () => {
  let component: DsProfileComponent;
  let fixture: ComponentFixture<DsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
