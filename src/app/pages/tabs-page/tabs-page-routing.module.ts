import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../checkout/checkout.module').then( m => m.CheckoutPageModule)
      },
      {
        path: 'my-store',
        loadChildren: () => import('../my-store/my-store.module').then( m => m.MyStorePageModule)
      },
      {
        path: '',
        redirectTo: '/app-tab/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

