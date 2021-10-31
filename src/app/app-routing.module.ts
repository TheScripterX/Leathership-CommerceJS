import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./leathership/leathership.module').then(
        (m) => m.LeathershipModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./leathership/pages/cart/cart.module').then((m) => m.CartModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
