import './debug';
import "reflect-metadata";
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import * as modules from './modules';
import * as services from './services';
import * as components from './components';
import { NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import '../styles/main.scss';

// FIX: This could improve, but so far it's easier this way so
// components, modules and services are declared in separate files
// and then consolidated here, reducing bloat in the main file.

let imports = [];
let providers = [];
let declarations = [];

for (let x in modules) { imports.push(modules[x]); }
for (let x in services) { providers.push(services[x]); }
for (let x in components) { declarations.push(components[x]); }

const appRoutes = [
    { component: components.MapComponent, path: '' }
];
imports.push(modules.RouterModule.forRoot(appRoutes));

@NgModule({
    imports: imports,
    providers: providers,
    declarations: declarations,
    entryComponents: [
        components.PopupComponent
    ],
    bootstrap: [components.AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
