import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRecordList } from './tax-record-list';

describe('TaxRecordList', () => {
  let component: TaxRecordList;
  let fixture: ComponentFixture<TaxRecordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxRecordList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxRecordList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
