import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimsComponent } from './aims.component';

describe('AimsComponent', () => {
  let component: AimsComponent;
  let fixture: ComponentFixture<AimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
