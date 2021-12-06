import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getMonths(startMonth: number) {
    let months: number[] = [];
    for (let month = startMonth; month <= 12; ++month) {
      months.push(month);
    }

    return of(months);
  }

  getYears() {
    let years: number[] = [];

    const startYear = new Date().getFullYear();
    for (let year = startYear; year <= startYear + 10; ++year) {
      years.push(year);
    }

    return of(years);
  }

}
