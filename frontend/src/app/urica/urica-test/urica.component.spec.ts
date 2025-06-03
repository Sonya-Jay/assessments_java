import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UricaComponent } from './urica.component';

describe('UricaComponent', () => {
  let component: UricaComponent;
  let fixture: ComponentFixture<UricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UricaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
