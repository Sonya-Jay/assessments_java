import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UricaComponent } from './urica/urica-test/urica.component';
import { AimsComponent } from './aims/aims-test/aims.component';
import { UricaResultComponent } from './urica/urica-result/urica-result.component';
import { AimsResultComponent } from './aims/aims-result/aims-result.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'urica', component: UricaComponent },
  { path: 'aims', component: AimsComponent },
  { path: 'urica/result/:userId', component: UricaResultComponent },
  { path: 'aims/result/:userId', component: AimsResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
