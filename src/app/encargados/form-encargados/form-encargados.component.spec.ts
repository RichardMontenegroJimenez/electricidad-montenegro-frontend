import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEncargadosComponent } from './form-encargados.component';

describe('FormEncargadosComponent', () => {
  let component: FormEncargadosComponent;
  let fixture: ComponentFixture<FormEncargadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEncargadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEncargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
