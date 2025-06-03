import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UricaRoutingModule } from './urica-routing.module';
import { UricaComponent } from './urica-test/urica.component';
import { UricaResultComponent } from './urica-result/urica-result.component';


@NgModule({
  declarations: [UricaComponent, UricaResultComponent],
  imports: [
    CommonModule,
    UricaRoutingModule,
    FormsModule
  ],
  exports: [UricaComponent, UricaResultComponent]
})
export class UricaModule { }
