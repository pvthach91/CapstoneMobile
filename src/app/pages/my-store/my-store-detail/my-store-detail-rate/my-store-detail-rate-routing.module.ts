import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreDetailRatePage } from './my-store-detail-rate.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreDetailRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreDetailRatePageRoutingModule {}
