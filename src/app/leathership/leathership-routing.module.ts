import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { CartComponent } from './pages/cart/cart.component';
//
import { CollectionsResolveService } from './resolvers/collections-resolve.service';
import { ProductResolveService } from './resolvers/product-resolve.service';
import { CartResolveService } from './resolvers/cart-resolve.service';
import { CheckoutResolveService } from './resolvers/checkout-resolve.service';
import { InvoiceResolveService } from './resolvers/invoice-resolve.service';
import { CategoriesResolveService } from './resolvers/categories-resolve.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomepageComponent,
        pathMatch: 'full',
        resolve: {
          collections: CollectionsResolveService,
          categories: CategoriesResolveService,
        },
      },
      {
        path: 'product-detail/:id',
        component: SinglePageProductComponent,
        resolve: { product: ProductResolveService },
      },
      {
        path: 'collections',
        component: ProductsPageComponent,
        resolve: { collections: CollectionsResolveService },
      },
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        resolve: { checkout: CheckoutResolveService },
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent,
        resolve: { invoice: InvoiceResolveService },
      },
      {
        path: 'cart',
        component: CartComponent,
        resolve: { cart: CartResolveService },
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeathershipRoutingModule {}
