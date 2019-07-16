import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StomComponent } from './components/stom/stom.component';
import { MaterialLibsModule } from './modules/material-libs/material-libs.module';
import { Icons } from './icons.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from './constants/app-config.constant';
import { APP_SETTINGS } from './app.settings';
import { TooltipComponent } from './components/stom/tooltip/tooltip.component';
import { TooltipTriggerDirective } from './components/stom/tooltip/tooltip-trigger.directive';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { FilterByDatePipe } from './pipes/filter-by-date.pipe';
import { FilterMenuTriggerDirective } from './components/stom/filter-menu/filter-menu-trigger.directive';
import { FilterMenuComponent } from './components/stom/filter-menu/filter-menu.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { DateAdapter as AppDateAdapter } from './classes/date-adapter';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { EventBrokerService } from './services/event-brocker.service';
import { KpiService } from './services/kpi.service';
import { CaseService } from './services/case.service';
import { ConstantsService } from './services/constants.service';
import { CrudService } from './services/crud.service';
import { PatientService } from './services/patient.service';
import { PatientsService } from './services/patients.service';
import { PreloadersService } from './services/preloaders.service';
import { GlobalPreloaderComponent } from './components/global-preloader/global-preloader.component';
import { HeaderComponent } from './components/stom/header/header.component';
import { FooterComponent } from './components/stom/footer/footer.component';
import { PatientsListComponent } from './components/stom/patients-list/patients-list.component';
import { PatientComponent } from './components/stom/patient/patient.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePatientComponent } from './components/stom/create/create-patient/create-patient.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    StomComponent,
    HeaderComponent,
    FooterComponent,
    TooltipComponent,
    PatientsListComponent,
    TooltipTriggerDirective,
    FilterMenuTriggerDirective,
    FilterMenuComponent,
    FilterByCategoryPipe,
    FilterByDatePipe,
    FilterByNamePipe,
    GlobalPreloaderComponent,
    PatientComponent,
    LoginComponent,
    CreatePatientComponent
  ],
  imports: [
    Icons,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialLibsModule,
    HttpClientModule,
  ],
  providers: [
    EventBrokerService,
    KpiService,
    CaseService,
    ConstantsService,
    CrudService,
    PatientService,
    PatientsService,
    PreloadersService,
    {
      provide: APP_CONFIG,
      useValue: APP_SETTINGS
    },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: AppDateAdapter
    }
  ],
  entryComponents: [
    TooltipComponent,
    FilterMenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
