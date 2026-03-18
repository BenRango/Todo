import { Component, inject, input } from '@angular/core';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  smallScreenMode = false;
  isMenuOpen = false;
  private screenSizeService = inject(ScreenSizeService);
  get isSmall() {
    return this.screenSizeService.isSmallScreen();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  tabs = input([
    { label: "Tableau de bord", route : "home", selected: true },
    { label: "Calendrier", route : "calendar", selected: false },
    { label: "Projets", route:"", selected: false },
  ])
}
