import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Product } from "./product";

export interface GetResponse {
    _embedded: any;

    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }
}

@Injectable({providedIn: 'root'})
export class ProductsService {

    readonly baseUrl = "http://localhost:8080/api";

    constructor(private httpClient: HttpClient) {}

    getProductsByCategoryId(categoryId: number, pageNumber: number, pageSize: number) {
        let url = this.baseUrl + "/products/search/findByCategoryId";
        const urlParameters = `?id=${categoryId}&page=${pageNumber}&size=${pageSize}`;
        url += urlParameters;
        
        return this.httpClient.get<GetResponse>(url);
    }

    getCategories() {
        const url = this.baseUrl + "/product-categories";
        return this.httpClient.get<GetResponse>(url).pipe(
            map( (response: GetResponse) => response._embedded.productCategories)
        );
    }

    getProductsByNameContaining(name: string, pageNumber: number, pageSize: number) {
        let url = this.baseUrl + "/products/search/findByNameContaining";
        const urlParameters = `?name=${name}&page=${pageNumber}&size=${pageSize}`;
        url += urlParameters;
        
        return this.httpClient.get<GetResponse>(url);
    }

    getProductById(id: number) {
        const url = `${this.baseUrl}/products/${id}`;
        return this.httpClient.get<Product>(url);
    }

    getAllProducts(pageNumber: number, pageSize: number) {
        let url = this.baseUrl + "/products";
        const urlParameters = `?page=${pageNumber}&size=${pageSize}`;
        url += urlParameters;

        return this.httpClient.get<GetResponse>(url);
    }

}