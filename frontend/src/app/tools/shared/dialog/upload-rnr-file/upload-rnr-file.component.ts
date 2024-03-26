import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-rnr-file',
  templateUrl: './upload-rnr-file.component.html',
  styleUrls: ['./upload-rnr-file.component.css']
})
export class UploadRnrFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
