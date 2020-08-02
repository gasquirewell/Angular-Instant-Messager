import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public userName = 'Gerry';

  constructor() { }

  /**
   * Can have the logic to ask the user for userName he/she wants to use
   * and set value for the above variable
   */
}
