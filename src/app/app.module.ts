import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login/login.component';
import { environments } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './model/services/auth.service';
import { HomepageComponent } from './view/home/homepage/homepage.component';
import { SettingsComponent } from './view/home/settings/settings.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './view/home/start/start/start.component';
import { CriarrelatorioComponent } from './view/home/relatorios/criarrelatorio/criarrelatorio.component';
import { ReportsComponent } from './view/home/reports/reports.component';
import { EditarrelatoriosComponent } from './view/home/relatorios/editarrelatorios/editarrelatorios.component';
import { NgToastModule } from 'ng-angular-popup';
import { EmailComponent } from './view/home/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    ReportsComponent,
    SettingsComponent,
    StartComponent,
    CriarrelatorioComponent,
    EditarrelatoriosComponent,
    EmailComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environments.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ToastModule,
    TableModule,
    FileUploadModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    NgToastModule
  ],
  providers: [AuthService, { provide: FIREBASE_OPTIONS, useValue: environments.firebase}, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
