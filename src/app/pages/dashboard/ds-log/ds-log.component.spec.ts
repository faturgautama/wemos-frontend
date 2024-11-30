import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsLogComponent } from './ds-log.component';

describe('DsLogComponent', () => {
  let component: DsLogComponent;
  let fixture: ComponentFixture<DsLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
