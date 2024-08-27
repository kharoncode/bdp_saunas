import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaunasComponent } from './saunas.component';

describe('SaunasComponent', () => {
  let component: SaunasComponent;
  let fixture: ComponentFixture<SaunasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaunasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
