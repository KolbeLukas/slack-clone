import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from '../services/firestore.service';
import { DialogNewChannelComponent } from './dialog-new-channel/dialog-new-channel.component';

@Component({
  selector: 'app-channels-menu',
  templateUrl: './channels-menu.component.html',
  styleUrls: ['./channels-menu.component.scss']
})
export class ChannelsMenuComponent implements OnInit {
  toggleChannels = true;
  toggleDM = true;
  addChannels = false;
  addDM = false;
  channels$: any;

  constructor(public dialog: MatDialog,
    public firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getChannels();
  }

  getChannels() {
    this.channels$ = this.firestore.getCollection('channels', 'channelName');
    this.channels$.subscribe();

  }

  toggleChannelList() {
    if (this.toggleChannels) {
      this.toggleChannels = false;
    } else {
      this.toggleChannels = true;
    }
  }

  addNewChannel() {
    console.log('test')
    this.dialog.open(DialogNewChannelComponent, {
      width: '50%'
    });
  }

  toggleDMList() {
    if (this.toggleDM) {
      this.toggleDM = false;
    } else {
      this.toggleDM = true;
    }
  }
}