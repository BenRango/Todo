import { Component, inject } from '@angular/core';
import { DashboardCard } from "../dashboard-card/dashboard-card";
import { TopBar } from "../top-bar/top-bar";
import { Welcome } from "../welcome/welcome";
import { TaskAdder } from "../task-adder/task-adder";
import { DashboardNavBar } from "../dashboard-nav-bar/dashboard-nav-bar";
import { Sidebar } from "../sidebar/sidebar";
import { TaskContainer } from "../task-container/task-container";
import { DashboardCardInterface } from '../dashboard-card-interface';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-home',
  imports: [ DashboardCard, TopBar, Welcome, TaskAdder, DashboardNavBar, Sidebar, TaskContainer ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  screenSizeService = inject(ScreenSizeService)
  get isSmall() {
    return this.screenSizeService.isSmallScreen();
  }
  tabs = [
    { label: "Tableau de bord", route : "home", selected: true },
    { label: "Calendrier", route : "calendar", selected: false },
    { label: "Projets", route:"", selected: false },
  ]

  cards : DashboardCardInterface[]= [
    { label: "Total de tâches", icon: "/icons/totalTasks.svg", value: 0 },
    { label: "Tâches terminées", icon: "/icons/doneTasks.svg", value: 0 },
    { label: "Tâches en attente", icon: "/icons/pendingTasks.svg", value: 0 },
    { label: "Productivité", icon: "/icons/productivityIcon.svg", value: "Globale", after: true }
  ]
}
