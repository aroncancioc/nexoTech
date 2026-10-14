import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-card',
  imports: [RouterLink],
  template: `
    <article class="news-card">
      <a class="news-card-image" [routerLink]="['/noticias', item.id]" [attr.aria-label]="'Abrir ' + item.titulo">
        <img [src]="item.imagen" [alt]="'Imagen representativa de ' + item.categoria" (error)="useFallback($event)">
      </a>
      <div class="news-card-body">
        <span class="eyebrow">{{ item.categoriaCorta || item.categoria }}</span>
        <h3><a [routerLink]="['/noticias', item.id]">{{ item.titulo }}</a></h3>
        <p>{{ item.resumen }}</p>
        <div class="card-details"><span>{{ item.fecha }}</span><span>{{ item.lectura }} min</span></div>
        <div class="news-meta">
          <a class="text-link" [routerLink]="['/noticias', item.id]">Leer noticia →</a>
          <button class="fav-btn" type="button" [class.active]="favorite" (click)="toggleFavorite()" [attr.aria-label]="favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'">{{ favorite ? '♥' : '♡' }}</button>
        </div>
      </div>
    </article>
  `
})
export class NewsCardComponent implements OnChanges {
  @Input({ required: true }) item!: NewsItem;
  @Output() favoriteChanged = new EventEmitter<void>();
  favorite = false;

  constructor(private readonly newsService: NewsService) {}

  ngOnChanges(): void {
    if (this.item) this.favorite = this.newsService.isFavorite(this.item.id);
  }

  toggleFavorite(): void {
    this.favorite = this.newsService.toggleFavorite(this.item.id);
    this.favoriteChanged.emit();
  }

  useFallback(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (image.src.endsWith(this.item.imagenFallback)) return;
    image.src = this.item.imagenFallback;
  }
}
