import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepositoreisPageRoutingModule } from './repositoreis-routing.module';

import { RepositoreisPage } from './repositoreis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepositoreisPageRoutingModule
  ],
  declarations: [RepositoreisPage]
})
export class RepositoreisPageModule {}
