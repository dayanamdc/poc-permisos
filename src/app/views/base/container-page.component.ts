import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopnavComponent } from '../../components/topnav/topnav.component';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-container-page',
  standalone: true,
  imports: [SidebarComponent, TopnavComponent],
  templateUrl: './container-page.component.html',
  styleUrl: './container-page.component.css',
})
export class ContainerPageComponent {
  readonly documentsService = inject(DocumentsService);
  mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((val) => !val);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
