import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimsResultComponent } from './aims-result.component';

describe('AimsResultComponent', () => {
  let component: AimsResultComponent;
  let fixture: ComponentFixture<AimsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AimsResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AimsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
