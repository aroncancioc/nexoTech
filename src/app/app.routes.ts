import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsListComponent } from './pages/news-list/news-list.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ManagementComponent } from './pages/management/management.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | NexoTech' },
  { path: 'noticias', component: NewsListComponent, title: 'Noticias | NexoTech' },
  { path: 'noticias/:id', component: NewsDetailComponent, title: 'Detalle | NexoTech' },
  { path: 'favoritos', component: FavoritesComponent, title: 'Favoritos | NexoTech' },
  { path: 'gestion', component: ManagementComponent, title: 'Gestión | NexoTech' },
  { path: 'contacto', component: ContactComponent, title: 'Contacto | NexoTech' },
  { path: '**', redirectTo: '' }
];
