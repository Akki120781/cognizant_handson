import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="panel not-found">
      <h1 class="page-title">404</h1>
      <p>The requested portal route does not exist.</p>
      <a routerLink="/" class="primary-button">Go Home</a>
    </section>
  `,
  styles: [
    `
      .not-found {
        display: grid;
        gap: 12px;
        justify-items: start;
      }

      p {
        color: #64748b;
        margin: 0;
      }

      a {
        align-items: center;
        display: inline-flex;
        text-decoration: none;
      }
    `
  ]
})
export class NotFoundComponent {}
