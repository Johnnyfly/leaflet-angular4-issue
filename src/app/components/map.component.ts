import * as app from '../imports';
import * as svc from '../services';
import * as cmp from '../components';

@app.Component({
    selector: "map",
    template: `<section class="map"><div id="map"></div></section>`,
})
export class MapComponent {

    marker: any;
    compRef: app.ComponentRef<cmp.PopupComponent>;

    constructor(
        private mapService: svc.MapService,
        private injector: app.Injector,
        private appRef: app.ApplicationRef,
        private resolver: app.ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.mapService.init('map');
        this.mapService.component = cmp.PopupComponent;
        this.mapService.appRef = this.appRef;
        this.mapService.compRef = this.compRef;
        this.mapService.injector = this.injector;
        this.mapService.resolver = this.resolver;
        this.marker = this.mapService.addMarker();
    }
}
