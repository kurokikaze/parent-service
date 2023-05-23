import { ref } from 'vue';
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import InventoryVue from '../Inventory/ShipInventory.vue';
// @ts-ignore
import {myFleet} from '@T-Systems/FleetAPI';

defineCustomElements()

export default {
    props: {
        shipName: String,
    },
    setup(props: {shipName: string}) {
        const shipData = ref<any | {}>({});

        if (props.shipName) {
            myFleet.getMyShip({ shipSymbol: props.shipName || "" }).then((response: any) => {
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