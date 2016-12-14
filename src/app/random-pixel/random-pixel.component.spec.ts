/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RandomPixelComponent } from './random-pixel.component';

describe('RandomPixelComponent', () => {
  let component: RandomPixelComponent;
  let fixture: ComponentFixture<RandomPixelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomPixelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPixelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
