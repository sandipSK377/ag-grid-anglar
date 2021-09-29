import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss']
})
export class AccordianComponent implements OnInit {
  flagId: any;
  toggle: boolean = true;
  tableData: any[] = [
    {
      id: 1,
      head: 'collapse one',
      text: 'this is text content 1'
    },
    {
      id: 2,
      head: 'collapse two',
      text: 'this is text content 2'
    },
    {
      id: 3,
      head: 'collapse three',
      text: 'this is text content 3'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.flagId = this.tableData[0].id;
  }
  toogleCollapse(id) {
    if (id == this.flagId) {
      this.flagId = -1;
    } else {
      this.flagId = id;
    }

  }

  toggleAll() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      let matches: any = document.querySelectorAll("div.card-body");
      for (let node of matches) {
        node.setAttribute('hidden', 'true');
      }
    } else {
      let matches: any = document.querySelectorAll("div.card-body");
      for (let node of matches) {
        node.removeAttribute('hidden');
      }
    }


  }

}
