import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoreDetailCommentPage } from './my-store-detail-comment.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoreDetailCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreDetailCommentPageRoutingModule {}
