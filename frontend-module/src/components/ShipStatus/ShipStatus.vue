<script>
import { defineCustomElements } from '@telekom/scale-components/loader';
defineCustomElements();

export {default} from './ShipStatusCode';
// import { defineCustomElements } from '@telekom/scale-components/loader';
// import '@telekom/scale-components/dist/scale-components/scale-components.css';
// // import { ref } from 'vue'
// // import {FleetApi} from '../apis/FleetApi';
// // import {Configuration} from '../apis/runtime';
// // import type { GetMyShip200Response, Ship } from '@/models';
// import InventoryVue from './Inventory/ShipInventory.vue';

// defineCustomElements()

</script>

<template>
    <div class="ship-info">
      <h1 class="green">{{ shipName }}</h1>
      <scale-button v-text="shipName"></scale-button>
      <div v-if="'nav' in shipData">
        Ship data:
        <div>
            <p>System stationed on: {{ 'nav' in shipData ? shipData.nav.systemSymbol : 'Unknown' }}</p>
            <p><scale-icon-user-file-user accessibility-title="Crew"/> {{ shipData.crew.current }} / {{ shipData.crew.capacity }}</p>
        </div>
        <div>
            <InventoryVue v-bind:cargo="shipData.cargo"></InventoryVue>
        </div>
      </div>
    </div>
</template>
