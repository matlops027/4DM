import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDoadorComponent } from './index-doador.component';

describe('IndexDoadorComponent', () => {
  let component: IndexDoadorComponent;
  let fixture: ComponentFixture<IndexDoadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexDoadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
