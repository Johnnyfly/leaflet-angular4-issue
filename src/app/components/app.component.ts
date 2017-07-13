import * as app from '../imports';
import * as svc from '../services';

@app.Component({
    selector: "app",
    template: `<section class="app"><router-outlet></router-outlet></section>`
})
export class AppComponent {
}
