import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from '../../user.service'; // Importa o UserService
import { UserAttributes } from '../../../../models/user';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink, 
    MatPaginatorModule, 
    MatTooltipModule,
    HttpClientModule
  ],
  templateUrl: './crud-list.component.html',
  styleUrl: './crud-list.component.scss'
})

export class CrudListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'specialty', 'crm', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource<UserAttributes>([]);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}