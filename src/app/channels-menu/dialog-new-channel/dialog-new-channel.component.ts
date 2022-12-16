import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-new-channel',
  templateUrl: './dialog-new-channel.component.html',
  styleUrls: ['./dialog-new-channel.component.scss']
})
export class DialogNewChannelComponent implements OnInit {
  newChannelForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogNewChannelComponent>,
    public firestore: FirestoreService) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.newChannelForm = new FormGroup({
      channelName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }

  createChannel() {
    if (this.newChannelForm.valid) {
      console.log(this.newChannelForm.value.channelName);
      this.newChannelForm.value.channelName = this.newChannelForm.value.channelName.toLowerCase();
      console.log(this.newChannelForm.value.channelName);
      this.firestore.addDoc(this.newChannelForm.value, 'channels')
      this.dialogRef.close();
    }
  }
}
