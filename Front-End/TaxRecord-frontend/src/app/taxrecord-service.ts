import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TaxRecord {
  id: number;
  recordTitle: string;
  taxYear: number;
  incomeAmount: number;
  deductionsAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaxRecord {
  recordTitle: string;
  taxYear: number;
  incomeAmount: number;
  deductionsAmount: number;
  notes?: string;
}

export interface UpdateTaxRecord {
  recordTitle: string;
  taxYear: number;
  incomeAmount: number;
  deductionsAmount: number;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaxRecordService {
  private apiUrl = 'http://localhost:5097/api/TaxRecords'; // Adjust port as needed

  constructor(private http: HttpClient) { }

  getTaxRecords(): Observable<TaxRecord[]> {
    return this.http.get<TaxRecord[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getTaxRecord(id: number): Observable<TaxRecord> {
    return this.http.get<TaxRecord>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTaxRecord(record: CreateTaxRecord): Observable<TaxRecord> {
    return this.http.post<TaxRecord>(this.apiUrl, record)
      .pipe(catchError(this.handleError));
  }

  updateTaxRecord(id: number, record: UpdateTaxRecord): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, record)
      .pipe(catchError(this.handleError));
  }

  deleteTaxRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}