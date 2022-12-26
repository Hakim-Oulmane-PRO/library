import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-disconnet-dialog',
  templateUrl: './disconnet-dialog.component.html',
  styleUrls: ['./disconnet-dialog.component.css']
})
export class DisconnetDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DisconnetDialogComponent>) {
  }
}
