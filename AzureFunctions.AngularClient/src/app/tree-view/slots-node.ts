import { TreeNode } from './tree-node';
import { DashboardType } from './models/dashboard-type';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Subject, Observable } from 'rxjs/Rx';
import { ArmObj } from '../shared/models/arm/arm-obj';
import { Site } from '../shared/models/arm/site';
import { PortalResources } from '../shared/models/portal-resources';
import { FunctionApp } from '../shared/function-app';
import { AuthzService } from './../shared/services/authz.service';
import { SlotsService } from './../shared/services/slots.service';
import { ProxyNode } from './proxy-node';
import { AppNode, SlotNode } from './app-node';
import { FunctionInfo } from '../shared/models/function-info';
import { Subscription } from '../shared/models/subscription';

export class SlotsNode extends TreeNode {
    public dashboardType = DashboardType.slots;
    public newDashboardType = DashboardType.createSlot;
    public title = "Slots (preview)"; // TODO_sisirap: use translate service

    constructor(
        sideNav: SideNavComponent,
        private _subscriptions: Subscription[],
        private _siteArmCacheObj: ArmObj<Site>,
        parentNode: TreeNode) {
        super(sideNav, _siteArmCacheObj.id + "/slots", parentNode);

        this.iconClass = "tree-node-collection-icon"
        this.iconUrl = "images/BulletList.svg";
    }

    public loadChildren() {
        return this.sideNav.slotsService.getSlotsList(this._siteArmCacheObj.id)
            .do(slots => {
                let slotNodes: SlotNode[] = [];
                slots.forEach(s => {
                    slotNodes.push(new SlotNode(
                        this.sideNav,
                        s,
                        this,
                        this._subscriptions));
                })

                this.children = slotNodes;
            })
    }

    // private _updateTreeForStartedSite() {
    //     this.title = this.sideNav.translateService.instant("Slots"); //TOD_sisirap:
    //     this.newDashboardType = DashboardType.createSlot;
    //     this.showExpandIcon = true;

    //     if (this.parent.inSelectedTree) {
    //         this.inSelectedTree = true;
    //     }


    //     return Observable.of(null);
    // }

    public handleSelection(): Observable<any> {
        if (!this.disabled) {
            this.parent.inSelectedTree = true;
            return (<AppNode>this.parent).initialize();
        }

        return Observable.of({});
    }

    /*   public addChild(functionInfo: FunctionInfo) {
           functionInfo.functionApp = this.functionApp;
           this.sideNav.cacheService.clearCachePrefix(this.functionApp.getScmUrl());
   
           let newNode = new SlotNode(this.sideNav, this, functionInfo, this);
           this._addChildAlphabetically(newNode);
           newNode.select();
       }
   
       public removeChild(functionInfo: FunctionInfo, callRemoveOnChild?: boolean) {
   
           let removeIndex = this.children.findIndex((childNode: any) => {
               return childNode.proxy.name === functionInfo.name;
           })
   
           this._removeHelper(removeIndex, callRemoveOnChild);
       }
   
       public dispose(newSelectedNode?: TreeNode) {
           this.parent.dispose(newSelectedNode);
       }
   
   
   
       private _updateTreeForNonUsableState(title: string) {
           this.newDashboardType = null;
           this.children = [];
           this.title = title;
           this.showExpandIcon = false;
           this.sideNav.cacheService.clearCachePrefix(`${this.functionApp.getScmUrl()}/api/functions`);
           return Observable.of(null);
       } */
}
