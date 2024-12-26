import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLandingComponent } from './content-landing.component';

describe('ContentLandingComponent', () => {
  let component: ContentLandingComponent;
  let fixture: ComponentFixture<ContentLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
