import { Component } from '@angular/core';
/**
 * Parent component , where the other components load in <router-outlet>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newsApp';
}
