import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { UserSession } from '../models/document.model';

const STORAGE_KEY = 'poc_permisos_session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  private readonly sessionSignal = signal<UserSession | null>(this.loadInitialSession());

  readonly currentUser = this.sessionSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.sessionSignal() !== null);

  private loadInitialSession(): UserSession | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as UserSession) : null;
    } catch {
      return null;
    }
  }

  login(rawUsername?: string): void {
    const cleaned = (rawUsername ?? '').trim();
    const displayName = cleaned.length > 0 ? this.formatDisplayName(cleaned) : 'Carlos Mendoza';
    const username = cleaned.length > 0 ? cleaned.toLowerCase().replace(/\s+/g, '.') : 'cmendoza';

    const session: UserSession = {
      username,
      fullName: displayName,
      role: 'Supervisor de Permisos',
      area: 'Gerencia de Operaciones y Seguridad',
      loginTime: new Date().toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.sessionSignal.set(session);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }

    this.router.navigate(['/bandeja']);
  }

  logout(): void {
    this.sessionSignal.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.router.navigate(['/login']);
  }

  private formatDisplayName(value: string): string {
    if (value.includes(' ')) {
      return value
        .split(' ')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
