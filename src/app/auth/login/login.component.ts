import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  loginCorporate(): void {
    this.authService.login('Carlos Mendoza');
  }

  loginDevMode(): void {
    this.authService.login('Validador de prueba');
  }
}
