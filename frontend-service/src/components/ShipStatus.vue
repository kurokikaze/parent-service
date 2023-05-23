<script lang="ts">
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { ref } from 'vue'
import {FleetApi} from '../apis/FleetApi';
import {Configuration} from '../apis/runtime';
import type { GetMyShip200Response, Ship } from '@/models';
import InventoryVue from './Inventory/Inventory.vue';

defineCustomElements()

export default {
    props: {
        shipName: String,
    },
    setup(props) {
        const config = new Configuration({ accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiS1VST0tJS0FaRSIsInZlcnNpb24iOiJ2MiIsInJlc2V0X2RhdGUiOiIyMDIzLTA1LTIwIiwiaWF0IjoxNjg0NzU0Mjg1LCJzdWIiOiJhZ2VudC10b2tlbiJ9.zNmcOvKS8SxlNMnTlemhJhyQ6y8U1RbIF9uU4fahfHq252eYKbfc9C8cOheJw0SSs_9u9LiKwrM5jrTeRtJqtI41ROwFRSVMWctDztZF5f_PRQRTkII993w06lUVT4xreLDC4xJ4ZZSVA9RNBPAEREJJ9K9uen3eOI8PBw86ugFk6dF7_5idCTKwk6-bUR8pRYlr6ro2QfXjG5X9JNkXBUbO_cOn47EeLE8vjzPz5YkuXyShbT9yLUDboQp_oU4yeAaG6X1dInyNsMQbstHTwp7LA12GLreBKStG9u7sjfYf566N1qOLEo72WrtupSuNWXuKBSoCc2_jznebJTZcoA" });
        const API = new FleetApi(config);
        const shipData = ref<Ship | {}>({});
        console.log(`Ship name: ${props.shipName}`);
        if (props.shipName) {
            API.getMyShip({ shipSymbol: props.shipName || "" }).then((response: GetMyShip200Response) => {
                shipData.value = response.data;
                console.dir(response.data);
            });
        }
        return {
            shipData,
        };
    },
    components: { InventoryVue }
}
</script>

<template>
    <div class="ship-info">
      <h1 class="green">{{ shipName }}</h1>
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
