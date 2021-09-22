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

  products;
  searchText;
  constructor(private giphy: GiphyService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  filter={
  query:'',
  limit:20
}
  ngOnInit(): void {
    this.giphy.getGif(this.filter).pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      debugger;
      console.log(data);
      this.products = data['data'];
    });  
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
