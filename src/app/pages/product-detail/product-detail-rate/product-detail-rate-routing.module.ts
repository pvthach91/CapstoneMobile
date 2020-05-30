import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailRatePage } from './product-detail-rate.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRatePageRoutingModule {}
