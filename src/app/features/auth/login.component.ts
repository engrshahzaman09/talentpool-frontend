import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { LoginRequest } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.storageService.setToken(response.data.accessToken);
          this.storageService.setUser(response.data);

          const role = response.data.role;
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else if (role === 'ROLE_HR') {
            this.router.navigate(['/hr']);
          } else {
            this.router.navigate(['/candidate']);
          }
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid email or password!';
      }
    });
  }
}