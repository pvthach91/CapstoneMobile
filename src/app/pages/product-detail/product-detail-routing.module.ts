import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailPage } from './product-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailPage
  },
  {
    path: 'comment/:id',
    loadChildren: () => import('./product-detail-comment/product-detail-comment.module').then( m => m.ProductDetailCommentPageModule)
  },
  {
    path: 'rate/:id',
    loadChildren: () => import('./product-detail-rate/product-detail-rate.module').then( m => m.ProductDetailRatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailPageRoutingModule {}
