import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { increment, decrement, reset } from '../../state/counter.actions';


@Component({
  selector: 'app-form-components',
  templateUrl: './form-components.component.html',
  styleUrls: ['./form-components.component.scss']
})
export class FormComponentsComponent implements OnInit {
  // count$: Observable<number>;
  
  // constructor(private store: Store<{ count: number }>) {
  //   this.count$ = store.select('count');
  // }
  constructor() {
  }

  value: any ;
  checkLineValue: any ;
  dateData = new Date("2022-03-25");
  dateVal  =new Date();

  val = 'datalar';

  ngOnInit(): void {
    console.log(this.dateVal)
    console.log(this.dateData)
  }

  increment() {
    // this.store.dispatch(increment());
  }

  decrement() {
    // this.store.dispatch(decrement());
  }

}
