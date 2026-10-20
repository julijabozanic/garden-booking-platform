import { Component, OnInit } from '@angular/core';
import { FirmService } from '../services/firm.service';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Booking } from '../models/booking';
import { Chart, registerables } from 'chart.js';
import { Firm } from '../models/firm';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  user: User = new User();
  logged!: string | null;
  bookings: Booking[] = [];
  myBookings: Booking[] = [];
  firms: Firm[] = [];
  bookingsByMonth: number[] = Array(12).fill(0); // Početna vrednost 0 za svaki mesec
  averageBookingsByDay: number[] = Array(7).fill(0); // 7 dana u nedelji
  daysOfWeek: string[] = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];
  
  constructor(
    private firmService: FirmService, private bookingService: BookingService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.logged = localStorage.getItem('logged');
    if (this.logged) {
      this.userService.getUserByUsername(this.logged).subscribe(
        userData => {
          this.user = userData;
          
          this.firmService.getAllFirms().subscribe(
            firmsData => {
              this.firms = firmsData;
              this.bookingService.getAllBookings().subscribe(
                bookingsData => {
                  this.bookings = bookingsData;
                  this.myBookings = this.bookings.filter(booking => booking.decorator === this.logged);

                  // Računanje broja poslova po mesecima
                  this.myBookings.forEach(booking => {
                    const month = new Date(booking.dateTime).getMonth(); // Dobijanje meseca (0-11)
                    this.bookingsByMonth[month]++;
                  });

                  // Registrujte sve module pre kreiranja dijagrama
                  Chart.register(...registerables);

                  // Inicijalizacija dijagrama
                  this.createMonthlyChart();

                  this.firms.forEach(firm => {
                    this.createPieChart(firm);
                  });

                  // Filter bookings in the last 24 months
                  const now = new Date();
                  const pastDate = new Date();
                  pastDate.setMonth(now.getMonth() - 24);

                  const recentBookings = this.bookings.filter(booking => 
                    new Date(booking.dateTime) >= pastDate && new Date(booking.dateTime) <= now
                  );

                  // Calculate the number of bookings per day of the week
                  recentBookings.forEach(booking => {
                    const dayOfWeek = new Date(booking.dateTime).getDay(); // 0 (NED) to 6 (SUB)
                    this.averageBookingsByDay[dayOfWeek]++;
                  });

                  // Calculate the average per day by dividing by 24 months
                  this.averageBookingsByDay = this.averageBookingsByDay.map(total => total / 24);

                  // Register Chart.js modules
                  Chart.register(...registerables);

                  // Create the chart
                  this.createHistogram();
                },
                error => {
                  console.error('Greška prilikom dohvatanja svih zakazivanja.', error);
                }
              );
            },
            error => {
              console.error('Greška prilikom dohvatanja svih firmi.', error);
            }
          );
        },
        error => {
          console.error('Greška prilikom dohvatanja korisnika.', error);
        }
      );
    }
  }

  createMonthlyChart() {
    new Chart('bookingChart', {
      type: 'bar',
      data: {
        labels: [
          'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
          'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
        ],
        datasets: [{
          label: 'Broj zakazivanja',
          data: this.bookingsByMonth,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart(firm: Firm) {

    Chart.register(...registerables);

    const firmBookings = this.bookings.filter(booking => booking.firmname === firm.name);
    const decoratorCounts = firm.decorators.reduce((acc, decorator) => {
      const count = firmBookings.filter(booking => booking.decorator === decorator.username).length;
      acc[decorator.username] = count;
      return acc;
    }, {} as Record<string, number>);

    const totalBookings = Object.values(decoratorCounts).reduce((a, b) => a + b, 0);

    new Chart(`pieChart-${firm.name}`, {
      type: 'pie',
      data: {
        labels: Object.keys(decoratorCounts),
        datasets: [{
          label: `Distribucija poslova za firmu ${firm.name}`,
          data: Object.values(decoratorCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw as number;
                return `${label}: ${((value / totalBookings) * 100).toFixed(2)}% (${value})`;
              }
            }
          }
        }
      }
    });
  }


  createHistogram() {
    new Chart('histogramChart', {
      type: 'bar',
      data: {
        labels: this.daysOfWeek,
        datasets: [{
          label: 'Prosečan broj poslova po danu u nedelji',
          data: this.averageBookingsByDay,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
