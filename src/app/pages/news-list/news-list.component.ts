import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list',
  imports: [FormsModule, RouterLink, NewsCardComponent],
  template: `
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div><h1 class="page-title">Noticias</h1><p class="muted">Explora contenidos sobre tecnología, innovación y mundo digital.</p></div>
          <span class="badge-count">{{ filteredNews.length }} resultados</span>
        </div>

        <div class="filter-panel">
          <strong>Filtrar por categoría</strong>
          <div class="categories">
            @for (category of categories; track category) {
              <a class="category-btn" [class.active]="activeCategory === category" routerLink="/noticias" [queryParams]="queryParamsFor(category)">{{ category }}</a>
            }
          </div>
        </div>

        @if (showShowcase) {
          @if (leadStory; as lead) {
            <section class="story-showcase">
              <article class="lead-story">
                <a class="lead-story-media" [routerLink]="['/noticias', lead.id]"><img [src]="lead.imagen" [alt]="lead.titulo" (error)="useFallback($event, lead.imagenFallback)"></a>
                <div class="lead-story-body"><span class="eyebrow">{{ lead.categoriaCorta }}</span><h2><a [routerLink]="['/noticias', lead.id]">{{ lead.titulo }}</a></h2><p>{{ lead.resumen }}</p></div>
              </article>
              <div class="story-showcase-side">
                @for (item of sideStories; track item.id) {
                  <article class="side-story">
                    <a class="side-story-media" [routerLink]="['/noticias', item.id]"><img [src]="item.imagen" [alt]="item.titulo" (error)="useFallback($event, item.imagenFallback)"></a>
                    <div><span class="eyebrow">{{ item.categoriaCorta }}</span><h3><a [routerLink]="['/noticias', item.id]">{{ item.titulo }}</a></h3><p>{{ item.resumen }}</p></div>
                  </article>
                }
              </div>
            </section>
          }
        }

        <div class="grid grid-3">
          @for (item of catalogNews; track item.id) { <app-news-card [item]="item" /> }
          @empty { <div class="empty-state"><h3>No encontramos noticias</h3><p>Prueba otra categoría o palabra clave.</p></div> }
        </div>

        <div class="search-large">
          <h2>¿Buscas un tema específico?</h2>
          <p class="muted filter-hint">Busca por título, resumen o categoría.</p>
          <form class="search-box" (ngSubmit)="applySearch()">
            <input [(ngModel)]="searchDraft" name="catalogSearch" aria-label="Palabra clave" placeholder="Escribe una palabra clave">
            <button class="btn btn-primary" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </section>
  `
})
export class NewsListComponent implements OnInit, OnDestroy {
  news: NewsItem[] = [];
  categories = ['Todas', 'Inteligencia Artificial', 'Software', 'Ciberseguridad', 'Dispositivos', 'Innovación', 'Aprendizaje'];
  activeCategory = 'Todas';
  searchTerm = '';
  searchDraft = '';
  private routeSubscription?: Subscription;

  constructor(
    private readonly newsService: NewsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.news = await this.newsService.getAllNews();
    this.cdr.detectChanges();
    this.routeSubscription = this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');
      this.activeCategory = categoria && this.categories.includes(categoria) ? categoria : 'Todas';
      this.searchTerm = params.get('buscar')?.trim() ?? '';
      this.searchDraft = this.searchTerm;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  get filteredNews(): NewsItem[] {
    const query = this.searchTerm.toLowerCase();
    return this.news.filter(item =>
      (this.activeCategory === 'Todas' || item.categoria === this.activeCategory) &&
      (!query || `${item.titulo} ${item.resumen} ${item.categoria}`.toLowerCase().includes(query))
    );
  }

  get catalogNews(): NewsItem[] {
    if (!this.searchTerm && this.activeCategory === 'Todas') return this.filteredNews.slice(3);
    return this.filteredNews;
  }

  get showShowcase(): boolean {
    return !this.searchTerm && this.activeCategory === 'Todas' && this.filteredNews.length >= 3;
  }

  get leadStory(): NewsItem | undefined {
    return this.showShowcase ? this.filteredNews[0] : undefined;
  }

  get sideStories(): NewsItem[] {
    return this.showShowcase ? this.filteredNews.slice(1, 3) : [];
  }

  queryParamsFor(category: string): Record<string, string> {
    const params: Record<string, string> = {};
    if (category !== 'Todas') params['categoria'] = category;
    if (this.searchTerm) params['buscar'] = this.searchTerm;
    return params;
  }

  applySearch(): void {
    const queryParams: Record<string, string> = {};
    if (this.activeCategory !== 'Todas') queryParams['categoria'] = this.activeCategory;
    if (this.searchDraft.trim()) queryParams['buscar'] = this.searchDraft.trim();
    void this.router.navigate(['/noticias'], { queryParams });
  }

  useFallback(event: Event, fallback: string): void {
    (event.target as HTMLImageElement).src = fallback;
  }
}
