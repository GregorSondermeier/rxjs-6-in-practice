import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // stream emits mouse click events, never completes
    document.addEventListener('click', evt => {
      console.log(evt);

      // stream emits once after 3 seconds, then completes
      setTimeout(() => {
        console.log('finished...');

        // stream emits new values after 1 second, never completes
        let counter = 0;
        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000);
        
      }, 3000);
    });
  }

}
