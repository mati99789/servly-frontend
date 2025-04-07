import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { 
  IonIcon, 
  IonAvatar, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonContent, 
  IonSearchbar, 
  IonSkeletonText, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent,
  IonHeader,
  IonToolbar,
  IonSpinner
} from "@ionic/angular/standalone";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/dtos/user';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe, NgIf, NgFor, FormsModule,
    IonLabel, IonItem, IonAvatar, IonIcon, IonList,
    IonContent, IonSearchbar, IonSkeletonText,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonHeader, IonToolbar, IonSpinner
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  
  private userService = inject(UserService);
  private currentPage = 0;
  
  users: User[] = [];
  hasMore = true;
  currentLetter = '';
  searchTerm = '';
  loading = false;

  constructor() {
    console.log('UsersComponent constructed');
  }
  
  ngOnInit() {
    console.log('Initializing UsersComponent');
    this.loadUsers().then(() => {
      console.log('Initial users loaded:', this.users);
    });
    
    // Subscribe to search term changes
    this.userService.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.users = [];
          this.currentPage = 0;
          this.hasMore = true;
        })
      )
      .subscribe(() => this.loadUsers());
  }

  async loadUsers(event?: any) {
    if (this.loading) return;
    this.loading = true;
    console.log('Loading users, page:', this.currentPage);

    try {
      const response = await this.userService.getUsers(this.currentPage, this.searchTerm).toPromise();
      console.log('Received response:', response);
      if (response) {
        this.users = this.currentPage === 0 ? response.users : [...this.users, ...response.users];
        this.hasMore = response.hasMore;
        this.currentPage++;
        console.log('Updated users:', this.users);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.loading = false;
      event?.target?.complete();
    }
  }

  onSearchChange(event: any) {
    const term = event.detail.value;
    this.searchTerm = term;
    this.userService.updateSearchTerm(term);
  }

  onScroll(event: any) {
    const detail = event.detail;
    const scrollTop = detail.scrollTop;
    const users = this.users;
    
    if (users.length > 0) {
      // Find the current visible user based on scroll position
      const itemHeight = 60; // Approximate height of each user item
      const visibleIndex = Math.floor(scrollTop / itemHeight);
      
      if (visibleIndex >= 0 && visibleIndex < users.length) {
        const currentUser = users[visibleIndex];
        const letter = currentUser.email[0].toUpperCase();
        if (letter !== this.currentLetter) {
          this.currentLetter = letter;
        }
      }
    }

    // Check if we need to load more users
    if (detail.scrollTop + detail.scrollHeight >= detail.contentHeight - 100) {
      if (this.hasMore && !this.loading) {
        this.loadUsers();
      }
    }
  }
}
