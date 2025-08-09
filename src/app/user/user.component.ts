import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user',
  imports: [CommonModule, MatTableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
 displayedColumns: string[] = ['nom', 'email', 'date', 'actions'];
  dataSource = ELEMENT_DATA;
 

}
const ELEMENT_DATA = [
  {nom: 1, email: 'Hydrogen', date: '12'},
  {nom: 2, email: 'Helium', date: '12'},
  {nom: 3, email: 'Lithium', date: '12'},
]
