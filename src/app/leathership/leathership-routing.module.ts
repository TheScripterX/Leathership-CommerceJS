import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SinglePageProductComponent } from './pages/single-page-product/single-page-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomepageComponent, pathMatch: 'full' },
      { path: 'product-detail/:id', component: SinglePageProductComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeathershipRoutingModule {}
