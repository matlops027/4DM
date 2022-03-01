import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdmComponent } from './listar-adm.component';

describe('ListarAdmComponent', () => {
  let component: ListarAdmComponent;
  let fixture: ComponentFixture<ListarAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
