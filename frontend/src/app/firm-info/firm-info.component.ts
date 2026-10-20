import { Component, OnInit, ViewChild } from '@angular/core';
import { FirmService } from '../services/firm.service';
import { Firm, Service } from '../models/firm';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Booking } from '../models/booking';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-firm-info',
  templateUrl: './firm-info.component.html',
  styleUrls: ['./firm-info.component.css']
})
export class FirmInfoComponent implements OnInit {

  @ViewChild('stepper') private stepper!: MatStepper;

  firm: Firm = new Firm();
  user: User = new User();
  errorMessage: string = '';

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  selectedType!: string;
  logged!: string | null;
  firmName!: string | null;

  newBooking: Booking = new Booking();

  constructor(private _formBuilder: FormBuilder, private firmService: FirmService, private bookingService: BookingService, private userService: UserService) { }

  ngOnInit(): void {
    this.logged = localStorage.getItem('logged');
    this.firmName = localStorage.getItem('selectedFirm');
    if (this.firmName && this.logged){
      this.firmService.getFirmByName(this.firmName).subscribe(
        (firm) => {
          this.firm = firm;
          this.populateServices();
        });
      this.userService.getUserByUsername(this.logged).subscribe(
        (user) => {
          this.user = user;
        });
    }

    this.firstFormGroup = this._formBuilder.group({
      area: ['', Validators.required],
      dateTime: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      gardenPool: ['', Validators.required],
      gardenGreen: ['', Validators.required],
      gardenFurniture: ['', Validators.required]
    });

    // Inicijalno kreiranje `thirdFormGroup` bez `FormArray` za `services`
    this.thirdFormGroup = this._formBuilder.group({
      fountain: ['', Validators.required],
      gardenGreen: ['', Validators.required],
      tablesCount: ['', Validators.required],
      chairsCount: ['', Validators.required],
      description: [''],
      services: this._formBuilder.array([]) // Prazan FormArray inicijalno
    });

    this.firstFormGroup.get('type')?.valueChanges.subscribe(value => {
      this.selectedType = value;
      this.manageSteps();
    });
  }

  manageSteps(): void {
    const selectedType = this.firstFormGroup.get('type')?.value;
  
    if (selectedType === 'restaurant') {
      // Preskoči drugi korak tako što ćemo ga ukloniti iz DOM-a
      this.stepper.selectedIndex = 2;
    } else {
      this.stepper.selectedIndex = 3;
    }
  }

  createBooking(): void {
    if (this.logged && this.firmName){
      this.newBooking.username = this.logged; 
      this.newBooking.firmname = this.firm.name; 
    }
    this.newBooking.dateTime = new Date(this.firstFormGroup.value.dateTime);
    this.newBooking.area = Number(this.firstFormGroup.value.area);
    this.newBooking.type = this.firstFormGroup.value.type;
    this.newBooking.bookingDate = new Date();
    if (this.selectedType === 'private'){
      this.newBooking.gardenPool = Number(this.secondFormGroup.value.gardenPool);
      this.newBooking.gardenGreen = Number(this.secondFormGroup.value.gardenGreen);
      this.newBooking.gardenFurniture = Number(this.secondFormGroup.value.gardenFurniture);
    } else {
      this.newBooking.fountain = Number(this.thirdFormGroup.value.fountain);
      this.newBooking.gardenGreen = Number(this.thirdFormGroup.value.gardenGreen);
      this.newBooking.tablesCount = Number(this.thirdFormGroup.value.tablesCount);
      this.newBooking.chairsCount = Number(this.thirdFormGroup.value.chairsCount);
      this.newBooking.description = this.thirdFormGroup.value.description;
      this.newBooking.services = this.selectedServices;
    }

    let bookingTime = new Date(this.newBooking.dateTime);
    let bookingHours = bookingTime.getHours();
    let bookingMinutes = bookingTime.getMinutes();

    let startHour = 8;
    let endHour = 17;

    let sumAreaPrivate = 0;
    let sumAreaRestaurant = 0;
    if (this.newBooking.gardenPool && this.newBooking.gardenGreen && this.newBooking.gardenFurniture){
      sumAreaPrivate = this.newBooking.gardenPool + this.newBooking.gardenGreen + this.newBooking.gardenFurniture;
    }
    if (this.newBooking.fountain && this.newBooking.gardenGreen){
      sumAreaRestaurant = this.newBooking.fountain + this.newBooking.gardenGreen;
    }
    let date1 = new Date(this.firm.vacationFrom);
    let date2 = new Date(this.firm.vacationTo);

    if (this.newBooking.dateTime >= date1 && this.newBooking.dateTime <= date2){
      alert("Firma je u ovom periodu na odmoru i ne mozemo zakazati uredjivanje za ovaj datum.")
    }  else if (bookingHours < startHour || (bookingHours === startHour && bookingMinutes < 0) || bookingHours >= endHour) {
      alert("Zakazivanje se može izvršiti samo u periodu od 8:00 do 17:00.");
    } else if (this.newBooking.type === 'private' && sumAreaPrivate>this.newBooking.area || this.newBooking.type === 'restaurant' && sumAreaRestaurant > this.newBooking.area){
      alert('Povrsine koje ste uneli se ne poklapaju! Pokusajte ponovo.')
    } else {
          this.bookingService.addBooking(this.newBooking).subscribe(
      data=>{
        if(data.message=="ok") alert("Uređivanje je zakazano!")
      }
    );
    }
  }

  populateServices() {
    if (this.firm && this.firm.services) {
      const servicesArray = this.thirdFormGroup.get('services') as FormArray;
      this.firm.services.forEach(service => {
        const control = new FormControl(false); // podrazumevano je false
        servicesArray.push(control);
      });
    }
  }

  get selectedServices(): Service[] {
    const selectedServicesIndices = this.thirdFormGroup.value.services
      .map((checked: boolean, i: number) => checked ? i : null)
      .filter((i: number | null) => i !== null);
    
    return selectedServicesIndices.map((i: number) => this.firm.services[i]);
  }

  get servicesFormArray() {
    return this.thirdFormGroup.get('services') as FormArray;
  }

  goToNextStep(): void {
    const selectedType = this.firstFormGroup.get('type')?.value;
  
    if (selectedType === 'private') {
      this.stepper.next();
    } else if (selectedType === 'restaurant') {
      this.stepper.next(); // Idemo na sledeći korak
    }
  }

  resetPage() {
    location.reload();
  }

}
