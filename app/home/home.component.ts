import {Component, OnInit, OnDestroy} from "@angular/core";
import {Page} from "ui/page";
import {InternetConnectionService} from "~/shared/services/internet-connection.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit, OnDestroy {
    connectionStatus: boolean = false;
    connection$;

    constructor(private page: Page,
                private _internetConnection: InternetConnectionService) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void {
        this.connection$ = this._internetConnection.getConnectionStatus().subscribe(data => {
            this.connectionStatus = data.valueOf();
        });
    }

    ngOnDestroy(): void {
        if (this.connection$)
            this.connection$.unsubscribe();
    }
}
