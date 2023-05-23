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
import type { CreateChart201ResponseData } from './CreateChart201ResponseData';
import {
    CreateChart201ResponseDataFromJSON,
    CreateChart201ResponseDataFromJSONTyped,
    CreateChart201ResponseDataToJSON,
} from './CreateChart201ResponseData';

/**
 * 
 * @export
 * @interface CreateChart201Response
 */
export interface CreateChart201Response {
    /**
     * 
     * @type {CreateChart201ResponseData}
     * @memberof CreateChart201Response
     */
    data: CreateChart201ResponseData;
}

/**
 * Check if a given object implements the CreateChart201Response interface.
 */
export function instanceOfCreateChart201Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function CreateChart201ResponseFromJSON(json: any): CreateChart201Response {
    return CreateChart201ResponseFromJSONTyped(json, false);
}

export function CreateChart201ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateChart201Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': CreateChart201ResponseDataFromJSON(json['data']),
    };
}

export function CreateChart201ResponseToJSON(value?: CreateChart201Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': CreateChart201ResponseDataToJSON(value.data),
    };
}

