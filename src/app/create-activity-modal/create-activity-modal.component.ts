import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Activity } from '../interfaces/activity';

@Component({
  selector: 'app-create-activity-modal',
  templateUrl: './create-activity-modal.component.html',
  styleUrls: ['./create-activity-modal.component.scss']
})
export class CreateActivityModalComponent implements OnInit {
  activityTypes: string[] = ['ACTIVITY', 'PARTY', 'FOOD'];
  activityForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateActivityModalComponent>,
    private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      startDate: [null],
      endDate: [null],
    });
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
