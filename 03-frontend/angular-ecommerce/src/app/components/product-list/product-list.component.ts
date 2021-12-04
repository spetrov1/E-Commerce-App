import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/common/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products!: Product[];
  searchMode!: boolean;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 100;


  subscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe(
      () => this.listProducts()
    );
    
  }

  listProducts() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } 
    else {
      const searchByCategory = this.activatedRoute.snapshot.paramMap.has('id');

      if (searchByCategory) {
        this.handleListProductsByCategory();
      } else {
        this.listAllProducts();
      }
    }
  }

  listAllProducts() {
    this.productsService.getAllProducts(this.thePageNumber - 1, this.thePageSize).subscribe(
      (products: Product[]) => this.products = products
    )
  }

  handleSearchProducts() {
    const keyword = this.activatedRoute.snapshot.paramMap.get('keyword');
    if (keyword) {
      this.productsService.getProductsByNameContaining(keyword, this.thePageNumber - 1, this.thePageSize)
        .subscribe((products: Product[]) => {
          this.products = products;
        }
      );
    }
  }

  handleListProductsByCategory() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductsByCategoryId(+id, this.thePageNumber - 1, this.thePageSize)
        .subscribe((response: Product[]) => { 
          this.products = response; 
        }
      );
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  

}
