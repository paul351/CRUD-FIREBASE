import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showfiles',
  templateUrl: './showfiles.component.html',
  styleUrls: ['./showfiles.component.less']
})
export class ShowfilesComponent implements OnInit {
  selected
  constructor() { }

  ngOnInit(): void {
    console.log(this.selected);

  }

}
