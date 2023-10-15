import { Component, OnInit } from '@angular/core';
import { Activity, ActivityStatus, ActivityType } from '../interfaces/activity';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateActivityModalComponent } from '../create-activity-modal/create-activity-modal.component';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  today = new Date();
  tomorrow = new Date();
  dayAfterTomorrow = new Date();

  todoList: Activity[] = [];
  todayList: Activity[] = [];
  tomorrowList: Activity[] = [];
  dayAfterTomorrowList: Activity[] = [];

  activityTypes: ActivityType[] = [
    { name: 'Actividad', value: 'ACTIVITY' },
    { name: 'Comida', value: 'FOOD' },
    { name: 'Fiesta', value: 'PARTY' },
    { name: 'Aprendizaje', value: 'LEARN' }
  ];

  activityStatus: ActivityStatus[] = [
    { name: 'Pendiente', value: 'PENDING' },
    { name: 'En progreso', value: 'IN_PROGRESS' },
    { name: 'Hecho', value: 'DONE' }
  ];

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

  constructor(private dialog: MatDialog,
    private confirmationDialogService: ConfirmationDialogService,
    public configService: ConfigService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTodoList();
    this.getTodayList();
    this.getTomorrowList();
    this.getDayAfterTomorrowList();
    this.calcDates();
  }

  openCreateActivityDialog(): void {
    this.configService.isEditing = false;
    const dialogRef = this.dialog.open(CreateActivityModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        result.id
        this.saveActivity(result);
      }
    });
  }

  calcDates() {
    const currentDate = new Date();

    // Calcula la fecha de mañana
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    // Calcula la fecha de pasado mañana
    const dayAfterTomorrowDate = new Date(currentDate);
    dayAfterTomorrowDate.setDate(currentDate.getDate() + 2);

    // Setea las horas a 0 para que no afecten en la comparación
    tomorrowDate.setHours(0, 0, 0, 0);
    dayAfterTomorrowDate.setHours(0, 0, 0, 0);

    this.tomorrow = tomorrowDate;
    this.dayAfterTomorrow = dayAfterTomorrowDate;
  }

  saveActivity(activity: Activity): void {
    let id = uuidv4();
    activity.activityId = id;
    this.activities.push(activity);
    this._snackBar.open('Actividad creada satisfactoriamente', 'Cerrar', {
      duration: 4000,
    });
  }

  startDateIs(dateReceived: any, when: string): boolean {
    if (dateReceived && typeof dateReceived === 'string') {
      const datePartReceived = dateReceived.substring(0, 10);

      if (when === 'today' && datePartReceived === this.today.toISOString().substring(0, 10)) {
        const todayDatePart = this.today.toISOString().substring(0, 10);
        return true;
      }

      if (when === 'tomorrow' && datePartReceived === this.tomorrow.toISOString().substring(0, 10)) {
        const tomorrowDatePart = this.tomorrow.toISOString().substring(0, 10);
        return true;
      }

      if (when === 'dayAfterTomorrow' && datePartReceived === this.dayAfterTomorrow.toISOString().substring(0, 10)) {
        const dayAfterTomorrowDatePart = this.dayAfterTomorrow.toISOString().substring(0, 10);
        return true;
      }

    }

    return false;
  }

  hasStartDate(activity: Activity): boolean {
    if (activity.startDate === null || activity.startDate === undefined || activity.startDate === '') {
      return false;
    } else {
      return true;
    }
  }

  getTodoList() {
    this.todoList = this.activities.filter(activity => !this.hasStartDate(activity));
  }

  getTodayList() {
    this.todayList = this.activities.filter(activity => this.startDateIs(activity.startDate, 'today'));
  }

  getTomorrowList() {
    this.tomorrowList = this.activities.filter(activity => this.startDateIs(activity.startDate, 'tomorrow'));
  }

  getDayAfterTomorrowList() {
    this.dayAfterTomorrowList = this.activities.filter(activity => this.startDateIs(activity.startDate, 'dayAfterTomorrow'));
  }

  countActivitiesWithNoStartDate(): number {
    let filteredActivities = this.activities.filter(activity => !this.hasStartDate(activity));
    this.todoList = filteredActivities;
    return filteredActivities.length;
  }

  countActivitiesForToday(): number {
    let filteredActivities = this.activities.filter(activity => this.startDateIs(activity.startDate, 'today'));
    this.todayList = filteredActivities;
    return filteredActivities.length;
  }

  countActivitiesForTomorrow(): number {
    let filteredActivities = this.activities.filter(activity => this.startDateIs(activity.startDate, 'tomorrow'));
    this.tomorrowList = filteredActivities;
    return filteredActivities.length;
  }

  countActivitiesForDayAfterTomorrow(): number {
    let filteredActivities = this.activities.filter(activity => this.startDateIs(activity.startDate, 'dayAfterTomorrow'));
    this.dayAfterTomorrowList = filteredActivities;
    return filteredActivities.length;
  }

  drag(event: DragEvent, activity: Activity) {
    event.dataTransfer!.setData('text', activity.activityId);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, column: string) {
    event.preventDefault();
    const activityId = event.dataTransfer!.getData('text');
    const activity = this.activities.find((a) => a.activityId === activityId);

    if (activity) {
      if (column === 'today') {
        activity.startDate = new Date().toISOString();
        activity.endDate = new Date().toISOString();
        let index = this.activities.findIndex((a) => a.activityId === activity.activityId);
        if (index >= 0) {
          this.activities[index].startDate = new Date().toISOString();
          this.activities[index].endDate = new Date().toISOString();
        }
      } else if (column === 'tomorrow') {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let aux = tomorrow;
        tomorrow.setHours(0, 0, 0, 0);
        activity.startDate = tomorrow.toISOString();
        activity.endDate = tomorrow.toISOString();
        const index = this.activities.findIndex((a) => a.activityId === activity.activityId);
        if (index >= 0) {
          this.activities[index].startDate = aux.toISOString();
          this.activities[index].endDate = aux.toISOString();
        }
      } else if (column === 'dayAfterTomorrow') {
        let dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        let aux = dayAfterTomorrow;
        dayAfterTomorrow.setHours(0, 0, 0, 0);
        activity.startDate = dayAfterTomorrow.toISOString();
        activity.endDate = dayAfterTomorrow.toISOString();
        const index = this.activities.findIndex((a) => a.activityId === activity.activityId);
        if (index >= 0) {
          this.activities[index].startDate = aux.toISOString();
          this.activities[index].endDate = aux.toISOString();
        }
      }
      this._snackBar.open('Actividad movida satisfactoriamente', 'Cerrar', {
        duration: 2500,
      });
      this.updateLists();
    }
  }

  updateLists() {
    this.getTodoList();
    this.getTodayList();
    this.getTomorrowList();
    this.getDayAfterTomorrowList();
  }

  editActivity(activity: Activity): void {
    this.configService.isEditing = true;
    this.configService.activity = activity;
    const dialogRef = this.dialog.open(CreateActivityModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.configService.activity = {} as Activity;
      if (result) {
        this.activities.push(result);
        this.updateLists();
        this._snackBar.open('Actividad editada satisfactoriamente', 'Cerrar', {
          duration: 4000,
        });
        this.configService.isEditing = false;
      }
    });
  }

  deleteActivity(activity: Activity): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: '¿Estás seguro que deseas eliminar esta actividad?'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.configService.activity = {} as Activity;
      if (result) {
        this.deleteActivityFromList(activity);
      }
    });
  }

  deleteActivityFromList(activity: Activity): void {
    const index = this.activities.findIndex((a) => a.activityId === activity.activityId);
    if (index >= 0) {
      this.activities.splice(index, 1);
      this._snackBar.open('Actividad eliminada satisfactoriamente', 'Cerrar', {
        duration: 4000,
      });
    }
  }

}
