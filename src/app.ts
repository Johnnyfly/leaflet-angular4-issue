import 'leaflet';
import './main.scss';
import "reflect-metadata";
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Component, NgModule, ComponentRef, Injector, ApplicationRef, ComponentFactoryResolver, Injectable, NgZone } from "@angular/core";

// ###########################################
// App component
// ###########################################
@Component({
    selector: "app",
    template: `<section class="app"><map></map></section>`
})
class AppComponent { }

// ###########################################
// Popup component
// ###########################################
@Component({
    selector: "popup",
    template: `<section class="popup">Popup Component! :D {{ param }}</section>`
})
class PopupComponent { }

// ###########################################
// $compile for Angular 4! :D
// ###########################################
@Injectable()
class CustomCompileService {

    private appRef: ApplicationRef;

    constructor(
        private injector: Injector,
        private resolver: ComponentFactoryResolver
    ) { }

    configure(appRef) {
        this.appRef = appRef;
    }

    compile(component, onAttach) {
        const compFactory = this.resolver.resolveComponentFactory(component);
        let compRef = compFactory.create(this.injector);

        if (onAttach)
            onAttach(compRef);

        this.appRef.attachView(compRef.hostView);
        compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

        let div = document.createElement('div');
        div.appendChild(compRef.location.nativeElement);
        return div;
    }

}

// ###########################################
// Leaflet map service
// ###########################################
@Injectable()
class MapService {

    map: any;
    baseMaps: any;
    markersLayer: any;
    appRef: ApplicationRef;

    constructor(private compileService: CustomCompileService) {
        compileService.configure(this.appRef);
    }

    init(selector, appRef: ApplicationRef) {
        this.appRef = appRef;
        this.baseMaps = {
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            })
        };
        L.Icon.Default.imagePath = '.';
        L.Icon.Default.mergeOptions({
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
        this.map = L.map(selector);
        this.baseMaps.CartoDB.addTo(this.map);
        this.map.setView([51.505, -0.09], 13);

        this.markersLayer = new L.FeatureGroup(null);
        this.markersLayer.clearLayers();
        this.markersLayer.addTo(this.map);

        this.compileService.configure(this.appRef);
    }

    addMarker() {
        var m = L.marker([51.510, -0.09]);
        m.bindTooltip('Angular 4 marker (PopupComponent)');
        m.bindPopup(null);
        m.on('click', (e) => {
            m.setPopupContent(
                this.compileService.compile(PopupComponent, (c) => { c.instance.param = 0; setInterval(() => c.instance.param++, 1000); })
            );
        });
        this.markersLayer.addLayer(m);
        return m;
    }
}

// ###########################################
// Map component. These imports must be made
// here, they can't be in a service as they
// seem to depend on being loaded inside a
// component.
// ###########################################
@Component({
    selector: "map",
    template: `<section class="map"><div id="map"></div></section>`,
})
class MapComponent {

    marker: any;

    constructor(
        private appRef: ApplicationRef,
        private mapService: MapService
    ) { }

    ngOnInit() {
        this.mapService.init('map', this.appRef);
        this.marker = this.mapService.addMarker();
    }

}

// ###########################################
// Main module
// ###########################################
@NgModule({
    imports: [
        BrowserModule
    ],
    providers: [
        MapService,
        CustomCompileService
    ],
    declarations: [
        AppComponent,
        MapComponent,
        PopupComponent
    ],
    entryComponents: [
        PopupComponent
    ],
    bootstrap: [AppComponent]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
