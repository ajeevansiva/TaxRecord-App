export interface TaxRecord {
  id?: number;
  recordTitle: string;
  taxYear: number;
  incomeAmount: number;
  deductionsAmount: number;
  notes?: string;
}
