import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObrasComponent } from './form-obras.component';

describe('FormObrasComponent', () => {
  let component: FormObrasComponent;
  let fixture: ComponentFixture<FormObrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormObrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
