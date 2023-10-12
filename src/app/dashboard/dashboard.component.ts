import { Component, OnInit } from '@angular/core';
import { Activity } from '../interfaces/activity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activities: Activity[] = [
    {
      "activityId": 1,
      "title": "Subida al cerro catedral",
      "type": "ACTIVITY",
      "startDate": "2022-01-22 01:30:00",
      "endDate": "2022-01-22 23:30:00",
      "status": "IN_PROGRESS",
    },
    {
      "activityId": 2,
      "title": "Fiesta de espuma",
      "type": "PARTY",
      "startDate": "2022-01-22 01:30:00",
      "endDate": "2022-01-22 23:30:00",
      "status": "DONE",
    },
    {
      "activityId": 3,
      "title": "Desayuno",
      "type": "FOOD",
      "startDate": null,
      "endDate": null,
      "status": null,
    }
  ];

  constructor() { }

  ngOnInit() { }

}
