import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.scss']
})
export class CardTemplateComponent implements OnInit {

  constructor() { }

  @ViewChild('cardTemplate') template;

  ngOnInit() {
  }

}
