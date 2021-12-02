import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { Product } from "./product";

interface GetResponse {
    _embedded: {
        products: Product[]
    };
}

@Injectable({providedIn: 'root'})
export class ProductsService {

    readonly apiUrl = "http://localhost:8080/api/products";

    constructor(private httpClient: HttpClient) {}

    getProducts() {
        // TODO change response's type
        return this.httpClient.get<GetResponse>(this.apiUrl).pipe( 
            map( (response: GetResponse) => response._embedded)
        );
    }

}