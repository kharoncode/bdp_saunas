import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaunaFormComponent } from './sauna-form.component';

describe('SaunaFormComponent', () => {
  let component: SaunaFormComponent;
  let fixture: ComponentFixture<SaunaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaunaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaunaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
