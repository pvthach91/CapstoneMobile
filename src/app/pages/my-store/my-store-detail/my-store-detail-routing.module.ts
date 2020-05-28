import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreDetailPage } from './my-store-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreDetailPage
  },
  {
    path: 'comment/:id',
    loadChildren: () => import('./my-store-detail-comment/my-store-detail-comment.module').then( m => m.MyStoreDetailCommentPageModule)
  },
  {
    path: 'rate/:id',
    loadChildren: () => import('./my-store-detail-rate/my-store-detail-rate.module').then( m => m.MyStoreDetailRatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreDetailPageRoutingModule {}
