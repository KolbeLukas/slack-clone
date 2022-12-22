import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../user-components/edit-user-dialog/edit-user-dialog.component';
import { User } from 'src/models/user.class';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';


interface theTime {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-adjust-status',
  templateUrl: './adjust-status.component.html',
  styleUrls: ['./adjust-status.component.scss']
})

export class AdjustStatusComponent implements OnInit {

  loading: boolean = false;
  user!: User;
  authUserdata!: any; // notw. wenn eigenschaften geändert werden die auch in Auth DB stehen (uid, email, pw, displayName)

  

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private authService: AuthService,
    private fireService: FirestoreService,
  ) { }

  ngOnInit(): void {

  }

  oneMinute = 60;
  halfHour = this.oneMinute * 30;
  oneHour = this.oneMinute * 60;
  oneDay = this.oneHour * 12;
  oneWeek = this.oneDay * 7;

  quickInput = [{

    "emoji": "📅",
    "status": "In einem Meeting",
    "time": "1 Stunde",
  },
  {

    "emoji": "🚌",
    "status": "Unterwegs",
    "time": "30 Minuten",
  },
  {

    "emoji": "🤒",
    "status": "Krank",
    "time": "Heute",
  },
  {

    "emoji": "🌴",
    "status": "Im Urlaub",
    "time": "nicht löschen",
  },
  {

    "emoji": "🏠",
    "status": "Home-Office",
    "time": "Heute",
  },];

  times: theTime[] = [
    { value: this.halfHour, viewValue: '30 Minuten' },
    { value: this.oneHour, viewValue: 'eine Stunde' },
    { value: this.oneDay, viewValue: 'ein Tag' },
    { value: this.oneWeek, viewValue: 'eine Woche' },
  ];

  //Emoji picker code
  public newStatus: string = '';
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.newStatus = `${this.newStatus}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }
  // Emoji picker code


  oneHourIntervall() {
    setTimeout((this.deleteStatus), this.oneHour);
  }


  saveEdit() {
    // Todo form validations: verify & sanitize inputs? & then:
  this.user.status = this.newStatus;
   this.getUpdateData();
   this.updateAuthDB();
  }

  updateAuthDB() {
    this.loading = true;
    //if Status is changed:
    this.authService.saveUserData(this.authUserdata)
      .then(() => this.updateDatabase())
      .catch((error) => console.log('%c' + error, 'color: orange'))
      .finally(() => this.loading = false);
  }

  updateDatabase() {
    this.fireService.createOrUpdateDoc(this.getUpdateData(), this.authUserdata.uid, 'users') // TODO: TEST - check function
      .then(() => console.log('%c' + 'SUCCESS - updated user: ', 'color: yellow; background-color: indigo', this.user))
      .catch((error) => console.log('%c' + error, 'color: orange'))
      .finally(() => {
        this.closeDialog();
      });
  }

  getUpdateData() {
    // TODO maybe check which properties are updated
    return this.user.setUserData()
  }

  closeDialog() {
    this.dialogRef.close();
  }



  deleteStatus() {

  }
}

