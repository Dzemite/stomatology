import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnkoComponent } from './components/onko/onko.component';
import { PatientsRouteComponent } from './components/onko/patients-route/patients-route.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialLibsModule } from './modules/material-libs/material-libs.module';
import { Icons } from './icons.module';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from './constants/app-config.constant';
import { APP_SETTINGS } from './app.settings';
import { TooltipComponent } from './components/onko/tooltip/tooltip.component';
import { TooltipTriggerDirective } from './components/onko/tooltip/tooltip-trigger.directive';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { FilterByDatePipe } from './pipes/filter-by-date.pipe';
import { FilterMenuTriggerDirective } from './components/onko/filter-menu/filter-menu-trigger.directive';
import { FilterMenuComponent } from './components/onko/filter-menu/filter-menu.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { DateAdapter as AppDateAdapter } from './classes/date-adapter';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { ReportListComponent } from './components/report/report-list/report-list.component';
import { ReportComponent } from './components/report/report.component';
import { EventBrokerService } from './services/event-brocker.service';
import { KpiService } from './services/kpi.service';
import { CaseService } from './services/case.service';
import { ConstantsService } from './services/constants.service';
import { CrudService } from './services/crud.service';
import { PatientService } from './services/patient.service';
import { PatientsService } from './services/patients.service';
import { PreloadersService } from './services/preloaders.service';
import { GlobalPreloaderComponent } from './components/global-preloader/global-preloader.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    OnkoComponent,
    PatientsRouteComponent,
    HeaderComponent,
    FooterComponent,
    TooltipComponent,
    PatientsListComponent,
    ReportListComponent,
    ReportComponent,
    TooltipTriggerDirective,
    FilterMenuTriggerDirective,
    FilterMenuComponent,
    FilterByCategoryPipe,
    FilterByDatePipe,
    FilterByNamePipe,
    GlobalPreloaderComponent
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
