import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDoadorComponent } from './registro-doador.component';

describe('RegistroDoadorComponent', () => {
  let component: RegistroDoadorComponent;
  let fixture: ComponentFixture<RegistroDoadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroDoadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
