import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { InitialLoadingComponent } from './initial-loading.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { PopoverModule } from 'ng2-popover';
import { AppComponent } from './app.component';
import { ErrorListComponent } from './error-list/error-list.component';
import { DisabledDashboardComponent } from './disabled-dashboard/disabled-dashboard.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeuntil';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/zip';

const routes = RouterModule.forRoot([
  { path: '', pathMatch: 'full', component: InitialLoadingComponent },
  { path: 'resources', loadChildren: 'app/main/main.module#MainModule' },
  { path: 'landing', loadChildren: 'app/getting-started/getting-started.module#GettingStartedModule' },
  { path: 'try', loadChildren: 'app/try-landing/try-landing.module#TryLandingModule' }
]);

@NgModule(AppModule.moduleDefinition)
export class AppModule {
  static moduleDefinition = {
    declarations: [
      AppComponent,
      InitialLoadingComponent,
      ErrorListComponent,
      DisabledDashboardComponent,
    ],
    imports: [
      SharedModule.forRoot(),
      ReactiveFormsModule,
      BrowserModule,
      HttpModule,
      TranslateModule.forRoot(),
      PopoverModule,
      routes
    ],
    bootstrap: [AppComponent]
  };
}
