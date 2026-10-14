import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-detail',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="container">
        @if (item) {
          <article class="article">
            <div class="breadcrumbs"><a routerLink="/noticias">Noticias</a> / {{ item.categoria }}</div>
            <span class="eyebrow">{{ item.categoria }}</span>
            <h1>{{ item.titulo }}</h1>
            <p class="article-deck">{{ item.resumen }}</p>
            <div class="article-topline">
              <span class="muted">{{ item.fecha }} · {{ item.lectura }} min de lectura</span>
              <button class="btn btn-secondary" type="button" (click)="toggleFavorite()">{{ favorite ? '♥ Quitar de favoritos' : '♡ Guardar en favoritos' }}</button>
            </div>
            <img class="article-cover" [src]="item.imagen" [alt]="item.titulo" (error)="useFallback($event)">
            @if (item.fuenteImagen) { <p class="image-credit">Imagen: <a [href]="item.fuenteImagen" target="_blank" rel="noopener">{{ item.creditoImagen }}</a></p> }
            <div class="article-body">
              <h2>Qué está pasando</h2>
              <p>{{ item.contenido[0] }}</p>
              <p>{{ item.contenido[1] }}</p>
              <div class="quote">La tecnología genera más valor cuando se entiende su contexto, sus límites y su impacto en las personas.</div>
              <h2>Claves para entenderlo</h2>
              <ul class="key-points">
                @for (point of item.puntosClave; track point) { <li>{{ point }}</li> }
              </ul>
              <h2>Qué significa en la práctica</h2>
              <p>{{ item.contenido[2] }}</p>
              <p>{{ item.contenido[3] }}</p>
            </div>
            <div class="info-banner">
              <div><strong>¿Quieres seguir explorando?</strong><p class="muted">Consulta más contenidos de {{ item.categoria }}.</p></div>
              <a class="btn btn-primary" routerLink="/noticias" [queryParams]="{ categoria: item.categoria }">Ver categoría</a>
            </div>
          </article>
        } @else if (loaded) {
          <div class="empty-state"><h3>Noticia no encontrada</h3><p>El contenido pudo haber sido eliminado desde Gestión.</p><a class="btn btn-primary" routerLink="/noticias">Volver a noticias</a></div>
        }
      </div>
    </section>
  `
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  item?: NewsItem;
  favorite = false;
  loaded = false;
  private subscription?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(async params => {
      const id = Number(params.get('id'));
      this.item = await this.newsService.getNewsById(id);
      this.favorite = this.item ? this.newsService.isFavorite(this.item.id) : false;
      this.loaded = true;
      this.cdr.detectChanges();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleFavorite(): void {
    if (!this.item) return;
    this.favorite = this.newsService.toggleFavorite(this.item.id);
  }

  useFallback(event: Event): void {
    if (!this.item) return;
    (event.target as HTMLImageElement).src = this.item.imagenFallback;
  }
}
