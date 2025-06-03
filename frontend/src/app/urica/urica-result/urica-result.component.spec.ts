import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UricaResultComponent } from './urica-result.component';

describe('UricaResultComponent', () => {
  let component: UricaResultComponent;
  let fixture: ComponentFixture<UricaResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UricaResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UricaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
