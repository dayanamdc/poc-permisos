import { Injectable, computed, signal } from '@angular/core';
import {
  ActaRecord,
  ActaStatus,
  ActaVersionSnapshot,
  RemediationPayload,
} from '../models/document.model';

export type ActaFilterTab = 'TODAS' | ActaStatus;

const INITIAL_ACTAS: ActaRecord[] = [
  {
    id: '1',
    code: 'ACTA-2026-0041',
    currentVersion: 1,
    status: 'POR_VALIDAR',
    priority: 'ALTA',
    hasOpenObservation: false,
    updatedAt: '2026-11-26 08:45',
    versions: [
      {
        version: 1,
        versionLabel: 'v1',
        createdAt: '2026-11-26 08:15',
        createdBy: 'Luis Alberto Paredes',
        data: {
          title: 'Acta de Inspección de Trabajo en Altura - Reservorio R-12',
          actaType: 'Inspección de Seguridad en Altura',
          location: 'Planta La Atarjea - Reservorio R-12',
          sector: 'Sector Operacional 01 - Lima Este',
          fieldTeam: 'Cuadrilla Mantenimiento Estructural A-04',
          registrant: 'Luis Alberto Paredes',
          description:
            'Verificación en campo de barandas metálicas perimetrales, puntos de anclaje certificados y válvulas de compuerta superiores a 9 metros de altura en Reservorio R-12.',
          fieldNotes:
            'Personal equipado con arnés de cuerpo entero, doble línea de vida y casco con barbiquejo. Área inferior señalizada y delimitada.',
          checklist: [
            'Arnés y línea de vida inspeccionados y con certificación vigente',
            'SCTR activo verificado para los 4 técnicos en campo',
            'Charla de seguridad de 5 minutos firmada antes del ascenso',
            'Condiciones climáticas favorables (sin lluvia ni ráfagas)',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0041_v1.pdf',
          generatedAt: '2026-11-26 08:20',
          pages: 3,
          checksum: 'SHA256: 9F4A-71C2-E803',
        },
        evidences: [
          {
            id: 'ev-101',
            name: 'Foto_Anclaje_R12.jpg',
            kind: 'FOTO',
            size: '1.8 MB',
            capturedAt: '2026-11-26 08:10',
            caption: 'Punto de anclaje certificado en plataforma superior R-12',
          },
          {
            id: 'ev-102',
            name: 'ATS_Firmado_R12.pdf',
            kind: 'ARCHIVO',
            size: '420 KB',
            capturedAt: '2026-11-26 08:14',
            caption: 'Análisis de Trabajo Seguro suscrito en campo',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Luis Alberto Paredes',
            documentId: 'DNI 42891034',
            signedAt: '2026-11-26 08:16',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Ing. Sofía Quispe',
            documentId: 'DNI 40112985',
            signedAt: '2026-11-26 08:42',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Pendiente de validación',
            status: 'PENDIENTE',
          },
        },
      },
    ],
    history: [
      {
        date: '2026-11-26 08:16',
        versionLabel: 'v1',
        actor: 'Luis Alberto Paredes',
        action: 'Acta generada y firmada (Firma 1 de campo)',
      },
      {
        date: '2026-11-26 08:42',
        versionLabel: 'v1',
        actor: 'Ing. Sofía Quispe',
        action: 'Conformidad en campo registrada (Firma 2 de campo)',
      },
    ],
  },
  {
    id: '2',
    code: 'ACTA-2026-0042',
    currentVersion: 2,
    status: 'POR_VALIDAR',
    priority: 'ALTA',
    hasOpenObservation: false,
    updatedAt: '2026-11-26 09:30',
    versions: [
      {
        version: 1,
        versionLabel: 'v1',
        createdAt: '2026-11-25 14:10',
        createdBy: 'María Fernanda Rojas',
        data: {
          title: 'Acta de Excavación en Vía Pública - Av. Universitaria Cdra. 24',
          actaType: 'Excavación y Zanjas',
          location: 'Av. Universitaria Cdra. 24, San Martín de Porres',
          sector: 'Distribución Primaria Norte',
          fieldTeam: 'Cuadrilla Redes Matriz N-02',
          registrant: 'María Fernanda Rojas',
          description:
            'Apertura de zanja de 1.80 m de profundidad para reemplazo de tubería matriz DN 300 mm.',
          fieldNotes: 'Se inició señalización perimetral; pendiente adjuntar plano de interferencias.',
          checklist: [
            'Entibado metálico disponible en obra',
            'Señalización nocturna con balizas LED',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0042_v1.pdf',
          generatedAt: '2026-11-25 14:15',
          pages: 2,
          checksum: 'SHA256: 4D21-88B0-11A7',
        },
        evidences: [
          {
            id: 'ev-201',
            name: 'Foto_Zanja_Inicial.jpg',
            kind: 'FOTO',
            size: '1.4 MB',
            capturedAt: '2026-11-25 14:05',
            caption: 'Demarcación inicial de calzada',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'María Fernanda Rojas',
            documentId: 'DNI 44512098',
            signedAt: '2026-11-25 14:12',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Arq. Diego Palomino',
            documentId: 'DNI 41002391',
            signedAt: '2026-11-25 14:30',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Carlos Mendoza',
            status: 'PENDIENTE',
          },
        },
        observationReason:
          'Falta adjuntar el plano visado de interferencias de gas/energía y la autorización municipal de desvío vehicular.',
      },
      {
        version: 2,
        versionLabel: 'v2',
        createdAt: '2026-11-26 09:30',
        createdBy: 'María Fernanda Rojas',
        remediationNote:
          'Se adjuntó plano de interferencias visado y permiso municipal vigente. Se actualizaron medidas de entibado.',
        data: {
          title: 'Acta de Excavación en Vía Pública - Av. Universitaria Cdra. 24',
          actaType: 'Excavación y Zanjas',
          location: 'Av. Universitaria Cdra. 24, San Martín de Porres',
          sector: 'Distribución Primaria Norte',
          fieldTeam: 'Cuadrilla Redes Matriz N-02',
          registrant: 'María Fernanda Rojas',
          description:
            'Apertura de zanja de 1.80 m de profundidad con entibado metálico certificado para reemplazo de tubería matriz DN 300 mm, contando con plano de interferencias y desvío autorizado.',
          fieldNotes:
            'Subsanación completa: plano de interferencias validado por concesionarias y resolución municipal de tránsito cargada.',
          checklist: [
            'Entibado metálico instalado para profundidad > 1.50 m',
            'Plano de interferencias (luz, gas, telecom) verificado en sitio',
            'Autorización municipal de desvío vehicular N° 2026-884',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0042_v2.pdf',
          generatedAt: '2026-11-26 09:30',
          pages: 4,
          checksum: 'SHA256: 7E90-33C4-9B12',
        },
        evidences: [
          {
            id: 'ev-201',
            name: 'Foto_Zanja_Inicial.jpg',
            kind: 'FOTO',
            size: '1.4 MB',
            capturedAt: '2026-11-25 14:05',
            caption: 'Demarcación inicial de calzada',
          },
          {
            id: 'ev-202',
            name: 'Plano_Interferencias_Visado.pdf',
            kind: 'ARCHIVO',
            size: '2.4 MB',
            capturedAt: '2026-11-26 09:20',
            caption: 'Plano de interferencias de servicios públicos',
          },
          {
            id: 'ev-203',
            name: 'Permiso_Municipal_Transito.pdf',
            kind: 'ARCHIVO',
            size: '680 KB',
            capturedAt: '2026-11-26 09:24',
            caption: 'Resolución de desvío vehicular SMP',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'María Fernanda Rojas',
            documentId: 'DNI 44512098',
            signedAt: '2026-11-26 09:26',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Arq. Diego Palomino',
            documentId: 'DNI 41002391',
            signedAt: '2026-11-26 09:29',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Pendiente de validación',
            status: 'PENDIENTE',
          },
        },
      },
    ],
    history: [
      {
        date: '2026-11-25 14:30',
        versionLabel: 'v1',
        actor: 'María Fernanda Rojas',
        action: 'Acta v1 enviada a validación con 2 firmas de campo',
      },
      {
        date: '2026-11-25 17:10',
        versionLabel: 'v1',
        actor: 'Carlos Mendoza',
        action: 'Observación registrada y devuelta a campo',
        comment:
          'Falta adjuntar el plano visado de interferencias de gas/energía y la autorización municipal de desvío vehicular.',
      },
      {
        date: '2026-11-26 09:30',
        versionLabel: 'v2',
        actor: 'María Fernanda Rojas',
        action: 'Acta subsanada -> Generada v2 con nuevas firmas de campo',
        comment:
          'Se adjuntó plano de interferencias visado y permiso municipal vigente.',
      },
    ],
  },
  {
    id: '3',
    code: 'ACTA-2026-0043',
    currentVersion: 1,
    status: 'OBSERVADO',
    priority: 'ALTA',
    hasOpenObservation: true,
    updatedAt: '2026-11-26 07:50',
    versions: [
      {
        version: 1,
        versionLabel: 'v1',
        createdAt: '2026-11-25 16:30',
        createdBy: 'Jorge Iván Salazar',
        data: {
          title: 'Acta de Ingreso a Espacio Confinado - Cámara de Bombeo CB-05',
          actaType: 'Espacio Confinado',
          location: 'Estación de Bombeo Callao Norte - CB-05',
          sector: 'Aguas Residuales Callao',
          fieldTeam: 'Equipo Electromecánico C-01',
          registrant: 'Jorge Iván Salazar',
          description:
            'Limpieza preventiva y calibración de sensores de nivel en cámara húmeda CB-05.',
          fieldNotes:
            'Se realizó ventilación forzada previa de 20 minutos. Pendiente adjuntar certificado vigente de calibración del detector multigás.',
          checklist: [
            'Vigía exterior asignado durante toda la maniobra',
            'Trípode de rescate instalado en boca de ingreso',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0043_v1.pdf',
          generatedAt: '2026-11-25 16:35',
          pages: 3,
          checksum: 'SHA256: 2C84-10F9-6A44',
        },
        evidences: [
          {
            id: 'ev-301',
            name: 'Foto_Tripode_CB05.jpg',
            kind: 'FOTO',
            size: '1.6 MB',
            capturedAt: '2026-11-25 16:20',
            caption: 'Trípode de rescate armado en ingreso a cámara CB-05',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Jorge Iván Salazar',
            documentId: 'DNI 41982311',
            signedAt: '2026-11-25 16:31',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Ing. Marcos Benítez',
            documentId: 'DNI 39871234',
            signedAt: '2026-11-25 16:45',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Pendiente de subsanación',
            status: 'PENDIENTE',
          },
        },
        observationReason:
          'No se adjuntó el certificado de calibración vigente del detector multigás (O2, H2S, CO, LEL) ni el registro horario de mediciones atmosféricas.',
      },
    ],
    history: [
      {
        date: '2026-11-25 16:45',
        versionLabel: 'v1',
        actor: 'Jorge Iván Salazar',
        action: 'Acta v1 registrada con 2 firmas de campo',
      },
      {
        date: '2026-11-26 07:50',
        versionLabel: 'v1',
        actor: 'Carlos Mendoza',
        action: 'Observación registrada y devuelta a campo',
        comment:
          'No se adjuntó el certificado de calibración vigente del detector multigás (O2, H2S, CO, LEL) ni el registro horario de mediciones atmosféricas.',
      },
    ],
  },
  {
    id: '4',
    code: 'ACTA-2026-0044',
    currentVersion: 2,
    status: 'APROBADO',
    priority: 'MEDIA',
    hasOpenObservation: false,
    updatedAt: '2026-11-26 10:05',
    versions: [
      {
        version: 1,
        versionLabel: 'v1',
        createdAt: '2026-11-24 10:00',
        createdBy: 'Ricardo Chávez Huamán',
        data: {
          title: 'Acta de Mantenimiento Eléctrico en Tablero MT - Subestación VES',
          actaType: 'Riesgo Eléctrico',
          location: 'Subestación Principal Villa El Salvador',
          sector: 'Subestaciones y Energía',
          fieldTeam: 'Cuadrilla Alta/Media Tensión E-03',
          registrant: 'Ricardo Chávez Huamán',
          description:
            'Mantenimiento termográfico y ajuste de bornes en celda de salida 10 kV.',
          fieldNotes: 'Registro inicial sin fotografía de tarjeta de bloqueo LOTO.',
          checklist: ['5 reglas de oro aplicadas', 'Guantes dieléctricos clase 2'],
        },
        pdf: {
          fileName: 'ACTA-2026-0044_v1.pdf',
          generatedAt: '2026-11-24 10:05',
          pages: 2,
          checksum: 'SHA256: 5A12-09D3-77C1',
        },
        evidences: [
          {
            id: 'ev-401',
            name: 'Termografia_Celda_10kV.pdf',
            kind: 'ARCHIVO',
            size: '540 KB',
            capturedAt: '2026-11-24 09:50',
            caption: 'Informe termográfico preliminar',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Ricardo Chávez Huamán',
            documentId: 'DNI 43210987',
            signedAt: '2026-11-24 10:02',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Ing. Patricia León',
            documentId: 'DNI 40998123',
            signedAt: '2026-11-24 10:15',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Pendiente',
            status: 'PENDIENTE',
          },
        },
        observationReason: 'Adjuntar evidencia fotográfica del candado y tarjeta LOTO colocado.',
      },
      {
        version: 2,
        versionLabel: 'v2',
        createdAt: '2026-11-25 15:20',
        createdBy: 'Ricardo Chávez Huamán',
        remediationNote: 'Se agregó fotografía de bloqueo LOTO y verificación de ausencia de tensión.',
        data: {
          title: 'Acta de Mantenimiento Eléctrico en Tablero MT - Subestación VES',
          actaType: 'Riesgo Eléctrico',
          location: 'Subestación Principal Villa El Salvador',
          sector: 'Subestaciones y Energía',
          fieldTeam: 'Cuadrilla Alta/Media Tensión E-03',
          registrant: 'Ricardo Chávez Huamán',
          description:
            'Mantenimiento termográfico y ajuste de bornes en celda de salida 10 kV aplicando las 5 reglas de oro, bloqueo LOTO y verificación con pértiga certificada.',
          fieldNotes:
            'Bloqueo LOTO ejecutado y fotografiado en seccionador principal. Sin puntos calientes tras ajuste.',
          checklist: [
            '5 reglas de oro aplicadas y verificadas',
            'Bloqueo y etiquetado (LOTO) con candado personal',
            'Verificación de ausencia de tensión con pértiga certificada',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0044_v2.pdf',
          generatedAt: '2026-11-25 15:25',
          pages: 3,
          checksum: 'SHA256: 8B71-44E2-22F9',
        },
        evidences: [
          {
            id: 'ev-401',
            name: 'Termografia_Celda_10kV.pdf',
            kind: 'ARCHIVO',
            size: '540 KB',
            capturedAt: '2026-11-24 09:50',
            caption: 'Informe termográfico preliminar',
          },
          {
            id: 'ev-402',
            name: 'Foto_Bloqueo_LOTO_VES.jpg',
            kind: 'FOTO',
            size: '1.2 MB',
            capturedAt: '2026-11-25 15:15',
            caption: 'Candado y tarjeta LOTO instalados en seccionador',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Ricardo Chávez Huamán',
            documentId: 'DNI 43210987',
            signedAt: '2026-11-25 15:20',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Ing. Patricia León',
            documentId: 'DNI 40998123',
            signedAt: '2026-11-25 15:24',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Carlos Mendoza',
            documentId: 'Supervisor de Permisos',
            signedAt: '2026-11-26 10:05',
            status: 'FIRMADO',
          },
        },
      },
    ],
    history: [
      {
        date: '2026-11-24 10:15',
        versionLabel: 'v1',
        actor: 'Ricardo Chávez Huamán',
        action: 'Acta v1 enviada a validación',
      },
      {
        date: '2026-11-24 14:00',
        versionLabel: 'v1',
        actor: 'Carlos Mendoza',
        action: 'Observación registrada',
        comment: 'Adjuntar evidencia fotográfica del candado y tarjeta LOTO colocado.',
      },
      {
        date: '2026-11-25 15:24',
        versionLabel: 'v2',
        actor: 'Ricardo Chávez Huamán',
        action: 'Acta subsanada -> Generada v2',
      },
      {
        date: '2026-11-26 10:05',
        versionLabel: 'v2',
        actor: 'Carlos Mendoza',
        action: '3ra Firma registrada y Acta Aprobada',
        comment: 'Evidencias LOTO y termografía conformes.',
      },
    ],
  },
  {
    id: '5',
    code: 'ACTA-2026-0039',
    currentVersion: 1,
    status: 'CERRADO',
    priority: 'BAJA',
    hasOpenObservation: false,
    updatedAt: '2026-11-24 16:10',
    closedAt: '2026-11-24 16:10',
    closedBy: 'Carlos Mendoza',
    versions: [
      {
        version: 1,
        versionLabel: 'v1',
        createdAt: '2026-11-24 11:20',
        createdBy: 'Andrea Lucía Vargas',
        data: {
          title: 'Acta de Calibración de Caudalímetros - Planta Huachipa',
          actaType: 'Acceso y Calibración Contratista',
          location: 'Planta de Tratamiento Huachipa - Línea Impulsión 2',
          sector: 'Producción y Tratamiento',
          fieldTeam: 'Contratista HydroTech SAC',
          registrant: 'Andrea Lucía Vargas',
          description:
            'Calibración anual de 3 caudalímetros ultrasónicos en línea de impulsión con verificación de patrones certificados.',
          fieldNotes: 'Trabajo concluido sin incidentes. Desviación dentro de tolerancia (+/- 0.5%).',
          checklist: [
            'SCTR vigente de los 4 técnicos externos',
            'Inducción de seguridad en planta completada',
            'Certificados de calibración patrón adjuntos',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0039_v1_FINAL.pdf',
          generatedAt: '2026-11-24 16:10',
          pages: 3,
          checksum: 'SHA256: 1A99-C004-5E81',
        },
        evidences: [
          {
            id: 'ev-501',
            name: 'Certificado_Caudalimetros_Huachipa.pdf',
            kind: 'ARCHIVO',
            size: '780 KB',
            capturedAt: '2026-11-24 11:18',
            caption: 'Protocolo de pruebas firmado',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Andrea Lucía Vargas',
            documentId: 'DNI 45671230',
            signedAt: '2026-11-24 11:20',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Ing. Raúl Cárdenas',
            documentId: 'DNI 38901245',
            signedAt: '2026-11-24 11:35',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Carlos Mendoza',
            documentId: 'Supervisor de Permisos',
            signedAt: '2026-11-24 15:45',
            status: 'FIRMADO',
          },
        },
      },
    ],
    history: [
      {
        date: '2026-11-24 11:35',
        versionLabel: 'v1',
        actor: 'Andrea Lucía Vargas',
        action: 'Acta v1 registrada con 2 firmas de campo',
      },
      {
        date: '2026-11-24 15:45',
        versionLabel: 'v1',
        actor: 'Carlos Mendoza',
        action: '3ra Firma registrada y Acta Aprobada',
      },
      {
        date: '2026-11-24 16:10',
        versionLabel: 'v1',
        actor: 'Carlos Mendoza',
        action: 'Acta Cerrada definitivamente (Registro congelado)',
      },
    ],
  },
  {
    id: '6',
    code: 'ACTA-2026-0040',
    currentVersion: 2,
    status: 'CERRADO',
    priority: 'MEDIA',
    hasOpenObservation: false,
    updatedAt: '2026-11-23 18:00',
    closedAt: '2026-11-23 18:00',
    closedBy: 'Carlos Mendoza',
    versions: [
      {
        version: 1,
        versionLabel: 'v1',
        createdAt: '2026-11-23 09:30',
        createdBy: 'Pedro Pablo Gutiérrez',
        data: {
          title: 'Acta de Trabajo en Caliente - Soldadura en Taller Central',
          actaType: 'Trabajo en Caliente',
          location: 'Taller Central - Bahía 3',
          sector: 'Maestranza y Soldadura',
          fieldTeam: 'Equipo Soldadura Industrial M-01',
          registrant: 'Pedro Pablo Gutiérrez',
          description: 'Soldadura eléctrica de brida metálica de 24 pulgadas.',
          fieldNotes: 'Falta homologación vigente del soldador.',
          checklist: ['Extintor PQS de 12 kg a 2 metros'],
        },
        pdf: {
          fileName: 'ACTA-2026-0040_v1.pdf',
          generatedAt: '2026-11-23 09:35',
          pages: 2,
          checksum: 'SHA256: 0F33-81A2-4C19',
        },
        evidences: [],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Pedro Pablo Gutiérrez',
            documentId: 'DNI 41129840',
            signedAt: '2026-11-23 09:30',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Sup. Héctor Flores',
            documentId: 'DNI 39011220',
            signedAt: '2026-11-23 09:40',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Pendiente',
            status: 'PENDIENTE',
          },
        },
        observationReason: 'Adjuntar homologación 3G/4G vigente del soldador y foto de biombos ignífugos.',
      },
      {
        version: 2,
        versionLabel: 'v2',
        createdAt: '2026-11-23 15:10',
        createdBy: 'Pedro Pablo Gutiérrez',
        remediationNote: 'Se adjuntó homologación 4G y fotografía de biombos ignífugos instalados.',
        data: {
          title: 'Acta de Trabajo en Caliente - Soldadura en Taller Central',
          actaType: 'Trabajo en Caliente',
          location: 'Taller Central - Bahía 3',
          sector: 'Maestranza y Soldadura',
          fieldTeam: 'Equipo Soldadura Industrial M-01',
          registrant: 'Pedro Pablo Gutiérrez',
          description:
            'Soldadura eléctrica de brida metálica de 24 pulgadas en Bahía 3 con biombos ignífugos y retiro de material combustible.',
          fieldNotes: 'Trabajo ejecutado y verificado sin chispas residuales tras 30 min de guardia de fuego.',
          checklist: [
            'Extintor PQS 12 kg verificado',
            'Biombos ignífugos instalados en perímetro',
            'Homologación 4G del soldador vigente',
          ],
        },
        pdf: {
          fileName: 'ACTA-2026-0040_v2_FINAL.pdf',
          generatedAt: '2026-11-23 18:00',
          pages: 3,
          checksum: 'SHA256: 6C44-92B7-3D55',
        },
        evidences: [
          {
            id: 'ev-601',
            name: 'Homologacion_Soldador_4G.pdf',
            kind: 'ARCHIVO',
            size: '350 KB',
            capturedAt: '2026-11-23 15:00',
            caption: 'Certificado vigente de homologación',
          },
          {
            id: 'ev-602',
            name: 'Foto_Biombos_Bahia3.jpg',
            kind: 'FOTO',
            size: '1.1 MB',
            capturedAt: '2026-11-23 15:05',
            caption: 'Biombos ignífugos desplegados',
          },
        ],
        signatures: {
          campo1: {
            id: 'campo1',
            label: 'Firma 1 de Campo',
            role: 'Técnico / Registrante',
            signerName: 'Pedro Pablo Gutiérrez',
            documentId: 'DNI 41129840',
            signedAt: '2026-11-23 15:10',
            status: 'FIRMADO',
          },
          campo2: {
            id: 'campo2',
            label: 'Firma 2 de Campo',
            role: 'Supervisor / Cliente en Campo',
            signerName: 'Sup. Héctor Flores',
            documentId: 'DNI 39011220',
            signedAt: '2026-11-23 15:14',
            status: 'FIRMADO',
          },
          validador: {
            id: 'validador',
            label: '3ra Firma (Validador)',
            role: 'Validador Interno',
            signerName: 'Carlos Mendoza',
            documentId: 'Supervisor de Permisos',
            signedAt: '2026-11-23 17:30',
            status: 'FIRMADO',
          },
        },
      },
    ],
    history: [
      {
        date: '2026-11-23 09:40',
        versionLabel: 'v1',
        actor: 'Pedro Pablo Gutiérrez',
        action: 'Acta v1 enviada a validación',
      },
      {
        date: '2026-11-23 11:20',
        versionLabel: 'v1',
        actor: 'Carlos Mendoza',
        action: 'Observación registrada',
        comment: 'Adjuntar homologación 3G/4G vigente del soldador y foto de biombos ignífugos.',
      },
      {
        date: '2026-11-23 15:14',
        versionLabel: 'v2',
        actor: 'Pedro Pablo Gutiérrez',
        action: 'Acta subsanada -> Generada v2',
      },
      {
        date: '2026-11-23 17:30',
        versionLabel: 'v2',
        actor: 'Carlos Mendoza',
        action: '3ra Firma registrada y Acta Aprobada',
      },
      {
        date: '2026-11-23 18:00',
        versionLabel: 'v2',
        actor: 'Carlos Mendoza',
        action: 'Acta Cerrada definitivamente (Registro congelado)',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private readonly actasSignal = signal<ActaRecord[]>(INITIAL_ACTAS);
  private readonly toastSignal = signal<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  readonly actas = this.actasSignal.asReadonly();
  readonly toast = this.toastSignal.asReadonly();
  readonly activeFilter = signal<ActaFilterTab>('POR_VALIDAR');
  readonly selectedActaId = signal<string | null>(null);

  setFilterAndShowList(filter: ActaFilterTab): void {
    this.activeFilter.set(filter);
    this.selectedActaId.set(null);
  }

  readonly porValidarCount = computed(
    () => this.actasSignal().filter((a) => a.status === 'POR_VALIDAR').length
  );
  readonly observadoCount = computed(
    () => this.actasSignal().filter((a) => a.status === 'OBSERVADO').length
  );
  readonly aprobadoCount = computed(
    () => this.actasSignal().filter((a) => a.status === 'APROBADO').length
  );
  readonly cerradoCount = computed(
    () => this.actasSignal().filter((a) => a.status === 'CERRADO').length
  );

  getLatestSnapshot(acta: ActaRecord): ActaVersionSnapshot {
    return (
      acta.versions.find((v) => v.version === acta.currentVersion) ??
      acta.versions[acta.versions.length - 1]
    );
  }

  canCloseActa(acta: ActaRecord): { allowed: boolean; reasons: string[] } {
    const reasons: string[] = [];
    const latest = this.getLatestSnapshot(acta);

    if (acta.status !== 'APROBADO') {
      reasons.push('El acta debe encontrarse en estado Aprobado.');
    }
    if (acta.hasOpenObservation) {
      reasons.push('Existe una observación abierta pendiente de subsanación.');
    }
    if (latest.signatures.campo1.status !== 'FIRMADO') {
      reasons.push('Falta la Firma 1 de campo (Técnico / Registrante).');
    }
    if (latest.signatures.campo2.status !== 'FIRMADO') {
      reasons.push('Falta la Firma 2 de campo (Supervisor / Cliente en campo).');
    }
    if (latest.signatures.validador.status !== 'FIRMADO') {
      reasons.push('Falta la 3ra firma de aprobación del Validador.');
    }

    return {
      allowed: reasons.length === 0,
      reasons,
    };
  }

  registerObservation(actaId: string, validatorName: string, reason: string): void {
    const cleanReason = reason.trim();
    if (!cleanReason) return;
    const now = this.nowFormatted();

    this.actasSignal.update((list) =>
      list.map((acta) => {
        if (acta.id !== actaId || acta.status !== 'POR_VALIDAR') return acta;
        const currentLabel = `v${acta.currentVersion}`;
        return {
          ...acta,
          status: 'OBSERVADO',
          hasOpenObservation: true,
          updatedAt: now,
          versions: acta.versions.map((v) =>
            v.version === acta.currentVersion ? { ...v, observationReason: cleanReason } : v
          ),
          history: [
            ...acta.history,
            {
              date: now,
              versionLabel: currentLabel,
              actor: validatorName,
              action: 'Observación registrada y devuelta a campo',
              comment: cleanReason,
            },
          ],
        };
      })
    );

    this.showToast('Observación registrada. El acta pasó a estado Observado.', 'warning');
  }

  remediateActa(actaId: string, payload: RemediationPayload): number | null {
    const now = this.nowFormatted();
    let createdVersion: number | null = null;

    this.actasSignal.update((list) =>
      list.map((acta) => {
        if (acta.id !== actaId || acta.status !== 'OBSERVADO') return acta;

        const prev = this.getLatestSnapshot(acta);
        const nextVersion = acta.currentVersion + 1;
        const nextLabel = `v${nextVersion}`;
        createdVersion = nextVersion;

        const evidences = payload.newEvidenceName?.trim()
          ? [
              ...prev.evidences,
              {
                id: `ev-${Date.now()}`,
                name: payload.newEvidenceName.trim(),
                kind: 'ARCHIVO' as const,
                size: '640 KB',
                capturedAt: now,
                caption: 'Evidencia adjuntada en subsanación',
              },
            ]
          : [...prev.evidences];

        const newSnapshot: ActaVersionSnapshot = {
          version: nextVersion,
          versionLabel: nextLabel,
          createdAt: now,
          createdBy: prev.data.registrant,
          remediationNote: payload.remediationNote.trim(),
          data: {
            ...prev.data,
            title: payload.title.trim(),
            location: payload.location.trim(),
            description: payload.description.trim(),
            fieldNotes: payload.fieldNotes.trim(),
          },
          pdf: {
            fileName: `${acta.code}_${nextLabel}.pdf`,
            generatedAt: now,
            pages: prev.pdf.pages + 1,
            checksum: `SHA256: ${Math.random().toString(16).substring(2, 6).toUpperCase()}-${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
          },
          evidences,
          signatures: {
            campo1: {
              ...prev.signatures.campo1,
              status: payload.resignCampo1 ? 'FIRMADO' : 'PENDIENTE',
              signedAt: payload.resignCampo1 ? now : undefined,
            },
            campo2: {
              ...prev.signatures.campo2,
              status: payload.resignCampo2 ? 'FIRMADO' : 'PENDIENTE',
              signedAt: payload.resignCampo2 ? now : undefined,
            },
            validador: {
              id: 'validador',
              label: '3ra Firma (Validador)',
              role: 'Validador Interno',
              signerName: 'Pendiente de validación',
              status: 'PENDIENTE',
            },
          },
        };

        return {
          ...acta,
          currentVersion: nextVersion,
          status: 'POR_VALIDAR',
          hasOpenObservation: false,
          updatedAt: now,
          versions: [...acta.versions, newSnapshot],
          history: [
            ...acta.history,
            {
              date: now,
              versionLabel: nextLabel,
              actor: prev.data.registrant,
              action: `Acta subsanada -> Generada ${nextLabel} (versión anterior conservada)`,
              comment: payload.remediationNote.trim(),
            },
          ],
        };
      })
    );

    if (createdVersion !== null) {
      this.showToast(`Subsanación registrada. Se generó la versión v${createdVersion} en Por validar.`, 'success');
    }
    return createdVersion;
  }

  signActaAsValidator(
    actaId: string,
    validatorName: string,
    validatorRole: string,
    signatureImage: string
  ): void {
    const now = this.nowFormatted();

    this.actasSignal.update((list) =>
      list.map((acta) => {
        if (acta.id !== actaId || acta.status !== 'POR_VALIDAR') return acta;
        const currentLabel = `v${acta.currentVersion}`;
        return {
          ...acta,
          updatedAt: now,
          versions: acta.versions.map((v) => {
            if (v.version !== acta.currentVersion) return v;
            return {
              ...v,
              signatures: {
                ...v.signatures,
                validador: {
                  id: 'validador',
                  label: '3ra Firma (Validador)',
                  role: 'Validador Interno',
                  signerName: validatorName,
                  documentId: validatorRole,
                  signedAt: now,
                  signatureImage,
                  status: 'FIRMADO',
                },
              },
            };
          }),
          history: [
            ...acta.history,
            {
              date: now,
              versionLabel: currentLabel,
              actor: validatorName,
              action: '3ra Firma dibujada y registrada en el acta',
            },
          ],
        };
      })
    );

    this.showToast('Firma del validador guardada e incrustada en el PDF.', 'success');
  }

  approveActa(actaId: string, validatorName: string, comment?: string): void {
    const target = this.actasSignal().find((a) => a.id === actaId);
    if (!target || target.status !== 'POR_VALIDAR') return;

    const latest = this.getLatestSnapshot(target);
    if (latest.signatures.validador.status !== 'FIRMADO') {
      this.showToast('Debes registrar la 3ra firma antes de aprobar el acta.', 'error');
      return;
    }

    const now = this.nowFormatted();
    const cleanComment = comment?.trim();

    this.actasSignal.update((list) =>
      list.map((acta) => {
        if (acta.id !== actaId || acta.status !== 'POR_VALIDAR') return acta;
        const currentLabel = `v${acta.currentVersion}`;
        return {
          ...acta,
          status: 'APROBADO',
          hasOpenObservation: false,
          updatedAt: now,
          history: [
            ...acta.history,
            {
              date: now,
              versionLabel: currentLabel,
              actor: validatorName,
              action: 'Acta Aprobada por Validador',
              comment: cleanComment || 'Acta conforme con 3/3 firmas completas.',
            },
          ],
        };
      })
    );

    this.showToast('Acta aprobada correctamente (estado Aprobado).', 'success');
  }

  closeActa(actaId: string, userName: string): boolean {
    const target = this.actasSignal().find((a) => a.id === actaId);
    if (!target) return false;

    const check = this.canCloseActa(target);
    if (!check.allowed) {
      this.showToast(`No se puede cerrar el acta: ${check.reasons[0]}`, 'error');
      return false;
    }

    const now = this.nowFormatted();
    this.actasSignal.update((list) =>
      list.map((acta) => {
        if (acta.id !== actaId) return acta;
        return {
          ...acta,
          status: 'CERRADO',
          closedAt: now,
          closedBy: userName,
          updatedAt: now,
          history: [
            ...acta.history,
            {
              date: now,
              versionLabel: `v${acta.currentVersion}`,
              actor: userName,
              action: 'Acta Cerrada definitivamente (Registro congelado)',
            },
          ],
        };
      })
    );

    this.showToast('Acta cerrada definitivamente. Registro congelado en solo lectura.', 'success');
    return true;
  }

  clearToast(): void {
    this.toastSignal.set(null);
  }

  private nowFormatted(): string {
    return new Date().toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning'): void {
    this.toastSignal.set({ message, type });
    setTimeout(() => {
      if (this.toastSignal()?.message === message) {
        this.toastSignal.set(null);
      }
    }, 4000);
  }
}
