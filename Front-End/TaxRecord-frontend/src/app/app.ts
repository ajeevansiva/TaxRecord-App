import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaxRecordFormComponent} from '../app/tax-record-form/tax-record-form.component';
import {TaxRecordListComponent} from '../app/tax-record-list/tax-record-list';


@Component({
  selector: 'app-root',
  imports: [TaxRecordFormComponent, TaxRecordListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TaxRecord-frontend');
}
