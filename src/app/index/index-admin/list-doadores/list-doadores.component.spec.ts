import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoadoresComponent } from './list-doadores.component';

describe('ListDoadoresComponent', () => {
  let component: ListDoadoresComponent;
  let fixture: ComponentFixture<ListDoadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDoadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDoadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
