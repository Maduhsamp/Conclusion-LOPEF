import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login/login.component';
import { HomepageComponent } from './view/home/homepage/homepage.component';
import { AuthGuard } from './model/services/auth.guard';
import { SettingsComponent } from './view/home/settings/settings.component';
import { StartComponent } from './view/home/start/start/start.component';
import { CriarrelatorioComponent } from './view/home/relatorios/criarrelatorio/criarrelatorio.component';
import { ReportsComponent } from './view/home/reports/reports.component';
import { EditarrelatoriosComponent } from './view/home/relatorios/editarrelatorios/editarrelatorios.component';
import { EmailComponent } from './view/home/email/email.component';

const routes: Routes = [
    {
      path: '',
      component: LoginComponent,
    },
    {
      path: 'dashboard',
      component: StartComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'relatorios',
      component: ReportsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'configuracoes',
      component: SettingsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'criarrelatorio',
      component: CriarrelatorioComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'editarrelatorio',
      component: EditarrelatoriosComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'bugs',
      component: EmailComponent,
      canActivate: [AuthGuard],
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
