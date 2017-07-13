import * as app from '../imports';
import * as svc from '../services';

@app.Component({
    selector: "map",
    template: `<section class="map"><div id="map"></div></section>`
})
export class MapComponent {

    constructor(private mapService: svc.MapService) { }

    ngOnInit() {
        this.mapService.init('map');
    }
}
