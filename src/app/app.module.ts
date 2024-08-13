import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeBr, 'pt');
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environment/environment';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { HomeComponent } from './feature/home/home.component';
import { NewTaskDialogComponent } from './core/components/new-task-dialog/new-task-dialog.component';
import { DynamicDialogComponent } from './core/components/dynamic-dialog/dynamic-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    NewTaskDialogComponent,
    DynamicDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ConfirmPopupModule,
    CalendarModule,
    DialogModule,
    DynamicDialogModule,
    InputMaskModule,
    InputTextModule,
    MenubarModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt' },
    DialogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
