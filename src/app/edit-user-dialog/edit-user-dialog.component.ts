import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RemoveImgDialogComponent } from '../remove-img-dialog/remove-img-dialog.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  selectedFile:any;
  foods: any;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private http: HttpClient) { }


  ngOnInit(): void {
  }

  openImgRemoveDialog() {
    this.dialog.open(RemoveImgDialogComponent);
    this.dialogRef.close(EditUserDialogComponent);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
   const fd = new FormData();
   fd.append('image', this.selectedFile, this.selectedFile.name);
   this.http.post('https://console.firebase.google.com/project/slack-clone-922d6/storage/slack-clone-922d6.appspot.com/files', this.selec)
   .subscribe(res =>{
    console.log(res);
   })
  }


  closeDialog() {
    this.dialogRef.close();
  }


}
