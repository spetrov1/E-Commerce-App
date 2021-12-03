import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { Product } from "./product";
import { ProductCategory } from "./product-category";

interface GetResponse {
    _embedded: any;
}

@Injectable({providedIn: 'root'})
export class ProductsService {

    readonly apiUrl = "http://localhost:8080/api/products/search/findByCategoryId?id=";

    constructor(private httpClient: HttpClient) {}

    getProductsByCategoryId(categoryId: number) {
        return this.httpClient.get<GetResponse>(this.apiUrl + categoryId).pipe( 
            map( (response: GetResponse) => response._embedded.products)
        );
    }

    getCategories() {
        return this.httpClient.get<GetResponse>("http://localhost:8080/api/product-categories").pipe(
            map( (response: GetResponse) => response._embedded.productCategories)
        );
    }

}