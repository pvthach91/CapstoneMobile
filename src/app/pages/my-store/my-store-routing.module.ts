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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStorePageRoutingModule {}
