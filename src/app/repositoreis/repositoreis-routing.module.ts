import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositoreisPage } from './repositoreis.page';

const routes: Routes = [
  {
    path: '',
    component: RepositoreisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositoreisPageRoutingModule {}
