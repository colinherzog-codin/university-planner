import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleClassComponent } from './module-class.component';

describe('ModuleClassComponent', () => {
  let component: ModuleClassComponent;
  let fixture: ComponentFixture<ModuleClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
