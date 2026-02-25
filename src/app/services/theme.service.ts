import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  mode = false
  tries = 0
  constructor() { }
}
