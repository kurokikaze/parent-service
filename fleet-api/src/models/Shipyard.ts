/* tslint:disable */
/* eslint-disable */
/**
 * SpaceTraders API
 * SpaceTraders is an open-universe game and learning platform that offers a set of HTTP endpoints to control a fleet of ships and explore a multiplayer universe.  The API is documented using [OpenAPI](https://github.com/SpaceTradersAPI/api-docs). You can send your first request right here in your browser to check the status of the game server.  ```json http {   \"method\": \"GET\",   \"url\": \"https://api.spacetraders.io/v2\", } ```  Unlike a traditional game, SpaceTraders does not have a first-party client or app to play the game. Instead, you can use the API to build your own client, write a script to automate your ships, or try an app built by the community.  We have a [Discord channel](https://discord.com/invite/jh6zurdWk5) where you can share your projects, ask questions, and get help from other players.   
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: joel@spacetraders.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../apis/runtime';
import type { ShipyardShip } from './ShipyardShip';
import {
    ShipyardShipFromJSON,
    ShipyardShipFromJSONTyped,
    ShipyardShipToJSON,
} from './ShipyardShip';
import type { ShipyardShipTypesInner } from './ShipyardShipTypesInner';
import {
    ShipyardShipTypesInnerFromJSON,
    ShipyardShipTypesInnerFromJSONTyped,
    ShipyardShipTypesInnerToJSON,
} from './ShipyardShipTypesInner';
import type { ShipyardTransaction } from './ShipyardTransaction';
import {
    ShipyardTransactionFromJSON,
    ShipyardTransactionFromJSONTyped,
    ShipyardTransactionToJSON,
} from './ShipyardTransaction';

/**
 * 
 * @export
 * @interface Shipyard
 */
export interface Shipyard {
    /**
     * The symbol of the shipyard. The symbol is the same as the waypoint where the shipyard is located.
     * @type {string}
     * @memberof Shipyard
     */
    symbol: string;
    /**
     * The list of ship types available for purchase at this shipyard.
     * @type {Array<ShipyardShipTypesInner>}
     * @memberof Shipyard
     */
    shipTypes: Array<ShipyardShipTypesInner>;
    /**
     * The list of recent transactions at this shipyard.
     * @type {Array<ShipyardTransaction>}
     * @memberof Shipyard
     */
    transactions?: Array<ShipyardTransaction>;
    /**
     * The ships that are currently available for purchase at the shipyard.
     * @type {Array<ShipyardShip>}
     * @memberof Shipyard
     */
    ships?: Array<ShipyardShip>;
}

/**
 * Check if a given object implements the Shipyard interface.
 */
export function instanceOfShipyard(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "symbol" in value;
    isInstance = isInstance && "shipTypes" in value;

    return isInstance;
}

export function ShipyardFromJSON(json: any): Shipyard {
    return ShipyardFromJSONTyped(json, false);
}

export function ShipyardFromJSONTyped(json: any, ignoreDiscriminator: boolean): Shipyard {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'symbol': json['symbol'],
        'shipTypes': ((json['shipTypes'] as Array<any>).map(ShipyardShipTypesInnerFromJSON)),
        'transactions': !exists(json, 'transactions') ? undefined : ((json['transactions'] as Array<any>).map(ShipyardTransactionFromJSON)),
        'ships': !exists(json, 'ships') ? undefined : ((json['ships'] as Array<any>).map(ShipyardShipFromJSON)),
    };
}

export function ShipyardToJSON(value?: Shipyard | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'symbol': value.symbol,
        'shipTypes': ((value.shipTypes as Array<any>).map(ShipyardShipTypesInnerToJSON)),
        'transactions': value.transactions === undefined ? undefined : ((value.transactions as Array<any>).map(ShipyardTransactionToJSON)),
        'ships': value.ships === undefined ? undefined : ((value.ships as Array<any>).map(ShipyardShipToJSON)),
    };
}

