import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAttributes } from '../../models/user'; // Certifique-se de ter uma interface/modelo UserAttributes

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:4200/api/users'; // URL do seu backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserAttributes[]> {
    return this.http.get<UserAttributes[]>(this.apiUrl);
  }

  addUser(user: UserAttributes): Observable<UserAttributes> {
    return this.http.post<UserAttributes>(this.apiUrl, user);
  }

  updateUser(id: string, user: UserAttributes): Observable<UserAttributes> {
    return this.http.put<UserAttributes>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
