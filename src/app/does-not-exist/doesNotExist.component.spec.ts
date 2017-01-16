/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoesNotExistComponent } from '../does-not-exist/doesNotExist.component';

describe('DoesNotExistComponent', () => {
  let component: DoesNotExistComponent;
  let fixture: ComponentFixture<DoesNotExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoesNotExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoesNotExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
