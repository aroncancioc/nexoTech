import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container header-row">
        <a class="brand" routerLink="/">Nexo<span>Tech</span></a>
        <button class="menu-btn" type="button" aria-label="Abrir menú" (click)="menuOpen = !menuOpen">☰</button>
        <nav class="nav" [class.open]="menuOpen" aria-label="Navegación principal">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/favoritos" routerLinkActive="active">Favoritos</a>
          <a routerLink="/gestion" routerLinkActive="active">Gestión</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
        </nav>
        <form class="search-inline" (ngSubmit)="searchNews()">
          <input [(ngModel)]="search" name="globalSearch" aria-label="Buscar noticias" placeholder="Buscar">
          <button type="submit" aria-label="Buscar">⌕</button>
        </form>
      </div>
    </header>
    <div class="trend-bar">
      <div class="container trend-row">
        <span class="trend-label">AHORA EN NEXOTECH</span>
        <div class="trend-links">
          <a [routerLink]="['/noticias', 1]">IA aplicada al desarrollo</a>
          <a [routerLink]="['/noticias', 8]">Passkeys y seguridad</a>
          <a [routerLink]="['/noticias', 9]">Wi-Fi 7 en casa</a>
          <a [routerLink]="['/noticias', 12]">Portafolio de desarrollador</a>
        </div>
      </div>
    </div>
  `
})
export class HeaderComponent {
  search = '';
  menuOpen = false;

  constructor(private readonly router: Router) {}

  searchNews(): void {
    const buscar = this.search.trim();
    void this.router.navigate(['/noticias'], { queryParams: buscar ? { buscar } : {} });
    this.menuOpen = false;
  }
}
