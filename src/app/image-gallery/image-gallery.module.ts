import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ImagesComponent } from './containers/images/images.component';
import { LoaderComponent } from '../components/shared/loader.component';

import { LazyLoadDirective } from '../directives/lazy-load.directive';

import { ImageGalleryService } from './image-gallery.service';
import { LoaderService } from '../services/loader.service';

import { LoaderInterceptor } from '../interceptors/loader.interceptor';

@NgModule({
  declarations: [ImagesComponent, LoaderComponent, LazyLoadDirective],
  imports: [CommonModule, HttpClientModule],
  exports: [ImagesComponent, LoaderComponent, LazyLoadDirective],
  providers: [
    ImageGalleryService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class ImageGalleryModule {}
