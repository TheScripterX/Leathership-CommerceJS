import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomepageComponent, pathMatch: 'full' },
      { path: 'product-detail/:id', component: SinglePageProductComponent },
      { path: 'collections', component: ProductsPageComponent },
      { path: 'checkout/:id', component: CheckoutComponent },
      { path: 'invoice/:id', component: InvoiceComponent },
      { path: '**', redirectTo: '' },
    ],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeathershipRoutingModule {}
