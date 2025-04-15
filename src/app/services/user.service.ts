import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, map, of, delay } from 'rxjs';
import { User, Role } from '../dtos/user';

export interface UserListResponse {
  users: User[];
  hasMore: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pageSize = 10;
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  // Mock data
  private mockUsers: User[] = [
    { id: 1, email: 'alice.smith@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 2, email: 'bob.johnson@example.com', roles: [Role.ADMIN], password: '', refreshToken: { refreshToken: '' } },
    { id: 3, email: 'charlie.brown@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 4, email: 'david.wilson@example.com', roles: [Role.MAINTAINER], password: '', refreshToken: { refreshToken: '' } },
    { id: 5, email: 'emma.davis@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 6, email: 'frank.miller@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 7, email: 'grace.taylor@example.com', roles: [Role.ADMIN], password: '', refreshToken: { refreshToken: '' } },
    { id: 8, email: 'henry.anderson@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 9, email: 'isabel.white@example.com', roles: [Role.MAINTAINER], password: '', refreshToken: { refreshToken: '' } },
    { id: 10, email: 'jack.thomas@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 11, email: 'karen.martin@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 12, email: 'luke.clark@example.com', roles: [Role.ADMIN], password: '', refreshToken: { refreshToken: '' } },
    { id: 13, email: 'mary.rodriguez@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 14, email: 'nathan.lee@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 15, email: 'olivia.walker@example.com', roles: [Role.MAINTAINER], password: '', refreshToken: { refreshToken: '' } },
    { id: 16, email: 'peter.hall@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 17, email: 'quinn.young@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 18, email: 'rachel.king@example.com', roles: [Role.ADMIN], password: '', refreshToken: { refreshToken: '' } },
    { id: 19, email: 'steve.wright@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 20, email: 'tara.scott@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 21, email: 'uma.baker@example.com', roles: [Role.MAINTAINER], password: '', refreshToken: { refreshToken: '' } },
    { id: 22, email: 'victor.adams@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 23, email: 'wendy.nelson@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 24, email: 'xavier.carter@example.com', roles: [Role.ADMIN], password: '', refreshToken: { refreshToken: '' } },
    { id: 25, email: 'yolanda.hill@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } },
    { id: 26, email: 'zack.rivera@example.com', roles: [Role.USER], password: '', refreshToken: { refreshToken: '' } }
  ];

  constructor(private httpService: HttpService) {}

  getUsers(page: number, searchTerm: string = ''): Observable<UserListResponse> {
    // Filter users based on search term
    const filteredUsers = this.mockUsers
      .filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Calculate pagination
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    const paginatedUsers = filteredUsers.slice(start, end);
    
    // Simulate network delay
    return of({
      users: paginatedUsers,
      hasMore: end < filteredUsers.length,
      total: filteredUsers.length
    }).pipe(delay(2500)); 
  }

  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
} 