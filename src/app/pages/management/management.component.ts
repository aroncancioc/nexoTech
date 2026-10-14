import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-management',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="section">
      <div class="container">
        <div class="admin-actions">
          <div><h1 class="page-title">Gestión de noticias</h1><p class="muted">Mini CRUD: crear y eliminar contenidos del portal.</p></div>
          <div><span class="badge-count">{{ news.length }} noticias</span> <button class="btn btn-secondary btn-sm" type="button" (click)="resetData()">Restablecer demo</button></div>
        </div>

        <div class="table-wrap">
          <table>
            <thead><tr><th>Título</th><th>Categoría</th><th>Fecha</th><th>Acciones</th></tr></thead>
            <tbody>
              @for (item of news; track item.id) {
                <tr>
                  <td><div class="admin-title-cell"><img class="admin-thumb" [src]="item.imagen" alt="" (error)="useFallback($event, item.imagenFallback)"><strong>{{ item.titulo }}</strong></div></td>
                  <td><span class="eyebrow">{{ item.categoria }}</span></td>
                  <td>{{ item.fecha }}</td>
                  <td class="actions-cell"><a class="btn btn-secondary btn-sm" [routerLink]="['/noticias', item.id]">Ver</a><button class="btn btn-danger btn-sm" type="button" (click)="deleteItem(item)">Eliminar</button></td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <form class="admin-form" [formGroup]="form" (ngSubmit)="createItem()">
          <h2>Crear nueva noticia</h2>
          <div class="form-grid">
            <div class="field"><label for="titulo">Título *</label><input id="titulo" formControlName="titulo"><small class="error">@if (submitted && form.controls.titulo.invalid) { Ingresa un título de al menos 8 caracteres. }</small></div>
            <div class="field"><label for="categoria">Categoría *</label><select id="categoria" formControlName="categoria">@for (category of categories; track category) { <option [value]="category">{{ category }}</option> }</select></div>
            <div class="field span-2"><label for="resumen">Resumen *</label><textarea id="resumen" formControlName="resumen"></textarea><small class="error">@if (submitted && form.controls.resumen.invalid) { Ingresa un resumen de al menos 20 caracteres. }</small></div>
            <div class="field span-2"><label for="contenido">Contenido *</label><textarea id="contenido" formControlName="contenido"></textarea><small class="error">@if (submitted && form.controls.contenido.invalid) { Desarrolla el contenido de la noticia. }</small></div>
            <div class="field"><label for="lectura">Minutos de lectura</label><input id="lectura" type="number" min="1" max="30" formControlName="lectura"></div>
            <div class="field"><label for="imagen">URL de imagen (opcional)</label><input id="imagen" formControlName="imagen" placeholder="https://..."></div>
          </div>
          <button class="btn btn-primary" type="submit">Guardar noticia</button>
          @if (successMessage) { <div class="success-message show">{{ successMessage }}</div> }
        </form>
      </div>
    </section>
  `
})
export class ManagementComponent implements OnInit {
  news: NewsItem[] = [];
  submitted = false;
  successMessage = '';
  categories = ['Inteligencia Artificial', 'Software', 'Ciberseguridad', 'Dispositivos', 'Innovación', 'Aprendizaje'];
  form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    categoria: new FormControl('Innovación', { nonNullable: true, validators: [Validators.required] }),
    resumen: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(20)] }),
    contenido: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(30)] }),
    lectura: new FormControl(5, { nonNullable: true, validators: [Validators.min(1), Validators.max(30)] }),
    imagen: new FormControl('', { nonNullable: true })
  });

  constructor(
    private readonly newsService: NewsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> { await this.reload(); }

  async reload(): Promise<void> {
    this.news = await this.newsService.getAllNews();
    this.cdr.detectChanges();
  }

  async createItem(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) return;
    await this.newsService.createNews(this.form.getRawValue());
    this.form.reset({ titulo: '', categoria: 'Innovación', resumen: '', contenido: '', lectura: 5, imagen: '' });
    this.submitted = false;
    this.successMessage = 'Noticia creada correctamente y guardada en localStorage.';
    await this.reload();
  }

  async deleteItem(item: NewsItem): Promise<void> {
    if (!confirm(`¿Eliminar la noticia “${item.titulo}”?`)) return;
    this.newsService.deleteNews(item.id);
    this.successMessage = 'Noticia eliminada correctamente.';
    await this.reload();
  }

  async resetData(): Promise<void> {
    if (!confirm('¿Restablecer los datos de demostración?')) return;
    this.newsService.resetDemoData();
    this.successMessage = 'Datos de demostración restablecidos.';
    await this.reload();
  }

  useFallback(event: Event, fallback: string): void { (event.target as HTMLImageElement).src = fallback; }
}
