import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GlobalMessageService } from '../../services/global-message.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [AsyncPipe],
  providers: [NotificationService],
  template: `
    @if (message$ | async; as message) {
      <aside class="toast" role="status">
        <span>{{ message }}</span>
        <button type="button" (click)="clear()">Dismiss</button>
      </aside>
    }
  `,
  styles: [
    `
      .toast {
        align-items: center;
        background: #ffffff;
        border: 1px solid #fecaca;
        border-left: 4px solid #ef4444;
        border-radius: 8px;
        bottom: 68px;
        box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
        display: flex;
        gap: 12px;
        justify-content: space-between;
        max-width: min(420px, calc(100vw - 32px));
        padding: 12px 14px;
        position: fixed;
        right: 20px;
        z-index: 30;
      }

      button {
        background: #fee2e2;
        border-radius: 6px;
        color: #991b1b;
        font-weight: 700;
        min-height: 32px;
        padding: 0 10px;
      }
    `
  ]
})
export class NotificationComponent {
  private readonly globalMessages = inject(GlobalMessageService);
  // Component providers create a separate NotificationService instance scoped to this component tree.
  private readonly scopedNotifications = inject(NotificationService);

  readonly message$ = this.globalMessages.message$;

  constructor() {
    this.scopedNotifications.add('Notification component ready');
  }

  clear(): void {
    this.globalMessages.clear();
  }
}
