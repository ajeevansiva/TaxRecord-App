

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxRecordService, CreateTaxRecord, UpdateTaxRecord } from '../taxrecord-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tax-record-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './tax-record-form.component.html',
  styleUrls: ['./tax-record-form.component.css']
})
export class TaxRecordFormComponent implements OnInit {
  taxRecordForm: FormGroup;
  isEditMode = false;
  recordId: number | null = null;
  loading = false;
  submitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taxRecordService: TaxRecordService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taxRecordForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.recordId = +params['id'];
        this.loadRecord();
      }

    });
  }

  createForm(): FormGroup {
    const currentYear = new Date().getFullYear();
    return this.fb.group({
      recordTitle: ['', [Validators.required, Validators.maxLength(200)]],
      taxYear: [currentYear, [Validators.required, Validators.min(1900), Validators.max(3000)]],
      incomeAmount: [0, [Validators.required, Validators.min(0)]],
      deductionsAmount: [0, [Validators.required, Validators.min(0)]],
      notes: ['', [Validators.maxLength(1000)]]
    });
  }

  loadRecord(): void {
    if (!this.recordId) return;
    this.loading = true;
    this.error = null;
    this.taxRecordService.getTaxRecord(this.recordId).subscribe({
      next: (record) => {
        this.taxRecordForm.patchValue({
          recordTitle: record.recordTitle,
          taxYear: record.taxYear,
          incomeAmount: record.incomeAmount,
          deductionsAmount: record.deductionsAmount,
          notes: record.notes || ''
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = `Failed to load record: ${error}`;
        this.loading = false;
        console.error('Error loading tax record:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.taxRecordForm.invalid) {
      this.markFormGroupTouched();
      return;
    }
    this.submitting = false;
    this.error = null;
    const formValue = this.taxRecordForm.value;
    if (this.isEditMode && this.recordId) {
      const updateData: UpdateTaxRecord = {
        recordTitle: formValue.recordTitle,
        taxYear: formValue.taxYear,
        incomeAmount: formValue.incomeAmount,
        deductionsAmount: formValue.deductionsAmount,
        notes: formValue.notes || null
      };
      this.taxRecordService.updateTaxRecord(this.recordId, updateData).subscribe({
        next: () => {
          this.router.navigate(['/tax-record']);
        },
        error: (error) => {
          this.error = `Failed to update record: ${error}`;
          this.submitting = false;
          console.error('Error updating tax record:', error);
        }
      });
    } else {
      const createData: CreateTaxRecord = {
        recordTitle: formValue.recordTitle,
        taxYear: formValue.taxYear,
        incomeAmount: formValue.incomeAmount,
        deductionsAmount: formValue.deductionsAmount,
        notes: formValue.notes || null
      };
      this.taxRecordService.createTaxRecord(createData)
      .pipe(finalize(() => this.submitting = false))
      .subscribe({
        next: () => {
          this.router.navigate(['/tax-record']);
          console.log("works fine");
        },
        error: (error) => {
          this.error = `Failed to create record: ${error}`;
          this.submitting = false;
          console.error('Error creating tax record:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tax-record']);
  }

  onReset(): void {
    if (this.isEditMode) {
      this.loadRecord();
    } else {
      this.taxRecordForm.reset();
      const currentYear = new Date().getFullYear();
      this.taxRecordForm.patchValue({
        taxYear: currentYear,
        incomeAmount: 0,
        deductionsAmount: 0
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.taxRecordForm.controls).forEach(key => {
      const control = this.taxRecordForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access in template
  get recordTitle() { return this.taxRecordForm.get('recordTitle'); }
  get taxYear() { return this.taxRecordForm.get('taxYear'); }
  get incomeAmount() { return this.taxRecordForm.get('incomeAmount'); }
  get deductionsAmount() { return this.taxRecordForm.get('deductionsAmount'); }
  get notes() { return this.taxRecordForm.get('notes'); }

  get netIncome(): number {
    const income = this.taxRecordForm.get('incomeAmount')?.value || 0;
    const deductions = this.taxRecordForm.get('deductionsAmount')?.value || 0;
    return income - deductions;
  }

  get formTitle(): string {
    return this.isEditMode ? 'Edit Tax Record' : 'Add New Tax Record';
  }

  get submitButtonText(): string {
    if (this.submitting) {
      return this.isEditMode ? 'Updating...' : 'Creating...';
    }
    return this.isEditMode ? 'Update Record' : 'Create Record';
  }
}
