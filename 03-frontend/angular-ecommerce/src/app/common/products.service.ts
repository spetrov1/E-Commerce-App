import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

interface GetResponse {
    _embedded: any;
}

@Injectable({providedIn: 'root'})
export class ProductsService {

    readonly baseUrl = "http://localhost:8080/api";

    constructor(private httpClient: HttpClient) {}

    getProductsByCategoryId(categoryId: number) {
        const url = this.baseUrl + "/products/search/findByCategoryId?id=";
        return this.httpClient.get<GetResponse>(url + categoryId).pipe( 
            map( (response: GetResponse) => response._embedded.products)
        );
    }

    getCategories() {
        const url = this.baseUrl + "/product-categories";
        return this.httpClient.get<GetResponse>(url).pipe(
            map( (response: GetResponse) => response._embedded.productCategories)
        );
    }

    getProductsByNameContaining(name: string) {
        const url = this.baseUrl + "/products/search/findByNameContaining?name=" + name;
        return this.httpClient.get<GetResponse>(url).pipe(
            map( (response: GetResponse) => response._embedded.products)
        );
    }

}