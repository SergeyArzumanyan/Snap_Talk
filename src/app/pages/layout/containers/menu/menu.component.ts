import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public pageTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: () => this.pageTitle = this.route.snapshot.firstChild?.routeConfig?.path || '',
      });

  }
}
