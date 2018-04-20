import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ChartModule } from 'primeng/chart';
import { GrowlModule } from 'primeng/components/growl/growl';
import { TextMaskModule } from 'angular2-text-mask';
import { LoadersCssModule } from 'angular2-loaders-css';
import { appRoutes } from './app.route';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LigacoesService } from './services/ligacoes.service';
import { CombosService } from './services/combos.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    ChartModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    TextMaskModule,
    LoadersCssModule
  ],
  providers: [
    CombosService,
    LigacoesService
  ],
  exports: [
    ChartModule,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
