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
        const docking = ref<boolean>(false);

        if (props.shipName) {
            myFleet.getMyShip({ shipSymbol: props.shipName || "" }).then((response: any) => {
                shipData.value = response.data;
                console.dir(response.data);
            });
        }

        function undock() {
            docking.value = true;
            myFleet.orbitShip({ shipSymbol: props.shipName }).then((res: any) => {
                docking.value = false;
                // console.dir(res.data.nav);
                shipData.value.nav = res.data.nav;
            })
        }

        function dock() {
            docking.value = true;
            myFleet.dockShip({ shipSymbol: props.shipName }).then((res: any) => {
                docking.value = false;
                shipData.value.nav = res.data.nav;
            })
        }

        return {
            shipData,
            docking,
            dock,
            undock,
        };
    },
    components: { InventoryVue }
}