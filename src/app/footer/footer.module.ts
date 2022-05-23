import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterBottomComponent } from './footer-bottom/footer-bottom.component';



@NgModule({
  declarations: [
    FooterBottomComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FooterBottomComponent]
})
export class FooterModule { }
