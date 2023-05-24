<script>
import { defineCustomElements } from '@telekom/scale-components/loader';
defineCustomElements();

export {default} from './ShipStatusCode';
</script>

<template>
    <div class="ship-info">
        <div style="max-width: 300px;">
            <scale-card label="Ship data" style="margin-bottom: 16px;">
                <h1 class="green">{{ shipName }}</h1>
                <div v-if="'nav' in shipData">
                    <div>
                        <p>System stationed on: <b>{{ 'nav' in shipData ? shipData.nav.systemSymbol : 'Unknown' }}</b></p>
                        <p>Navigation status: {{ 'nav' in shipData ? shipData.nav.status : 'Unknown' }}</p>
                        <div v-if="shipData.nav.status === 'DOCKED'">
                            <scale-button :disabled="docking" @click="undock()">
                                <div v-if="docking"><scale-loading-spinner/></div><div v-else>Undock</div>
                            </scale-button>
                        </div>
                        <div v-if="shipData.nav.status !== 'DOCKED'">
                            <scale-button :disabled="docking" @click="dock()">
                                <div v-if="docking"><scale-loading-spinner/></div><div v-else>Dock</div>
                            </scale-button>
                        </div>
                        <p><scale-icon-user-file-user accessibility-title="Crew"/> {{ shipData.crew.current }} / {{ shipData.crew.capacity }}</p>
                    </div>
                </div>
            </scale-card>
        </div>
        <div style="flex-grow: 1; margin-left: 32px">
            <scale-card style="height: 100%">
                <InventoryVue v-bind:cargo="shipData.cargo"></InventoryVue>
            </scale-card>
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