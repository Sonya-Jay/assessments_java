import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AimsRoutingModule } from './aims-routing.module';
import { FormsModule } from '@angular/forms';
import { AimsComponent } from './aims-test/aims.component';
import { AimsResultComponent } from './aims-result/aims-result.component';


@NgModule({
  declarations: [AimsComponent, AimsResultComponent],
  imports: [
    CommonModule,
    AimsRoutingModule,
    FormsModule
  ],
  exports: [AimsComponent, AimsResultComponent]
})
export class AimsModule { }
