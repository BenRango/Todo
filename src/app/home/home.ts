import { Component } from '@angular/core';
import { DashboardCard } from "../dashboard-card/dashboard-card";
import { TopBar } from "../top-bar/top-bar";

@Component({
  selector: 'app-home',
  imports: [DashboardCard, TopBar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  tabs = [
    { label: "Tableau de bord", route : "home", selected: true },
    { label: "Calendrier", route : "calendar", selected: false },
  ]

  cards = [
    { label: "Total de tâches", icon: "/icons/totalTasks.svg", value: 0},
    { label: "Tâches terminées", icon: "/icons/doneTasks.svg", value: 0},
    { label: "Tâches en attente", icon: "/icons/pendingTasks.svg", value: 0},
    { label: "Productivité globale", icon: "/icons/pendingTasks.svg", value: 0}
  ]
}
