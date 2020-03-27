import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

import { LoaderService } from '../services/loader.service';

import { AnimationBuilder, style, animate } from '@angular/animations';

const OFFSET_HEIGHT = 200;

@Directive({
  selector: 'img[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
  @HostBinding('attr.src') srcAttr: string = '';
  @Input() src: string;

  constructor(
    private el: ElementRef,
    private _builder: AnimationBuilder,
    private loaderService: LoaderService
  ) {}

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  private canLazyLoad(): boolean {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(
      entries => {
        this.loaderService.show();
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            this.makeAnimation(this.el.nativeElement);
            obs.unobserve(this.el.nativeElement);
          } else {
            this.srcAttr = '../assets/images/default-image.png';
          }
        });
      },
      { rootMargin: '0px 0px ' + OFFSET_HEIGHT + 'px 0px' }
    );
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
  }

  private makeAnimation(element: any) {
    const myAnimation = this._builder.build([
      style({ width: 0, opacity: 0 }),
      animate(500, style({ width: '100%', opacity: 1 }))
    ]);

    const player = myAnimation.create(element);
    player.play();
  }
}
