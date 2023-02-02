import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitasComponent } from './add-citas.component';

describe('AddCitasComponent', () => {
  let component: AddCitasComponent;
  let fixture: ComponentFixture<AddCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
