import { Component, EventEmitter, Output, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css',
})
export class TopnavComponent {
  readonly authService = inject(AuthService);
  readonly documentsService = inject(DocumentsService);

  @Output() sidebarToggled = new EventEmitter<void>();

  readonly headerSubtitle = computed(() => {
    const selectedId = this.documentsService.selectedActaId();
    if (!selectedId) return 'Bandeja de revisión';
    const acta = this.documentsService.actas().find((a) => a.id === selectedId);
    return acta ? `Acta ${acta.code}` : 'Bandeja de revisión';
  });

  readonly userInitial = computed(() => {
    const name = this.authService.currentUser()?.fullName || 'V';
    return name.trim().charAt(0).toUpperCase();
  });

  toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
