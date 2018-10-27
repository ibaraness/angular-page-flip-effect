import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPanComponent } from './cards-pan.component';

describe('CardsPanComponent', () => {
  let component: CardsPanComponent;
  let fixture: ComponentFixture<CardsPanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsPanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
