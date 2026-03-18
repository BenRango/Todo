import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSizeSubject = new BehaviorSubject<number>(1024); 
  public screenSize$: Observable<number> = this.screenSizeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenSizeSubject.next(window.innerWidth);

      window.addEventListener('resize', () => {
        this.screenSizeSubject.next(window.innerWidth);
      });
    }
  }

  isSmallScreen(): boolean {
    return this.screenSizeSubject.value <= 768;
  }
}