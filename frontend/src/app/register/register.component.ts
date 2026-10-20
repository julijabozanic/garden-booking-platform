import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ForbiddenService } from '../services/forbidden.service';
import { ForbiddenCredentials } from '../models/forbidden';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('registerForm') form!: NgForm;
  @Input() title: string = 'Registracija novih vlasnika';

  profileImage: string | ArrayBuffer | null = null;
  defaultImage = 'assets/defaultP.jpg';

  genders: string[] = ['M', 'Ž'];
  selectedGender: string = this.genders[0];
  passwordError: string = '';
  emailError: string = '';
  usernameError: string = '';
  cardType: string | null = null;
  check: boolean = true;


  constructor(private forbiddenService: ForbiddenService, private userService: UserService, private http: HttpClient){}

  user: User = new User()

  ngOnInit() {
    this.loadDefaultImage();
  }

  register() {
    this.check = true;

    const usernameCheck$ = this.forbiddenService.getForbiddenByUsername(this.user.username);
    const emailCheck$ = this.forbiddenService.getForbiddenByEmail(this.user.email);

    forkJoin([usernameCheck$, emailCheck$]).subscribe(([usernameData, emailData]) => {
        if (usernameData.message === 'nadjeno') {
            alert('Nedozvoljeno korisnicko ime!');
            this.check = false;
        }

        if (emailData.message === 'nadjeno') {
            alert('Nedozvoljena email adresa!');
            this.check = false;
        }

        if (!this.form.valid) {
            alert('Molimo popunite sva polja.');
        } else if (this.usernameError !== '') {
            alert(this.usernameError);
        } else if (this.passwordError) {
            alert(this.passwordError);
        } else if (this.emailError !== '') {
            alert(this.emailError);
        } else if (this.cardType == null) {
            alert("Nepostojeca kartica!");
        } else if (this.check === true) {
          this.user.sex = this.selectedGender;
          if (this.title ==='Registracija novih vlasnika'){
            this.user.type = 'O';
          } else {
            this.user.type = 'D';
          }
            this.userService.registerRequest(this.user).subscribe(
                data => {
                  if (data.message === "ok") alert("Zahtev poslat!");
                }
            );
        }
    });
}

  loadDefaultImage() {
    this.http.get('assets/defaultP.jpg', { responseType: 'blob' }).subscribe((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.profileImage = reader.result as string;
        this.user.picture = this.profileImage;
      };
      reader.readAsDataURL(blob);
    });
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Provera tipa fajla (mora biti JPG ili PNG)
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        alert('Slika mora biti u JPG ili PNG formatu.');
        return;
      }
  
      // Provera veličine fajla (ne sme biti veća od 300 KB)
      if (file.size > 300 * 1024) {
        alert('Slika ne sme biti veća od 300 KB.');
        return;
      }
  
      try {
        // Provera dimenzija slike
        await this.validateImageDimensions(file);
        
        const reader = new FileReader();
        
        // Učitavanje fajla kao base64 string
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
  
          // Provera da li je profileImage tipa string
          if (typeof this.profileImage === 'string') {
            this.user.picture = this.profileImage;
          } else {
            this.user.picture = ''; // Podrazumevana vrednost ako nije string
          }
        };
  
        // Čitanje fajla kao Data URL
        reader.readAsDataURL(file);
        
      } catch (error) {
        alert(error); // Prikaz greške ako dimenzije slike nisu validne
      }
    }
    else {
      // Ako korisnik nije izabrao sliku, koristi se podrazumevana
      this.loadDefaultImage();
    }
  }
  

  validatePassword() {
    const password = this.user.password;
    const regex = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[@$!%*?&]).{6,10}$/;
    if (!regex.test(password)) {
      this.passwordError = 'Lozinka mora imati minimalno 6 i maksimalno 10 karaktera, bar jedno veliko slovo, bar tri mala slova, bar jedan broj i bar jedan specijalni karakter, i mora počinjati slovom.';
    } else {
      this.passwordError = '';
    }
  }

  validateEmail(){
    this.userService.getUserByEmail(this.user.email).subscribe(
      data=>{
        if(data==null) {
          this.emailError = '';
        }
        else {
          this.emailError = 'Postoji korisnik sa ovom email adresom.';
        }
      }
    )
  }

  validateUsername(){
    this.userService.getUserByUsername(this.user.username).subscribe(
      data=>{
        if(data==null) {
          this.usernameError = '';
        }
        else {
          this.usernameError = 'Postoji korisnik sa ovim korisnickim imenom.';
        }
      }
    )
  }

  validateCard(){
    const card = this.user.card.replace(/\s+/g, ''); // Remove spaces from card number
    let regex: RegExp;

    if (/^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/.test(card)) {
      this.cardType = 'assets/dina.png'; // Set the Diners Club icon path
    } else if (/^(51|52|53|54|55)\d{14}$/.test(card)) {
      this.cardType = 'assets/master.png'; // Set the MasterCard icon path
    } else if (/^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/.test(card)) {
      this.cardType = 'assets/visa.png'; // Set the Visa icon path
    } else {
      this.cardType = null; // No valid card type
    }
  }

  validateImageDimensions(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        const { width, height } = img;
        URL.revokeObjectURL(img.src);
  
        if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
          resolve(true);
        } else {
          reject('Dimenzije slike moraju biti između 100x100 px i 300x300 px.');
        }
      };
  
      img.onerror = () => {
        reject('Nevažeća slika.');
      };
    });
  }

}
