import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomepageComponent, pathMatch: 'full' },
      { path: 'product-detail/:id', component: SinglePageProductComponent },
      { path: 'collections', component: ProductsPageComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeathershipRoutingModule {}
