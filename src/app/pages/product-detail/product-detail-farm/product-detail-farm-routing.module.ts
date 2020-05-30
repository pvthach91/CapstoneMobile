import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailFarmPage } from './product-detail-farm.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailFarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailFarmPageRoutingModule {}
