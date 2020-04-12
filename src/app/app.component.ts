import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamesArena';
  arrOfLists:any =[];
  page: number = 1;
  limit: number = 5;
  list: any[];
  totalItems: number;
  config = {
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: 0
  };
  filter = '';
  key: string = 'name'; //set default
  reverse: boolean = false;
  order = 'info.name';
  searchSortInput = {
    title: '',
  };
  actualList:any =[];
  closeIcon:boolean = false;
  constructor(private http: Http) { }
  ngOnInit() {
    // this.http.get("http://jsonplaceholder.typicode.com/users").
    //   map((response) ⇒ response.json()).
    //   subscribe((data) ⇒ console.log(data))
    this.getLists(this.config.currentPage, this.config.itemsPerPage);
  }
  getLists(page: number, limit: number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*");
    let options = new RequestOptions({ headers: headers, });

    this.http.get(`http://starlord.hackerearth.com/gamesarena`, options).subscribe((res:any)=>{
      this.arrOfLists = res.json();
      this.arrOfLists.splice(this.arrOfLists[0],1);
      this.actualList = this.arrOfLists;
      // this.actualList = this.arrOfLists.splice(this.arrOfLists[0], 1)
      // this.totalItems = res.totalItems;
      this.page = page;
      console.log('this.arrOfLists', this.arrOfLists)
      this.setOrder('');
    })
  }
  pageChanged(event){
    this.config.currentPage = event;
    this.getLists(this.config.currentPage,this.config.itemsPerPage);
  }
  setOrder(value: string) {
    switch (value) {
      case 'name': {
        this.arrOfLists.sort(function (a, b) {
          return a.score - b.score;
        })
        this.reverse = !this.reverse;
        this.order = value;
        break;
      }
 
    }
    if (value == '') {
      this.arrOfLists.sort(function (a, b) {
        return a.score - b.score;
      })
    }
  }
  searchByName(filterSearchInput, searchType) {
    switch (searchType) {
      case 'title': {
        if (filterSearchInput == '') {
          this.arrOfLists = this.actualList;
          this.closeIcon = false;
        } else {
          this.closeIcon = true;
          this.arrOfLists = this.actualList.filter((trainer) => {
            console.log('trainer', trainer)
            return trainer.title.toLowerCase().includes(filterSearchInput.toLowerCase());
          });
        }
        break;
      }
    }
  }
  reset(){
    this.searchSortInput.title ='';
    this.closeIcon = false;
    this.arrOfLists = this.actualList;
  }


}
