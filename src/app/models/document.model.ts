export type ActaStatus = 'POR_VALIDAR' | 'OBSERVADO' | 'APROBADO' | 'CERRADO';

export type ActaPriority = 'ALTA' | 'MEDIA' | 'BAJA';

export interface UserSession {
  username: string;
  fullName: string;
  role: string;
  area: string;
  loginTime: string;
}

export interface ActaSignature {
  id: 'campo1' | 'campo2' | 'validador';
  label: string;
  role: string;
  signerName: string;
  documentId?: string;
  signedAt?: string;
  signatureImage?: string;
  status: 'FIRMADO' | 'PENDIENTE';
}

export interface ActaEvidence {
  id: string;
  name: string;
  kind: 'FOTO' | 'ARCHIVO';
  size: string;
  capturedAt: string;
  caption: string;
}

export interface ActaDados {
  title: string;
  actaType: string;
  location: string;
  sector: string;
  fieldTeam: string;
  registrant: string;
  description: string;
  fieldNotes: string;
  checklist: string[];
}

export interface ActaPdfPreview {
  fileName: string;
  generatedAt: string;
  pages: number;
  checksum: string;
}

export interface ActaVersionSnapshot {
  version: number;
  versionLabel: string;
  createdAt: string;
  createdBy: string;
  data: ActaDados;
  pdf: ActaPdfPreview;
  evidences: ActaEvidence[];
  signatures: {
    campo1: ActaSignature;
    campo2: ActaSignature;
    validador: ActaSignature;
  };
  observationReason?: string;
  remediationNote?: string;
}

export interface ActaHistoryItem {
  date: string;
  versionLabel: string;
  actor: string;
  action: string;
  comment?: string;
}

export interface ActaRecord {
  id: string;
  code: string;
  currentVersion: number;
  status: ActaStatus;
  priority: ActaPriority;
  hasOpenObservation: boolean;
  updatedAt: string;
  closedAt?: string;
  closedBy?: string;
  versions: ActaVersionSnapshot[];
  history: ActaHistoryItem[];
}

export interface RemediationPayload {
  title: string;
  location: string;
  fieldNotes: string;
  description: string;
  remediationNote: string;
  resignCampo1: boolean;
  resignCampo2: boolean;
  newEvidenceName?: string;
}
