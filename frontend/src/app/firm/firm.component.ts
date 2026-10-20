import { Component, OnInit } from '@angular/core';
import { FirmService } from '../services/firm.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Firm } from '../models/firm';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.css']
})
export class FirmComponent implements OnInit {
  
  users: User[] = [];
  decorators: User[] = [];
  firms: Firm[] = [];
  filteredFirms: Firm[] = [];
  searchName: string = '';
  searchAddress: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private _formBuilder: FormBuilder, private userService: UserService, private firmService: FirmService, private router: Router){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.decorators = this.users.filter(user => user.type === 'D');
      },
      error => {
        console.error('Greška prilikom dohvatanja svih korisnika.', error);
      }
    );
    
    this.firmService.getAllFirms().subscribe(
      data => {
        this.firms = data;
        this.filteredFirms = this.firms;
      },
      (error) => {
        console.error('Greška prilikom dohvatanja svih firmi.', error);
      }
    );
    // this.loadJSONAndDraw();
  }

  onSearch(): void {
    this.filteredFirms = this.firms.filter(firm =>
      (this.searchName ? firm.name.toLowerCase().includes(this.searchName.toLowerCase()) : true) &&
      (this.searchAddress ? firm.address.toLowerCase().includes(this.searchAddress.toLowerCase()) : true)
    );
  }

  onSort(column: string): void {
    this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;
    this.filteredFirms.sort((a, b) => {
      const aValue = a[column as keyof Firm] as string;
      const bValue = b[column as keyof Firm] as string;
      return this.sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }

  navigateToFirm(firmName: string): void {
    localStorage.setItem('selectedFirm', firmName);
    this.router.navigate(['/firm-info']);
  }

  // loadJSONAndDraw(): void {
  //   // Putanja do vašeg JSON fajla
  //   const jsonUrl = 'assets/canvas.json';

  //   fetch(jsonUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.drawOnCanvas(data);
  //     })
  //     .catch(error => console.error('Error loading JSON:', error));
  // }

  // drawOnCanvas(data: any): void {
  //   const canvas = document.getElementById('jsonCanvas') as HTMLCanvasElement;
  //   const ctx = canvas.getContext('2d');

  //   if (ctx) {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     // Primer crtanja kruga na osnovu JSON podataka
  //     ctx.beginPath();
  //     ctx.arc(data.x, data.y, data.radius, 0, 2 * Math.PI);
  //     ctx.fillStyle = data.color;
  //     ctx.fill();
  //     ctx.stroke();
  //   }
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const jsonData = JSON.parse(e.target.result);
        this.drawCanvas(jsonData);
      };
      reader.readAsText(file);
    }
  }

  drawCanvas(jsonData: any) {
    const canvas = <HTMLCanvasElement>document.getElementById('jsonCanvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Brisanje prethodnog crteža

      jsonData.shapes.forEach((shape: any) => {
        ctx.fillStyle = shape.color;

        if (shape.type === 'rectangle') {
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === 'circle') {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    }
  }
}
