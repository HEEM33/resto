import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public router = inject(Router); 
  title = 'resto';
}
