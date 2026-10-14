import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  template: `
    <section class="section">
      <div class="container">
        <div><h1 class="page-title">Hablemos</h1><p class="muted">¿Tienes una sugerencia o quieres compartir una noticia? Escríbenos.</p></div>
        <div class="contact-layout" style="margin-top:32px">
          <aside class="contact-panel">
            <span class="eyebrow">NEXOTECH</span>
            <h2>Conectamos personas con la tecnología que transforma el presente.</h2>
            <img class="contact-visual" src="assets/img/contact-tech.svg" alt="Ilustración tecnológica">
            <p class="muted">Correo</p><strong>contacto@nexotech.co</strong>
            <p class="muted" style="margin-top:24px">Ubicación</p><strong>Medellín, Colombia</strong>
          </aside>
          <form class="form-card" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <h2>Envíanos un mensaje</h2>
            <div class="field"><label for="nombre">Nombre *</label><input id="nombre" formControlName="nombre"><small class="error">@if (submitted && form.controls.nombre.invalid) { El nombre es obligatorio. }</small></div>
            <div class="field"><label for="correo">Correo electrónico *</label><input id="correo" type="email" formControlName="correo"><small class="error">@if (submitted && form.controls.correo.invalid) { Ingresa un correo válido. }</small></div>
            <div class="field"><label for="asunto">Asunto *</label><select id="asunto" formControlName="asunto"><option value="">Selecciona un asunto</option><option>Sugerencia</option><option>Corrección</option><option>Propuesta de noticia</option><option>Otro</option></select><small class="error">@if (submitted && form.controls.asunto.invalid) { Selecciona un asunto. }</small></div>
            <div class="field"><label for="mensaje">Mensaje *</label><textarea id="mensaje" formControlName="mensaje"></textarea><small class="error">@if (submitted && form.controls.mensaje.invalid) { Escribe un mensaje de al menos 15 caracteres. }</small></div>
            <button class="btn btn-primary" type="submit">Enviar mensaje</button>
            @if (success) { <div class="success-message show">Mensaje validado correctamente. En este prototipo académico no se envía a un servidor externo.</div> }
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  submitted = false;
  success = false;
  form = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    correo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    asunto: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    mensaje: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(15)] })
  });

  submit(): void {
    this.submitted = true;
    this.success = false;
    if (this.form.invalid) return;
    this.success = true;
    this.form.reset({ nombre: '', correo: '', asunto: '', mensaje: '' });
    this.submitted = false;
  }
}
