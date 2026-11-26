import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DocumentsService } from '../../services/documents.service';
import {
  ActaRecord,
  ActaStatus,
  ActaVersionSnapshot,
} from '../../models/document.model';

type FilterTab = 'TODAS' | ActaStatus;

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent {
  readonly authService = inject(AuthService);
  readonly documentsService = inject(DocumentsService);

  @ViewChild('signatureCanvas') signatureCanvas?: ElementRef<HTMLCanvasElement>;

  searchTerm = signal('');
  activeFilter = signal<FilterTab>('POR_VALIDAR');

  // Modal Revisar PDF
  pdfModalOpen = signal(false);
  selectedActaId = signal<string | null>(null);
  selectedVersionNumber = signal<number | null>(null);

  observationInput = signal('');
  observationError = signal('');

  // Modal Firmar (Canvas)
  signatureModalOpen = signal(false);
  signatureTargetActaId = signal<string | null>(null);
  isDrawing = signal(false);
  hasDrawnSignature = signal(false);
  signatureError = signal('');

  // Modal Subsanar
  remediationModalOpen = signal(false);
  remTitle = signal('');
  remLocation = signal('');
  remDescription = signal('');
  remFieldNotes = signal('');
  remNote = signal('');
  remNewEvidence = signal('');
  remSignCampo1 = signal(true);
  remSignCampo2 = signal(true);
  remError = signal('');

  readonly filteredActas = computed(() => {
    const filter = this.activeFilter();
    const query = this.searchTerm().trim().toLowerCase();

    return this.documentsService.actas().filter((acta) => {
      const matchesStatus = filter === 'TODAS' || acta.status === filter;
      if (!matchesStatus) return false;
      if (!query) return true;

      const latest = this.documentsService.getLatestSnapshot(acta);
      const versionStr = `v${acta.currentVersion}`;
      const allVersionsMatch = acta.versions.some((v) =>
        v.versionLabel.toLowerCase().includes(query)
      );

      return (
        acta.code.toLowerCase().includes(query) ||
        versionStr.includes(query) ||
        allVersionsMatch ||
        latest.data.title.toLowerCase().includes(query) ||
        latest.data.registrant.toLowerCase().includes(query) ||
        latest.data.location.toLowerCase().includes(query)
      );
    });
  });

  readonly selectedActa = computed<ActaRecord | null>(() => {
    const id = this.selectedActaId();
    if (!id) return null;
    return this.documentsService.actas().find((a) => a.id === id) ?? null;
  });

  readonly viewedSnapshot = computed<ActaVersionSnapshot | null>(() => {
    const acta = this.selectedActa();
    if (!acta) return null;
    const requestedVersion = this.selectedVersionNumber();
    if (requestedVersion !== null) {
      return (
        acta.versions.find((v) => v.version === requestedVersion) ??
        this.documentsService.getLatestSnapshot(acta)
      );
    }
    return this.documentsService.getLatestSnapshot(acta);
  });

  readonly isViewingHistorical = computed(() => {
    const acta = this.selectedActa();
    const snap = this.viewedSnapshot();
    if (!acta || !snap) return false;
    return snap.version !== acta.currentVersion;
  });

  readonly closeControlCheck = computed(() => {
    const acta = this.selectedActa();
    if (!acta) return { allowed: false, reasons: [] as string[] };
    return this.documentsService.canCloseActa(acta);
  });

  readonly signatureTargetActa = computed<ActaRecord | null>(() => {
    const id = this.signatureTargetActaId();
    if (!id) return null;
    return this.documentsService.actas().find((a) => a.id === id) ?? null;
  });

  setFilter(filter: FilterTab): void {
    this.activeFilter.set(filter);
  }

  openPdfModal(acta: ActaRecord): void {
    this.selectedActaId.set(acta.id);
    this.selectedVersionNumber.set(acta.currentVersion);
    this.observationInput.set('');
    this.observationError.set('');
    this.pdfModalOpen.set(true);
  }

  closePdfModal(): void {
    this.pdfModalOpen.set(false);
    this.observationInput.set('');
    this.observationError.set('');
  }

  selectVersion(version: number): void {
    this.selectedVersionNumber.set(version);
  }

  getLatestSnapshot(acta: ActaRecord): ActaVersionSnapshot {
    return this.documentsService.getLatestSnapshot(acta);
  }

  getSignedCount(acta: ActaRecord): number {
    const latest = this.documentsService.getLatestSnapshot(acta);
    let count = 0;
    if (latest.signatures.campo1.status === 'FIRMADO') count++;
    if (latest.signatures.campo2.status === 'FIRMADO') count++;
    if (latest.signatures.validador.status === 'FIRMADO') count++;
    return count;
  }

  isValidatorSigned(acta: ActaRecord): boolean {
    return this.getLatestSnapshot(acta).signatures.validador.status === 'FIRMADO';
  }

  canApproveActa(acta: ActaRecord): boolean {
    return acta.status === 'POR_VALIDAR' && this.getSignedCount(acta) === 3;
  }

  formatStatusLabel(status: ActaStatus): string {
    switch (status) {
      case 'POR_VALIDAR':
        return 'Por validar';
      case 'OBSERVADO':
        return 'Observado';
      case 'APROBADO':
        return 'Aprobado';
      case 'CERRADO':
        return 'Cerrado';
    }
  }

  // --- Pad de Firma (Canvas) ---
  openSignatureModal(acta: ActaRecord): void {
    if (acta.status !== 'POR_VALIDAR') return;
    this.signatureTargetActaId.set(acta.id);
    this.hasDrawnSignature.set(false);
    this.signatureError.set('');
    this.signatureModalOpen.set(true);
    setTimeout(() => this.initCanvas(), 0);
  }

  private initCanvas(): void {
    const canvas = this.signatureCanvas?.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 3);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.clearCanvas();
  }

  closeSignatureModal(): void {
    this.signatureModalOpen.set(false);
    this.isDrawing.set(false);
    this.signatureError.set('');
  }

  startDrawing(event: PointerEvent): void {
    event.preventDefault();
    const canvas = this.signatureCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.setPointerCapture) {
      canvas.setPointerCapture(event.pointerId);
    }
    const { x, y } = this.getCanvasPoint(canvas, event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1d2b53';
    this.isDrawing.set(true);
    this.signatureError.set('');
  }

  draw(event: PointerEvent): void {
    if (!this.isDrawing()) return;
    event.preventDefault();
    const canvas = this.signatureCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = this.getCanvasPoint(canvas, event);
    ctx.lineTo(x, y);
    ctx.stroke();
    this.hasDrawnSignature.set(true);
  }

  stopDrawing(event?: PointerEvent): void {
    if (!this.isDrawing()) return;
    const canvas = this.signatureCanvas?.nativeElement;
    if (canvas && event && canvas.hasPointerCapture && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    this.isDrawing.set(false);
  }

  clearCanvas(): void {
    const canvas = this.signatureCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    this.hasDrawnSignature.set(false);
    this.signatureError.set('');
  }

  saveSignature(): void {
    const acta = this.signatureTargetActa();
    const canvas = this.signatureCanvas?.nativeElement;
    if (!acta || !canvas) return;

    if (!this.hasDrawnSignature()) {
      this.signatureError.set('Dibuja tu firma en el recuadro antes de guardar.');
      return;
    }

    const dataUrl = canvas.toDataURL('image/png');
    const user = this.authService.currentUser();
    const validator = user?.fullName || 'Validador';
    const role = user?.role || 'Validador Interno';

    this.documentsService.signActaAsValidator(acta.id, validator, role, dataUrl);
    this.signatureModalOpen.set(false);
  }

  private getCanvasPoint(
    canvas: HTMLCanvasElement,
    event: PointerEvent
  ): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // --- Aprobar (requiere 3/3 firmas) ---
  onApproveActa(acta: ActaRecord, comment?: string): void {
    if (!this.canApproveActa(acta)) return;
    const validator = this.authService.currentUser()?.fullName || 'Validador';
    this.documentsService.approveActa(acta.id, validator, comment);
    this.observationInput.set('');
  }

  // --- Camino NO: Registrar observación y devolver ---
  onRegisterObservation(): void {
    const acta = this.selectedActa();
    if (!acta || acta.status !== 'POR_VALIDAR' || this.isViewingHistorical()) return;

    const reason = this.observationInput().trim();
    if (!reason) {
      this.observationError.set(
        'Debes ingresar el motivo detallado de la observación para devolver el acta.'
      );
      return;
    }

    const validator = this.authService.currentUser()?.fullName || 'Validador';
    this.observationError.set('');
    this.documentsService.registerObservation(acta.id, validator, reason);
    this.observationInput.set('');
  }

  // --- Modal Subsanación ---
  openRemediationModal(acta: ActaRecord): void {
    if (acta.status !== 'OBSERVADO') return;
    this.selectedActaId.set(acta.id);
    const latest = this.documentsService.getLatestSnapshot(acta);
    this.remTitle.set(latest.data.title);
    this.remLocation.set(latest.data.location);
    this.remDescription.set(latest.data.description);
    this.remFieldNotes.set(latest.data.fieldNotes);
    this.remNote.set('');
    this.remNewEvidence.set(`Evidencia_Subsanacion_v${acta.currentVersion + 1}.pdf`);
    this.remSignCampo1.set(true);
    this.remSignCampo2.set(true);
    this.remError.set('');
    this.remediationModalOpen.set(true);
  }

  closeRemediationModal(): void {
    this.remediationModalOpen.set(false);
    this.remError.set('');
  }

  submitRemediation(): void {
    const acta = this.selectedActa();
    if (!acta) return;

    if (!this.remNote().trim()) {
      this.remError.set('Describe brevemente qué se corrigió en esta subsanación.');
      return;
    }
    if (!this.remSignCampo1() || !this.remSignCampo2()) {
      this.remError.set(
        'Para enviar la nueva versión a validación deben registrarse las 2 firmas de campo.'
      );
      return;
    }

    const newVersion = this.documentsService.remediateActa(acta.id, {
      title: this.remTitle(),
      location: this.remLocation(),
      description: this.remDescription(),
      fieldNotes: this.remFieldNotes(),
      remediationNote: this.remNote(),
      resignCampo1: this.remSignCampo1(),
      resignCampo2: this.remSignCampo2(),
      newEvidenceName: this.remNewEvidence(),
    });

    this.remediationModalOpen.set(false);
    if (newVersion !== null) {
      this.selectedVersionNumber.set(newVersion);
      this.activeFilter.set('POR_VALIDAR');
    }
  }

  // --- Cierre de acta ---
  onCloseActa(acta: ActaRecord): void {
    if (!this.documentsService.canCloseActa(acta).allowed) return;
    const user = this.authService.currentUser()?.fullName || 'Validador';
    this.documentsService.closeActa(acta.id, user);
  }
}
