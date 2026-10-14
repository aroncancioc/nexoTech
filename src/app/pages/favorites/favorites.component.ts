import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, NewsCardComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="section-head"><div><h1 class="page-title">Mis favoritos</h1><p class="muted">Noticias guardadas para leer más tarde.</p></div><span class="badge-count">{{ favorites.length }} guardadas</span></div>
        @if (favorites.length) {
          <div class="grid grid-3">@for (item of favorites; track item.id) { <app-news-card [item]="item" (favoriteChanged)="reload()" /> }</div>
        } @else {
          <div class="empty-state"><h3>Aún no tienes favoritos</h3><p>Guarda noticias desde el catálogo o desde su vista de detalle.</p><a class="btn btn-primary" routerLink="/noticias">Explorar noticias</a></div>
        }
        <div class="info-banner"><div><strong>Tu lista se guarda en este navegador</strong><p class="muted">NexoTech utiliza localStorage para conservar la selección del usuario.</p></div><a class="btn btn-primary" routerLink="/noticias">Explorar noticias</a></div>
      </div>
    </section>
  `
})
export class FavoritesComponent implements OnInit {
  favorites: NewsItem[] = [];
  constructor(
    private readonly newsService: NewsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> { await this.reload(); }

  async reload(): Promise<void> {
    this.favorites = await this.newsService.getFavoriteNews();
    this.cdr.detectChanges();
  }
}
