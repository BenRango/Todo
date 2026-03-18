import { Component, input } from '@angular/core';
import { DashboardCardInterface } from '../dashboard-card-interface';

@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.scss',
})
export class DashboardCard {
  card = input<DashboardCardInterface>()
}
