import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { GetResponse } from '../common/products.service';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  readonly countriesUrl = "http://localhost:8080/api/countries";
  readonly searchStatesUrl = "http://localhost:8080/api/states/search";

  constructor(private httpClient: HttpClient) { }

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

  getAllCountries() {
    return this.httpClient.get<GetResponse>(this.countriesUrl).pipe(
      map((response: GetResponse) => response._embedded.countries)
    );
  }

  getAllStatesByCountryCode(codeValue: string) {
    const url = this.searchStatesUrl + "/findByCountryCode";
    return this.httpClient.get<GetResponse>(
      url, 
      {params: new HttpParams().append("code", codeValue)}
      ).pipe(
        map((response: GetResponse) => response._embedded.states)
      );
  }

}
