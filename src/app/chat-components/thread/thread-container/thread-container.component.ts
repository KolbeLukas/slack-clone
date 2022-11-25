import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, toArray } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.scss']
})
export class ThreadContainerComponent implements OnInit {
  chats$!: Observable<any>;
  answers$!: Observable<any>;
  chats : any = [];
  id: any;

  collection: string = 'threads';

  constructor(private firestore: AngularFirestore, public dialog: MatDialog, private chatservices: ChatService, private fireService: FirestoreService) { }

  ngOnInit(): void {
    this.chatservices.name.subscribe(id => this.id = id);

    this.answers$ = this.fireService.getCollection('threads', 'chatDate').pipe(
      map(chat => chat.filter((chat : any) => chat.chatId == this.id)),
    )

    this.chats$ = this.fireService.getDocByID(this.id, "chat");
  }
}

