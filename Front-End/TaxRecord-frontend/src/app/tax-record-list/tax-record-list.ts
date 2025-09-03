import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxRecordService } from '../taxrecord-service';
import { TaxRecord } from './tax-record.model';

@Component({
  selector: 'app-tax-record-list',
  templateUrl: './tax-record-list.component.html',
  styleUrls: ['./tax-record-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, SlicePipe]
})
export class TaxRecordListComponent {
  taxRecords: TaxRecord[] = [];
  loading = false;
  error: string | null = null;
  searchTerm = '';
  selectedYear: number | null = null;
  sortBy: 'taxYear' | 'incomeAmount' | 'recordTitle' = 'taxYear';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private taxRecordService: TaxRecordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTaxRecords();
  }

  loadTaxRecords(): void {
    this.loading = true;
    this.error = null;
    
    this.taxRecordService.getTaxRecords().subscribe({
      next: (records: TaxRecord[]) => {
        this.taxRecords = records;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = error;
        this.loading = false;
        console.error('Error loading tax records:', error);
      }
    });
  }

  get filteredAndSortedRecords(): TaxRecord[] {
    let filtered = this.taxRecords;

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(record =>
        record.recordTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply year filter
    if (this.selectedYear) {
      filtered = filtered.filter(record => record.taxYear === this.selectedYear);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (this.sortBy) {
        case 'taxYear':
          aValue = a.taxYear;
          bValue = b.taxYear;
          break;
        case 'incomeAmount':
          aValue = a.incomeAmount;
          bValue = b.incomeAmount;
          break;
        case 'recordTitle':
          aValue = a.recordTitle.toLowerCase();
          bValue = b.recordTitle.toLowerCase();
          break;
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  get availableYears(): number[] {
    const years = [...new Set(this.taxRecords.map(record => record.taxYear))];
    return years.sort((a, b) => b - a);
  }

  onSort(field: 'taxYear' | 'incomeAmount' | 'recordTitle'): void {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
  }

  onEdit(id: number): void {
    this.router.navigate(['/tax-record/edit', id]);
  }

  onDelete(id: number, recordTitle: string): void {
    if (confirm(`Are you sure you want to delete "${recordTitle}"?`)) {
      this.taxRecordService.deleteTaxRecord(id).subscribe({
        next: () => {
          this.loadTaxRecords(); // Reload the list
        },
        error: (error: any) => {
          this.error = `Failed to delete record: ${error}`;
          console.error('Error deleting tax record:', error);
        }
      });
    }
  }

  onAdd(): void {
    this.router.navigate(['/tax-record/edit/:id']);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedYear = null;
  }

  calculateNetIncome(record: TaxRecord): number {
    return record.incomeAmount - record.deductionsAmount;
  }
}