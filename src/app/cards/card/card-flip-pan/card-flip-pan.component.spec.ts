import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlipPanComponent } from './card-flip-pan.component';

describe('CardFlipPanComponent', () => {
  let component: CardFlipPanComponent;
  let fixture: ComponentFixture<CardFlipPanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFlipPanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFlipPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
