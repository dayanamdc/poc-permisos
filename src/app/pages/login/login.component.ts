import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  username = signal('');

  readonly demoUsers = ['Carlos Mendoza', 'Ana Torres', 'Roberto Díaz'];

  selectDemoUser(name: string): void {
    this.username.set(name);
  }

  onSubmit(): void {
    this.authService.login(this.username());
  }
}
