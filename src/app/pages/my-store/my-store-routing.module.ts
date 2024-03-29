import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStorePage } from './my-store.page';

const routes: Routes = [
  {
    path: '',
    component: MyStorePage
  },
  {
    path: 'new',
    loadChildren: () => import('./my-store-new/my-store-new.module').then( m => m.MyStoreNewPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./my-store-detail/my-store-detail.module').then( m => m.MyStoreDetailPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./my-store-config/my-store-config.module').then( m => m.MyStoreConfigPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStorePageRoutingModule {}
