import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="page-stack">
      <router-outlet />
    </section>
  `
})
export class CoursesLayoutComponent {}
