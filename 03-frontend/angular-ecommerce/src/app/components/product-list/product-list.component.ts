import { Component, OnInit } from '@angular/core';
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
export class ProductListComponent implements OnInit {

  products!: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    // TODO change any type
    // TODO Use subscription to manage it
    this.productsService.getProducts().subscribe(
      (response: Response) => { 
        this.products = response.products; 
      }
    )
  }

  

}
