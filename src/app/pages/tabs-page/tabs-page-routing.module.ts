import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        children: [
          {
            path: '',
            component: SchedulePage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      {
        path: 'speakers',
        children: [
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },
          {
            path: 'speaker-details/:speakerId',
            loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then(m => m.MapModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: '',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  {
    path: 'support',
    children: [
      {
        path: '',
        loadChildren: () => import('../support/support.module').then(m => m.SupportModule)
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: 'signup',
    children: [
      {
        path: '',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignUpModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

