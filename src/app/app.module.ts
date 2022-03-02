import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { ModuleGroupComponent } from './components/module-group/module-group.component';
import { ModuleClassComponent } from './components/module-class/module-class.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ModuleGroupComponent,
    ModuleClassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
