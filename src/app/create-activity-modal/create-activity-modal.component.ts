import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity, ActivityType } from '../interfaces/activity';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.scss']
})
export class CreateActivityModalComponent implements OnInit {
  activityTypes: ActivityType[] = [
    { name: 'Actividad', value: 'ACTIVITY' },
    { name: 'Comida', value: 'FOOD' },
    { name: 'Fiesta', value: 'PARTY' },
    { name: 'Aprendizaje', value: 'LEARN' }
  ];
  activityForm: FormGroup;
  minDate: string = '';

  constructor(private dialogRef: MatDialogRef<CreateActivityModalComponent>,
              public configService: ConfigService,
              private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      startDate: [null],
      endDate: [null],
    });
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    this.minDate = today.toISOString().slice(0, 16);
  }

  ngOnInit() {
    if (this.configService.activity) {
      this.activityForm.patchValue(this.configService.activity);
    }
  }

  addActivity(): void {
    if (this.activityForm.valid) {
      const newActivity: Activity = this.activityForm.value;
      newActivity.status = 'PENDING';
      this.dialogRef.close(newActivity);
    }
  }

  save() {
    if (this.configService.isEditing) {
      this.editActivity();
    } else {
      this.addActivity();
    }
  }

  editActivity() {
    if (this.activityForm.valid) {
      const editedActivity: Activity = this.activityForm.value;
      editedActivity.status = 'PENDING';
      this.dialogRef.close(editedActivity);
    }
  }

  clearTitle(): void {
    this.activityForm.get('title')!.setValue('');
  }
}
