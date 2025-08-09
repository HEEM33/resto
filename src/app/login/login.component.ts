import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  message: string = '';

  private router = inject(Router);
  private authService = inject(AuthService);

  login():void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('You Login', response);
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: 'Bienvenue !',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/setup']);
      },
      (error: any) => {
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Échec de connexion',
          text: 'Veuillez vérifier vos identifiants.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }


}
