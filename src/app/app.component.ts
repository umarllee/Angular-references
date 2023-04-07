import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myPortfolio';
  // constructor(private elRef: ElementRef) { }


  ngOnInit() {

    let container = document.getElementById('loader');
    let span  = document.getElementById('loaderSpan');
    let time = 0;

    var timer = function () {
      return setInterval(() => {
        container?.classList.add('loaderContainer');
        time = time + 1;

        if (time > 2) {
          container?.classList.remove('loaderContainer')
          container?.classList.add('hideLoaderClass')
          span?.classList.remove('loader')
          clearInterval(timer());
        }
      }, 1000);
    }

    timer();
  }

}
