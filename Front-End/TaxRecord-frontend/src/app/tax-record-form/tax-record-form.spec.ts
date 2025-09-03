import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRecordForm } from './tax-record-form';

describe('TaxRecordForm', () => {
  let component: TaxRecordForm;
  let fixture: ComponentFixture<TaxRecordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxRecordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxRecordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
