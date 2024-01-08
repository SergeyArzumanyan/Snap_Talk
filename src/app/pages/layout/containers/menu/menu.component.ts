import { NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgClass,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public pageTitle: string;
  public isHeaderAbsolute: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.setMenuHeader();
    this.subscribeToRouteChanges();
  }

  private setMenuHeader(): void {
    this.pageTitle = this.route.snapshot.firstChild?.routeConfig?.path || '';
    this.isHeaderAbsolute = this.route.snapshot.firstChild?.data['isHeaderAbsolute'] || false;
  }

  private subscribeToRouteChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: () => this.setMenuHeader(),
      });
  }
}
