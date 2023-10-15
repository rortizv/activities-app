import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../interfaces/activity';
import { ConfigService } from '../services/config.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateActivityModalComponent } from '../create-activity-modal/create-activity-modal.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {
  @Output() activityEdited: EventEmitter<void> = new EventEmitter<void>();
  @Input() activity: Activity = {} as Activity;

  todoList: Activity[] = [];
  todayList: Activity[] = [];
  tomorrowList: Activity[] = [];
  dayAfterTomorrowList: Activity[] = [];

  constructor(public configService: ConfigService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  editActivity(activity: Activity): void {
    this.configService.isEditing = true;
    this.configService.activity = activity;
    const dialogRef = this.dialog.open(CreateActivityModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.configService.activity = {} as Activity;
      if (result) {

        this.configService.activities.push(result);
        this.activityEdited.emit();
        this._snackBar.open('Actividad editada satisfactoriamente', 'Cerrar', {
          duration: 4000,
        });
        this.configService.isEditing = false;
      }
    });
  }

  drag(event: DragEvent, activity: Activity) {
    event.dataTransfer!.setData('text', activity.activityId);
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
    const index = this.configService.activities.findIndex((a) => a.activityId === activity.activityId);
    if (index >= 0) {
      this.configService.activities.splice(index, 1);
      this._snackBar.open('Actividad eliminada satisfactoriamente', 'Cerrar', {
        duration: 4000,
      });
    }
  }

}
