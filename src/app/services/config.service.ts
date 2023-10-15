import { Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  isEditing: boolean = false;
  activity: Activity = {} as Activity;

  constructor() { }
}
