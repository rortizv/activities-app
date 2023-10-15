import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateActivityModalComponent } from './create-activity-modal/create-activity-modal.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateActivityModalComponent,
    ConfirmationDialogComponent,
    ActivityCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    DashboardModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
