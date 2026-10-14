import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NewsCardComponent],
  template: `
    <section class="hero">
      <div class="container">
        @if (hero) {
          <div class="hero-card">
            <div class="hero-copy">
              <span class="eyebrow">{{ hero.categoria }}</span>
              <h1>{{ hero.titulo }}</h1>
              <p>{{ hero.resumen }}</p>
              <a class="btn btn-primary" [routerLink]="['/noticias', hero.id]">Leer noticia</a>
              <div class="visual-stats">
                <div class="visual-stat"><strong>{{ news.length }} historias</strong><span>Contenido tecnológico</span></div>
                <div class="visual-stat"><strong>{{ categories.length }} categorías</strong><span>IA, software y más</span></div>
                <div class="visual-stat"><strong>Interactivo</strong><span>Favoritos, filtros y CRUD</span></div>
              </div>
            </div>
            <div class="hero-image">
              <img [src]="hero.imagen" [alt]="hero.titulo" (error)="useFallback($event, hero.imagenFallback)">
            </div>
          </div>
        }
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><h2 class="section-title">Últimas noticias</h2><p class="muted">Contenido seleccionado para mantenerte al día.</p></div>
          <a class="btn btn-secondary" routerLink="/noticias">Ver todas</a>
        </div>
        <div class="grid grid-3">
          @for (item of latest; track item.id) { <app-news-card [item]="item" /> }
        </div>
      </div>
    </section>

    <section class="section--compact">
      <div class="container">
        <h2 class="section-title">Explora por categoría</h2>
        <p class="muted">Entra por el tema que más te interese.</p>
        <div class="category-visual-grid">
          @for (category of categories; track category) {
            <a class="category-visual" routerLink="/noticias" [queryParams]="{ categoria: category }">
              <img [src]="imageForCategory(category)" [alt]="category">
              <span>{{ category }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="section--compact">
      <div class="container">
        <div class="section-head"><div><h2 class="section-title">Radar NexoTech</h2><p class="muted">Tres áreas para seguir de cerca.</p></div></div>
        <div class="grid grid-3">
          <article class="info-card"><div class="radar-icon">⌘</div><span class="eyebrow">DESARROLLO</span><h3>IA como apoyo, no como piloto automático</h3><p>Los asistentes aceleran tareas, pero revisar seguridad, lógica y calidad sigue siendo responsabilidad del equipo.</p></article>
          <article class="info-card"><div class="radar-icon">◈</div><span class="eyebrow">SEGURIDAD</span><h3>Identidad digital más resistente</h3><p>MFA, passkeys y gestión de accesos están cambiando la protección de cuentas y servicios.</p></article>
          <article class="info-card"><div class="radar-icon">↗</div><span class="eyebrow">APRENDIZAJE</span><h3>Proyectos pequeños, progreso visible</h3><p>Construir, probar y documentar ejercicios ayuda a convertir conceptos técnicos en habilidades aplicables.</p></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container"><div class="cta"><div><h2>Mantente conectado con el futuro</h2><p>Explora tendencias, herramientas y novedades que están transformando la tecnología.</p></div><a class="btn btn-secondary" routerLink="/noticias">Explorar noticias</a></div></div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  news: NewsItem[] = [];
  hero?: NewsItem;
  latest: NewsItem[] = [];
  categories: string[] = [];

  constructor(
    private readonly newsService: NewsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.news = await this.newsService.getAllNews();
    this.hero = this.news.find(item => item.destacada) ?? this.news[0];
    this.latest = this.news.filter(item => item.id !== this.hero?.id).slice(0, 3);
    this.categories = [...new Set(this.news.map(item => item.categoria))];
    this.cdr.detectChanges();
  }

  imageForCategory(category: string): string {
    return this.news.find(item => item.categoria === category)?.imagenFallback ?? 'assets/img/innovacion.svg';
  }

  useFallback(event: Event, fallback: string): void {
    (event.target as HTMLImageElement).src = fallback;
  }
}
