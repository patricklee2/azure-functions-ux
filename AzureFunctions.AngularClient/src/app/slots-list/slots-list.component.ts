import { Component, OnInit } from '@angular/core';
import { Subject, Subscription as RxSubscription } from 'rxjs/Rx';
import { TreeViewInfo } from './../tree-view/models/tree-view-info';
import { SlotsNode } from "../tree-view/slots-node";
import { SlotNode } from "../tree-view/app-node";


interface SlotItem {
    name: string,
    status: string,
    serverFarm: string,
    node: SlotNode
}

@Component({
    selector: 'slots-list',
    templateUrl: './slots-list.component.html',
    styleUrls: ['./slots-list.component.scss'],
    inputs: ['viewInfoInput']
})
export class SlotsListComponent implements OnInit {
    public viewInfoStream: Subject<TreeViewInfo>;
    public slots: SlotItem[] = [];
    public isLoading: boolean;

    private _slotsNode: SlotsNode;
    private _viewInfoSubscription: RxSubscription;

    constructor() {
        this.viewInfoStream = new Subject<TreeViewInfo>();

        this._viewInfoSubscription = this.viewInfoStream.distinctUntilChanged()
            .switchMap(viewInfo => {
                this.isLoading = true;
                this._slotsNode = (<SlotsNode>viewInfo.node);
                return this._slotsNode.loadChildren();
            })
            .subscribe(() => {
                this.isLoading = false;
                this.slots = (<SlotNode[]>this._slotsNode.children)
                    .map(s => {
                        return <SlotItem>{
                            name: s.title,
                            status: s.slotProperties.state,
                            serverFarm: s.slotProperties.serverFarmId.split('/')[8],
                            node: s
                        }
                    });
            })
    }

    ngOnInit() {
    }

    set viewInfoInput(viewInfo: TreeViewInfo) {
        this.viewInfoStream.next(viewInfo);
    }

    clickRow(item: SlotItem) {
        item.node.select();
    }

}
