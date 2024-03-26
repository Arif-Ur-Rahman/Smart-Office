import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.css']
})
export class FabButtonComponent implements OnInit {

  @Input() check_modal:string |undefined;

  toChildMessage: string = "";

  @Output() myOutput: EventEmitter<string | undefined> = new EventEmitter();

  outPutMessage:string="open_modal";

  constructor() { }

  ngOnInit(): void {

  }

  onClickHandler(){ 
    // this.check_modal = 1;
    // alert(this.check_modal);

    this.myOutput.emit(this.outPutMessage);
    // console.log(this.outPutMessage)

   
  } 

}
