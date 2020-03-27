import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ImageGalleryService } from '../../image-gallery.service';
import { LoaderService } from '../../../services/loader.service';

import { Image } from '../../models/images.interface';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, AfterViewChecked, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  images: Image[];

  constructor(
    private imagesService: ImageGalleryService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.fetchImages();
  }

  ngAfterViewChecked() {
    this.loaderService.hide();
  }

  fetchImages() {
    this.imagesService
      .getImages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: Image[]) => (this.images = res));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
