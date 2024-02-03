import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[isInViewListener]'
})
export class IsInViewListener implements OnInit, OnDestroy {
  @Output() inView: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() classNameToAdd: string = '';

  private observer: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        this.elementRef.nativeElement.classList.add(this.classNameToAdd);
        this.inView.emit(entry.isIntersecting);
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.elementRef.nativeElement.classList.remove(this.classNameToAdd);
      this.observer.disconnect();
    }
  }
}
