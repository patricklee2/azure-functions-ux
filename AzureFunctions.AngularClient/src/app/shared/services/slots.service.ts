import { DiagnosticsResult } from './../models/diagnostics-result';
import { WebApiException } from './../models/webapi-exception';
import { FunctionsResponse } from './../models/functions-response';
import { Http, Headers, Response, ResponseType } from '@angular/http';
import { Injectable } from '@angular/core';
import { FunctionInfo } from '../models/function-info';
import { VfsObject } from '../models/vfs-object';
import { ScmInfo } from '../models/scm-info';
import { PassthroughInfo } from '../models/passthrough-info';
import { CreateFunctionInfo } from '../models/create-function-info';
import { FunctionTemplate } from '../models/function-template';
import { RunResponse } from '../models/run-response';
import { Observable } from 'rxjs/Rx';
import { DesignerSchema } from '../models/designer-schema';
import { FunctionSecrets } from '../models/function-secrets';
import { Subscription } from '../models/subscription';
import { ServerFarm } from '../models/server-farm';
import { BindingConfig } from '../models/binding';
import { PortalService } from './portal.service';
import { UserService } from './user.service';
import { FunctionContainer } from '../models/function-container';
import { RunFunctionResult } from '../models/run-function-result';
import { Constants } from '../models/constants';
import { Cache, ClearCache, ClearAllFunctionCache } from '../decorators/cache.decorator';
import { GlobalStateService } from './global-state.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PortalResources } from '../models/portal-resources';
import { UIResource, AppService, ITryAppServiceTemplate } from '../models/ui-resource';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UsageVolume } from '../models/app-monitoring-usage'
import { BroadcastService } from './broadcast.service';
import { ArmService } from './arm.service';
import { BroadcastEvent } from '../models/broadcast-event';
import { ErrorEvent, ErrorType } from '../models/error-event';
import { HttpRunModel } from '../models/http-run';
import { FunctionKeys, FunctionKey } from '../models/function-key';
import { StartupInfo } from '../models/portal';
import { CacheService } from './cache.service';
import { ArmObj } from '../models/arm/arm-obj';
import { Site } from '../models/arm/site';
import { FunctionApp } from '../function-app';
import { SiteDescriptor } from '../resourceDescriptors';
import { AiService } from './ai.service';
import { ErrorIds } from '../models/error-ids';


@Injectable()
export class SlotsService {
    constructor(
        private _cacheService: CacheService,
        private _armService: ArmService
    ) { }

    getSlotsList(siteId: string) {
        return this._cacheService.getArm(`/${siteId}/slots`).map(r => <ArmObj<Site>[]>r.json().value);
    }

    getMasterKeys() {

    }

    //Create Slot

    // Swap Slots

    //Delete Slot
}

