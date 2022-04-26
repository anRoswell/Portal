import { Injectable } from '@angular/core';
import {
  faUser,
  faUserCog,
  faBell,
  faBuilding,
  faUserEdit,
  faUserCircle,
  faKey,
  faCogs,
  IconDefinition,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  obtenerIcon(icon:string):IconDefinition{
    
    switch (icon) {
      case 'faUser':
        return faUser
       
      case 'faUserCog':
          return faUserCog
         
      case 'faBell':
          return faBell
         
      case 'faBuilding':
          return faBuilding
         
      case 'faUserEdit':
          return faUserEdit
         
      case 'faUserCircle':
          return faUserCircle
         
      case 'faKey':
          return faKey
          
      case 'faCogs':
          return faCogs
         
      case 'faTimes':
            return faTimes
      default:
        return faTimes
        
    }
  }

}
