import { Routes } from '@angular/router';
import { TaxRecordListComponent } from './tax-record-list/tax-record-list';
import { TaxRecordFormComponent } from './tax-record-form/tax-record-form.component';

export const routes: Routes = [
    { path: 'tax-record', component: TaxRecordListComponent },
    { path: 'tax-record/edit/:id', component: TaxRecordFormComponent },
];
