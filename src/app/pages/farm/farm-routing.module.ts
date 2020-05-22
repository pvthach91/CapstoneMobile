import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmPage } from './farm.page';

const routes: Routes = [
  {
    path: '',
    component: FarmPage
  },
  {
    path: 'new',
    loadChildren: () => import('./farm-new/farm-new.module').then( m => m.FarmNewPageModule)
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./farm-view/farm-view.module').then( m => m.FarmViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmPageRoutingModule {}
