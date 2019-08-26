import { Injectable } from '@angular/core';

import { createInjectableOptions } from './upgrade-service-helper';

@Injectable(createInjectableOptions('c8yDeviceListColumns'))
export class UpgradedDeviceListColumnsService {}
