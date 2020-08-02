import { SharedService } from './../service/shared.service';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  allPosts: Post[] = [];

  constructor(private data: DataService, private shared: SharedService) { }


  ionViewDidEnter() {
   this.data.getAllPosts().subscribe(list => {
     console.log('exc subscription', list);

     list = list.filter(p => p.to =="Everyone"
            || p.from == this.shared.userName || p.to == this.shared.userName);



     this.allPosts = list.sort(function(left, right){
       if (left.timeStamp > right.timeStamp){
         return -1;
       }
       else{
         return -1;
       }
     });
   });
  }



  /**
   * inject data service
   * get the data from the dataService
   * put the array in a global variable
   * access the variable from *ngFor on the html
   * display the text of the message
   */
}
