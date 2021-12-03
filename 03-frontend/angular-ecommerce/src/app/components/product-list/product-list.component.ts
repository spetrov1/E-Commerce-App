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
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword = this.activatedRoute.snapshot.paramMap.get('keyword');
    if (keyword) {
      this.productsService.getProductsByNameContaining(keyword).subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
    }
  }

  handleListProducts() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductsByCategoryId(+id).subscribe(
        (response: Product[]) => { 
          this.products = response; 
        }
      );
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  

}
