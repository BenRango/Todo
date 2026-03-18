import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav-bar',
  imports: [],
  templateUrl: './dashboard-nav-bar.html',
  styleUrl: './dashboard-nav-bar.scss',
})
export class DashboardNavBar {
  tabs = input([
    {
      label : "Toutes les tâches", 
      selected: true,
      action : ()=>{
        alert("Toutes les tâches")
      }
    },
    {
      label : "À faire",
      selected: false, 
      action : ()=>{
        alert("À faire")
      }
    },
    {
      label : "Tâches terminées", 
      selected: false,
      action : ()=>{
        alert("Tâches terminées")
      }
    }

  ])
}
