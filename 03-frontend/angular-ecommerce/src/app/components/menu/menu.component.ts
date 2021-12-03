import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductsService } from 'src/app/common/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  categories!: ProductCategory[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(
      (categories: ProductCategory[]) => {
        this.categories = categories;
      }
    );
  }

}
