import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAplicantesComponent } from './form-aplicantes.component';

describe('FormAplicantesComponent', () => {
  let component: FormAplicantesComponent;
  let fixture: ComponentFixture<FormAplicantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAplicantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAplicantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
