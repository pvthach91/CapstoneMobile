import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailCommentPage } from './product-detail-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailCommentPageRoutingModule {}
