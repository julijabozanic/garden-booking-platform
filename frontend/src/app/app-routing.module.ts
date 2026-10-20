import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { OwnerComponent } from './owner/owner.component';
import { RegisterComponent } from './register/register.component';
import { ownerGuard } from './owner.guard';
import { DecoratorComponent } from './decorator/decorator.component';
import { decoratorGuard } from './decorator.guard';
import { AdministratorLoginComponent } from './administrator-login/administrator-login.component';
import { administratorGuard } from './administrator.guard';
import { PasswordNewComponent } from './password-new/password-new.component';
import { ProfileComponent } from './profile/profile.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FirmComponent } from './firm/firm.component';
import { FirmInfoComponent } from './firm-info/firm-info.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "administrator_login", component: AdministratorLoginComponent},
  {path: "administrator", component: AdministratorComponent, canActivate: [administratorGuard]},
  { path: "owner", component: OwnerComponent, canActivate: [ownerGuard], children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: "profile", component: ProfileComponent },
    { path: "booking", component: BookingComponent },
    { path: "maintenance", component: MaintenanceComponent },
    { path: "firm", component: FirmComponent },
  ]},
  {path: "decorator", component: DecoratorComponent, canActivate: [decoratorGuard], children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: "profile", component: ProfileComponent },
    { path: "booking", component: BookingComponent },
    { path: "maintenance", component: MaintenanceComponent },
    { path: "statistics", component: StatisticsComponent },
  ]},
  {path: "registration", component: RegisterComponent },
  {path: "password-new", component: PasswordNewComponent },
  {path: "firm-info", component: FirmInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
