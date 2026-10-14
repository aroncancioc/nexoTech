import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NewsFormValue, NewsItem } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly customKey = 'nexotech_custom_news';
  private readonly deletedKey = 'nexotech_deleted_news';
  private readonly favoritesKey = 'nexotech_favorites';
  private baseNews: NewsItem[] | null = null;

  constructor(private readonly http: HttpClient) {}

  private readStore<T>(key: string, fallback: T): T {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : fallback;
    } catch {
      return fallback;
    }
  }

  private writeStore<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private async loadBaseNews(): Promise<NewsItem[]> {
    if (this.baseNews) return this.baseNews;
    this.baseNews = await firstValueFrom(this.http.get<NewsItem[]>('data/noticias.json'));
    return this.baseNews;
  }

  async getAllNews(): Promise<NewsItem[]> {
    const base = await this.loadBaseNews();
    const custom = this.readStore<NewsItem[]>(this.customKey, []);
    const deleted = new Set(this.readStore<number[]>(this.deletedKey, []));
    return [...base, ...custom]
      .filter(item => !deleted.has(Number(item.id)))
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }

  async getNewsById(id: number): Promise<NewsItem | undefined> {
    return (await this.getAllNews()).find(item => Number(item.id) === Number(id));
  }

  getFavoriteIds(): number[] {
    const current = this.readStore<number[] | null>(this.favoritesKey, null);
    if (current === null) {
      const initial = [2, 4, 7];
      this.writeStore(this.favoritesKey, initial);
      return initial;
    }
    return current.map(Number);
  }

  isFavorite(id: number): boolean {
    return this.getFavoriteIds().includes(Number(id));
  }

  toggleFavorite(id: number): boolean {
    const numericId = Number(id);
    const current = this.getFavoriteIds();
    const next = current.includes(numericId)
      ? current.filter(itemId => itemId !== numericId)
      : [...current, numericId];
    this.writeStore(this.favoritesKey, next);
    return next.includes(numericId);
  }

  async getFavoriteNews(): Promise<NewsItem[]> {
    const ids = new Set(this.getFavoriteIds());
    return (await this.getAllNews()).filter(item => ids.has(Number(item.id)));
  }

  async createNews(value: NewsFormValue): Promise<NewsItem> {
    const id = Date.now();
    const fallback = 'assets/img/story-05.svg';
    const item: NewsItem = {
      id,
      titulo: value.titulo.trim(),
      categoria: value.categoria,
      categoriaCorta: value.categoria.toUpperCase(),
      resumen: value.resumen.trim(),
      fecha: new Date().toISOString().slice(0, 10),
      lectura: Number(value.lectura || 4),
      imagen: value.imagen?.trim() || fallback,
      imagenFallback: fallback,
      creditoImagen: value.imagen?.trim() ? 'Imagen definida por el usuario' : 'NexoTech',
      fuenteImagen: '',
      destacada: false,
      contenido: [
        value.contenido.trim() || value.resumen.trim(),
        'Esta noticia fue creada desde el módulo de gestión de NexoTech.',
        'El contenido permanece almacenado en el navegador mediante localStorage.',
        'La noticia puede eliminarse desde la misma vista de gestión.'
      ],
      puntosClave: [
        'Registro creado desde el mini CRUD.',
        'Persistencia local en el navegador.',
        'Disponible en catálogo, detalle y favoritos.'
      ]
    };
    const custom = this.readStore<NewsItem[]>(this.customKey, []);
    this.writeStore(this.customKey, [...custom, item]);
    return item;
  }

  deleteNews(id: number): void {
    const numericId = Number(id);
    const custom = this.readStore<NewsItem[]>(this.customKey, []);
    if (custom.some(item => Number(item.id) === numericId)) {
      this.writeStore(this.customKey, custom.filter(item => Number(item.id) !== numericId));
    } else {
      const deleted = new Set(this.readStore<number[]>(this.deletedKey, []));
      deleted.add(numericId);
      this.writeStore(this.deletedKey, [...deleted]);
    }
    this.writeStore(this.favoritesKey, this.getFavoriteIds().filter(itemId => itemId !== numericId));
  }

  resetDemoData(): void {
    [this.customKey, this.deletedKey, this.favoritesKey].forEach(key => localStorage.removeItem(key));
  }
}
