import {Injectable} from "@angular/core";
import {addIcons} from "ionicons";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  homeOutline,
  homeSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  personAddOutline,
  personAddSharp,
  shieldOutline, shieldSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp
} from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor(){
    addIcons({
      mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp,
      archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp,
      bookmarkOutline, bookmarkSharp, logInOutline, logInSharp, logOutOutline, logOutSharp,
      homeOutline, homeSharp, personAddOutline, personAddSharp,
      shieldOutline, shieldSharp
    });
  }
}
