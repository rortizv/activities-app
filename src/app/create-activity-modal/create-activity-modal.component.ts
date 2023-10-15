import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Activity, ActivityType } from '../interfaces/activity';

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

  constructor(
    private dialogRef: MatDialogRef<CreateActivityModalComponent>,
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

  ngOnInit() {}

  addActivity(): void {
    if (this.activityForm.valid) {
      const newActivity: Activity = this.activityForm.value;
      newActivity.status = 'PENDING';
      this.dialogRef.close(newActivity);
    }
  }

  clearTitle(): void {
    this.activityForm.get('title')!.setValue('');
  }
}
