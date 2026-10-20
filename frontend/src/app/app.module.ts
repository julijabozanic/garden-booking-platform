import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { OwnerComponent } from './owner/owner.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { AdministratorLoginComponent } from './administrator-login/administrator-login.component';
import { PasswordNewComponent } from './password-new/password-new.component';
import { ProfileComponent } from './profile/profile.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FirmComponent } from './firm/firm.component';
import { FirmInfoComponent } from './firm-info/firm-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingComponent } from './booking/booking.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdministratorComponent,
    OwnerComponent,
    DecoratorComponent,
    AdministratorLoginComponent,
    PasswordNewComponent,
    ProfileComponent,
    MaintenanceComponent,
    StatisticsComponent,
    FirmComponent,
    FirmInfoComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
