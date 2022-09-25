import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'user-list',
    loadChildren: () => import('../user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'repositoreis',
    loadChildren: () => import('../repositoreis/repositoreis.module').then( m => m.RepositoreisPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
