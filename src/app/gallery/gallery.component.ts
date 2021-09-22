import { Component, OnInit,OnDestroy, ViewEncapsulation  } from '@angular/core';
import { GiphyService } from '../services/giphy.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class GalleryComponent implements OnInit,OnDestroy  {
  p: number = 1;

  products;
  searchText;
  pagination;
  constructor(private giphy: GiphyService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter={
  query:'',
  offset:0,
  limit:20
}
  ngOnInit(): void {
   this.getGiphy(this.filter);
  }

  paging(evnt){
    debugger;
    this.filter.offset=evnt;
    this.getGiphy(this.filter);
  }

getGiphy(filter){
  this.giphy.getGif(filter).pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
    debugger;
    console.log(data);
    this.products = data['data'];
    this.pagination=data["pagination"];
  });  
}

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
