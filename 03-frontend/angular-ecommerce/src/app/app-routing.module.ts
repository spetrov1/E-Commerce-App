import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

const routes: Routes = [
    {path: 'checkout', component: CheckoutComponent},
    {path: 'cart-details', component: CartDetailsComponent},
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    {path: 'category/:id', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}