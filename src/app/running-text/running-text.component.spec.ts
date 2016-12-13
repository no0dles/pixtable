/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RunningTextComponent } from './running-text.component';

describe('RunningTextComponent', () => {
  let component: RunningTextComponent;
  let fixture: ComponentFixture<RunningTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
