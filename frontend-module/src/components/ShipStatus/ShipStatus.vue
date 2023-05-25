<script>
import { defineCustomElements } from '@telekom/scale-components/loader';
defineCustomElements();

export {default} from './ShipStatusCode';
</script>

<template>
    <div class="ship-info">
        <div style="width: 300px;">
            <scale-card label="Ship data" style="margin-bottom: 16px;">
                <h1 class="green">{{ shipName }}</h1>
                <div v-if="'nav' in shipData">
                    <div>
                        <p>System stationed on: <b>{{ shipData.nav.systemSymbol }}</b></p>
                        <div>
                            <p v-if="shipData.nav.status === 'IN_TRANSIT'">
                                <scale-progress-bar
                                    :percentage="100 - Math.floor((timeToTarget / Math.floor(((new Date(shipData.nav.route.arrival)).getTime() - (new Date(shipData.nav.route.departureTime)).getTime()) / 1000)) * 100)"
                                    label="Transit time"
                                    :status-description="`${timeToTarget} second(s) left`"
                                    show-status="true"
                                ></scale-progress-bar>
                            </p>
                            <p v-else>Current waypoint: <b>{{ shipData.nav.waypointSymbol }}</b></p>
                        </div>
                        <p>!Navigation status: {{ shipData.nav.status }}</p>
                        <div v-if="shipData.nav.status === 'DOCKED'">
                            <scale-button :disabled="docking" @click="undock()">
                                <div v-if="docking"><scale-loading-spinner/></div><div v-else>Undock</div>
                            </scale-button>
                        </div>
                        <div v-if="shipData.nav.status !== 'DOCKED'">
                            <scale-button :disabled="docking || shipData.nav.status !== 'IN_ORBIT'" @click="dock()">
                                <div v-if="docking"><scale-loading-spinner/></div><div v-else>Dock</div>
                            </scale-button>
                        </div>
                        <div>
                            <scale-icon-user-file-user accessibility-title="Crew"/> {{ shipData.crew.current }} / {{ shipData.crew.capacity }}
                        </div>
                        <div>
                            <scale-progress-bar
                                :percentage="Math.floor((shipData.fuel.current / shipData.fuel.capacity) * 100)"
                                label="Fuel"
                                :status-description="`${shipData.fuel.current} out of ${shipData.fuel.capacity}`"
                                show-status="true"
                            ></scale-progress-bar>
                        </div>
                    </div>
                </div>
            </scale-card>
        </div>
        <div style="flex-grow: 1; margin-left: 32px">
            <InventoryVue v-bind:cargo="shipData.cargo"></InventoryVue>
        </div>
    </div>
</template>

<style>
.ship-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 32px;
}
</style>