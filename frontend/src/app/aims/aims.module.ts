import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UricaRoutingModule } from '../urica/urica-routing.module';
import { AimsRoutingModule } from './aims-routing.module';
import { FormsModule } from '@angular/forms';
import { AimsComponent } from './aims-test/aims.component';
import { UricaComponent } from '../urica/urica-test/urica.component';
import { AimsResultComponent } from './aims-result/aims-result.component';
import { UricaResultComponent } from '../urica/urica-result/urica-result.component';

@NgModule({
  declarations: [
    AimsComponent,
    AimsResultComponent,
    UricaComponent,
    UricaResultComponent,
  ],
  imports: [CommonModule, AimsRoutingModule, FormsModule, UricaRoutingModule],
  exports: [
    AimsComponent,
    AimsResultComponent,
    UricaComponent,
    UricaResultComponent,
  ],
})
export class AimsModule {}
export class UricaModule {}
