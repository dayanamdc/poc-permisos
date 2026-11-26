import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  readonly authService = inject(AuthService);
  readonly documentsService = inject(DocumentsService);

  sidebarCollapsed = signal(false);
  mobileMenuOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((val) => !val);
    this.mobileMenuOpen.update((val) => !val);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }
}
