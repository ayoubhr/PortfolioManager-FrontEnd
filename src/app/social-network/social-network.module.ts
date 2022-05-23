import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialNetworkRoutingModule } from './social-network-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { FormsModule } from '@angular/forms';
import { MystoriesComponent } from './mystories/mystories.component';
import { AddPortfolioComponent } from './add-portfolio/add-portfolio.component';
import { ModalComponent } from './add-portfolio/modal/modal.component';
import { TransactionComponent } from './add-portfolio/transaction/transaction.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MystoriesComponent,
    AddPortfolioComponent,
    ModalComponent,
    TransactionComponent,
  ],
  imports: [
    CommonModule,
    SocialNetworkRoutingModule,
    FormsModule,
  ]
})
export class SocialNetworkModule { }
