import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public isMobile: boolean;
  public showMenu: boolean;
  public showNavBar: boolean = true;

  constructor() {}
}
