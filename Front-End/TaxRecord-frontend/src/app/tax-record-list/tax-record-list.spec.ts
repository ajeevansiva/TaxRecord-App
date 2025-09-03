import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRecordListComponent } from './tax-record-list';

describe('TaxRecordListComponent', () => {
  let component: TaxRecordListComponent;
  let fixture: ComponentFixture<TaxRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxRecordListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
