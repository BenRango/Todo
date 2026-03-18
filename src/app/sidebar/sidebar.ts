import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  tabs = input([
    { label: "Tableau de bord", route : "home", selected: true },
    { label: "Calendrier", route : "calendar", selected: false },
    { label: "Projets", route:"", selected: false },
  ])
}
