import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewChangesComponent } from './preview-changes.component';

describe('PreviewChangesComponent', () => {
  let component: PreviewChangesComponent;
  let fixture: ComponentFixture<PreviewChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
