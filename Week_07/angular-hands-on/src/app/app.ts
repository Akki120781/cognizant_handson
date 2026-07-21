import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, HeaderComponent, NotificationComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly loadingService = inject(LoadingService);

  readonly isLoading$ = this.loadingService.isLoading$;
}
