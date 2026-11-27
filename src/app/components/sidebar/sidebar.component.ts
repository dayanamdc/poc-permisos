import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActaFilterTab, DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly documentsService = inject(DocumentsService);

  @Input() mobileOpen = false;
  @Output() closeMobile = new EventEmitter<void>();

  selectSidebarFilter(filter: ActaFilterTab): void {
    this.documentsService.setFilterAndShowList(filter);
    this.closeMobile.emit();
  }
}
