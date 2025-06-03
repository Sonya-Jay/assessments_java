import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UricaComponent } from './urica/urica-test/urica.component';
import { AimsComponent } from './aims/aims-test/aims.component';
import { UricaResultComponent } from './urica/urica-result/urica-result.component';
import { AimsResultComponent } from './aims/aims-result/aims-result.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AppComponent,
    HomeComponent,
    UricaComponent,
    AimsComponent,
    UricaResultComponent,
    AimsResultComponent
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
