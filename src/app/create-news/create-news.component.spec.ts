import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsComponent } from './create-news.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParentStubComponent } from '__test__/mock-components/create-news-parent.component';

describe('CreateNewsComponent for edit scenario', () => {
  let component: ParentStubComponent;
  let fixture: ComponentFixture<ParentStubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewsComponent, ParentStubComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display title as edit on passing news value', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('h2').textContent)
    .toBe('Edit News');
  });

  it('on click of close button in modal , closeModal is called ', () => {
    const closeModalSpy = spyOn(component,'closeModal');
    const closeBtn = fixture.debugElement.nativeElement.querySelector('.close-icon');
    closeBtn.click();
    fixture.detectChanges();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('on click of submit button in modal , createNews is called ', () => {
    const createNewsSpy = spyOn(component,'createNews');
    const submitBtn = fixture.debugElement.nativeElement.querySelector('button');
    submitBtn.click();
    fixture.detectChanges();
    expect(createNewsSpy).toHaveBeenCalled();
  });

});

describe('CreateNewsComponent for create scenario', () => {
  let component: ParentStubComponent;
  let fixture: ComponentFixture<ParentStubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewsComponent, ParentStubComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStubComponent);
    component = fixture.componentInstance;
    component.value = null;
    fixture.detectChanges();
  });

  it('should create and display title as create news on load', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('h2').textContent)
    .toBe('Create News');
  });
  it('', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('h2').textContent)
    .toBe('Create News');
  });

  it('on click of submit button in modal , if form is invalid alert is displayed ', () => {
    const alertSpy = spyOn(window,'alert');
    const submitBtn = fixture.debugElement.nativeElement.querySelector('button');
    submitBtn.click();
    fixture.detectChanges();
    expect(alertSpy).toHaveBeenCalled();
  });
});