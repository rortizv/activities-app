import { Component, OnInit } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateActivityModalComponent } from '../create-activity-modal/create-activity-modal.component';
import { ConfigService } from '../services/config.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statusArray = [
    { 'name': 'Pendiente', 'value': 'PENDING' },
    { 'name': 'En progreso', 'value': 'IN_PROGRESS' },
    { 'name': 'Finalizado', 'value': 'DONE' }
  ];

  activities: Activity[] = [
    {
      "activityId": 'f33e710f-de10-4f69-a533-ce2011dc1c83',
      "title": "Subida al cerro catedral",
      "type": "ACTIVITY",
      "startDate": "2022-01-22 01:30:00",
      "endDate": "2022-01-22 23:30:00",
      "status": "IN_PROGRESS",
    },
    {
      "activityId": '0a319932-daef-4cb9-b7dc-9be737f9760a',
      "title": "Fiesta de espuma",
      "type": "PARTY",
      "startDate": "2022-01-22 01:30:00",
      "endDate": "2022-01-22 23:30:00",
      "status": "DONE",
    },
    {
      "activityId": '79412dac-223b-4374-a8be-40b92b6abfab',
      "title": "Desayuno",
      "type": "FOOD",
      "startDate": null,
      "endDate": null,
      "status": null,
    }
  ];

  constructor(public configService: ConfigService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit() { }

  openCreateActivityDialog(): void {
    const dialogRef = this.dialog.open(CreateActivityModalComponent, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        result.id
        this.saveActivity(result);
      }
    });
  }

  saveActivity(activity: Activity): void {
    let id = uuidv4();
    activity.activityId = id;
    this.activities.push(activity);
    this._snackBar.open('Actividad creada satisfactoriamente', 'Cerrar', {
      duration: 3000,
    });
    console.log(this.activities);
  }

}
