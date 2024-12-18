import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';


export const appConfig: ApplicationConfig = {
  providers: [  provideAnimations(), 
    provideToastr(),
    provideRouter(routes), provideClientHydration(), 
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule,ToastrModule ,BrowserAnimationsModule,NgxChartsModule )]
};
