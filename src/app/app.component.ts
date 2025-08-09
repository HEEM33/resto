import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public router = inject(Router); 
  title = 'resto';

  constructor(private authService: AuthService) {}

  logout():void {
       Swal.fire({
            icon: 'info',
            title: 'Déconnexion',
            text: 'Vous allez quitté l\'application',
        });
        
        Swal.fire({
      title: 'Déconnexion',
      text: 'Vous allez quitté l\'application',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui"
}).then((result) => {
  if (result.isConfirmed) {
    this.authService.logout().subscribe(
      (response: any) => {
        console.log('You Logout', response);
        this.router.navigate(['/login']);
      }
    )
    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      text: "Déconnexion",
      icon: "success",
      timer: 1500
    });
  }
});
    
  }
}
