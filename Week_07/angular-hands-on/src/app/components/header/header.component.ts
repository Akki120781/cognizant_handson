import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/">Student Course Portal</a>
      <nav aria-label="Primary navigation">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/courses" routerLinkActive="active">Courses</a>
        <a routerLink="/enroll" routerLinkActive="active">Enroll</a>
        <a routerLink="/enroll/reactive" routerLinkActive="active">Reactive Form</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
      </nav>
    </header>
  `,
  styles: [
    `
      .site-header {
        align-items: center;
        background: #ffffff;
        border-bottom: 1px solid #dbe3ef;
        display: flex;
        gap: 18px;
        justify-content: space-between;
        min-height: 68px;
        padding: 0 24px;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .brand {
        color: #111827;
        font-size: 1.05rem;
        font-weight: 800;
        letter-spacing: 0;
        text-decoration: none;
        white-space: nowrap;
      }

      nav {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      nav a {
        border-radius: 6px;
        color: #475569;
        font-size: 0.9rem;
        font-weight: 700;
        padding: 8px 10px;
        text-decoration: none;
      }

      nav a.active,
      nav a:hover {
        background: #ecfeff;
        color: #0f766e;
      }

      @media (max-width: 760px) {
        .site-header {
          align-items: flex-start;
          flex-direction: column;
          padding: 14px 16px;
        }

        nav {
          justify-content: flex-start;
        }
      }
    `
  ]
})
export class HeaderComponent {}
