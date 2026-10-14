import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" routerLink="/" style="color:white">Nexo<span>Tech</span></a>
            <p>Información tecnológica clara, útil y actual.</p>
          </div>
          <div>
            <h4>Explora</h4>
            <a routerLink="/">Inicio</a>
            <a routerLink="/noticias">Noticias</a>
            <a routerLink="/favoritos">Favoritos</a>
          </div>
          <div>
            <h4>Categorías</h4>
            <a routerLink="/noticias" [queryParams]="{ categoria: 'Inteligencia Artificial' }">Inteligencia Artificial</a>
            <a routerLink="/noticias" [queryParams]="{ categoria: 'Software' }">Software</a>
            <a routerLink="/noticias" [queryParams]="{ categoria: 'Ciberseguridad' }">Ciberseguridad</a>
          </div>
          <div>
            <h4>Contacto</h4>
            <p>contacto@nexotech.co<br>Medellín, Colombia</p>
          </div>
        </div>
        <div class="footer-bottom">© 2026 NexoTech · Proyecto académico Front End</div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
