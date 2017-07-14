import * as app from '../imports';
import * as svc from '../services';
import 'leaflet';

@app.Injectable()
export class MapService {

    map: any;
    baseMaps: any;
    markersLayer: any;

    public injector: app.Injector;
    public appRef: app.ApplicationRef;
    public resolver: app.ComponentFactoryResolver;
    public compRef: any;
    public component: any;

    counter: number;

    init(selector) {
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
    }

    addMarker() {
        var m = L.marker([51.510, -0.09]);
        m.bindTooltip('Angular 4 marker (PopupComponent)');
        m.bindPopup(null);
        m.on('click', (e) => {
            if (this.compRef) this.compRef.destroy();
            const compFactory = this.resolver.resolveComponentFactory(this.component);
            this.compRef = compFactory.create(this.injector);

            this.compRef.instance.param = 0;
            setInterval(() => this.compRef.instance.param++, 1000);

            this.appRef.attachView(this.compRef.hostView);
            this.compRef.onDestroy(() => {
                this.appRef.detachView(this.compRef.hostView);
            });
            let div = document.createElement('div');
            div.appendChild(this.compRef.location.nativeElement);
            m.setPopupContent(div);
        });
        this.markersLayer.addLayer(m);
        return m;
    }
}