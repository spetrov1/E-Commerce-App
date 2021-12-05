import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductsService } from 'src/app/common/products.service';
import { CartService } from '../cart-status/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product = new Product();;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductById(+id).subscribe(
        (product: Product) => this.product = product
      );
    }
  }

  onAddToCart() {
    const cartItem = new CartItem(this.product);
    this.cartService.addItem(cartItem);
  }

}
