import * as app from '../imports';
import * as svc from '../services';
import 'leaflet';

@app.Injectable()
export class MapService {

    map: any;
    baseMaps: any;
    markersLayer: any;

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

        var normalMarker = L.marker([51.505, -0.10]);
        normalMarker.bindTooltip('Expected result marker');
        normalMarker.bindPopup(`<section class="popup">Popup Component! :D</section>`);
        this.markersLayer.addLayer(normalMarker);

        var angularMarker = L.marker([51.510, -0.09]);
        angularMarker.bindTooltip('Angular 4 marker (PopupComponent)');
        angularMarker.bindPopup(`<popup></popup>`);
        this.markersLayer.addLayer(angularMarker);
    }
}