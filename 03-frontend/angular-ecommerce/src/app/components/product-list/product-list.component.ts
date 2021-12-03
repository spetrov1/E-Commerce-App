import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from "rxjs/operators";

import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/common/products.service';

interface Response {
  products: Product[]
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products!: Product[];
  subscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        let id: any = params.get('id');
        if (!id) {
          id = 1;
        } else {
          id = +id;
        }

        this.productsService.getProducts(id).subscribe(
          (response: Response) => { 
            this.products = response.products; 
          }
        )
      }
    )
    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  

}
