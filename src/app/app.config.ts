import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular 21 usa detección de cambios sin ZoneJS por defecto.
    // NexoTech carga el catálogo mediante operaciones async/await; para este
    // proyecto académico habilitamos NgZone para que la interfaz se actualice
    // inmediatamente al terminar cada carga asíncrona, sin requerir un segundo clic.
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes, withHashLocation())
  ]
};
