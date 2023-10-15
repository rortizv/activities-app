import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  isEditing: boolean = false;
  activity: Activity = {} as Activity;

  activities: Activity[] = [
    {
      "activityId": 'f33e710f-de10-4f69-a533-ce2011dc1c83',
      "title": "Subida al cerro catedral con los pibes porque donde mi mama no hay comida y esto ya esta mal",
      "type": "ACTIVITY",
      "startDate": "2023-10-15 01:30:00",
      "endDate": "2023-10-22 23:30:00",
      "status": "IN_PROGRESS",
    },
    {
      "activityId": '0a319932-daef-4cb9-b7dc-9be737f9760a',
      "title": "Fiesta de espuma donde Jack",
      "type": "PARTY",
      "startDate": "2023-10-16 20:30:00",
      "endDate": "2023-10-17 05:30:00",
      "status": "DONE",
    },
    {
      "activityId": '79412dac-223b-4374-a8be-40b92b6abfab',
      "title": "Desayuno con Martha",
      "type": "FOOD",
      "startDate": null,
      "endDate": null,
      "status": null,
    },
    {
      "activityId": '88812dac-111b-444-a8be-40b00x0abdet',
      "title": "Aprender Angular 16",
      "type": "LEARN",
      "startDate": "2023-10-17 09:30:00",
      "endDate": "2023-10-17 11:30:00",
      "status": 'PENDING',
    },
    {
      "activityId": 'bd686b2c-4b72-403a-ae4c-903da93ad945',
      "title": "Ir al mall a comprar ropa",
      "type": "ACTIVITY",
      "startDate": null,
      "endDate": null,
      "status": null,
    },
    {
      "activityId": '850890e1-b423-49db-862f-afd7586535b3',
      "title": "Preparar cena para invitados",
      "type": "FOOD",
      "startDate": "2023-10-17 16:30:00",
      "endDate": "2023-10-17 18:30:00",
      "status": null,
    }
  ];

  constructor() { }
}
