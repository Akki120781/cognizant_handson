import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private readonly messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
  }

  all(): string[] {
    return [...this.messages];
  }
}
