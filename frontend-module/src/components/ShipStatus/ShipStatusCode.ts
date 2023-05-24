import { ref } from 'vue';
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import InventoryVue from '../Inventory/ShipInventory.vue';
// @ts-ignore
import {myWrapper} from '@T-Systems/FleetAPI';

defineCustomElements()

export default {
    props: {
        shipName: String,
    },
    setup(props: {shipName: string}) {
        const shipData = ref<any | {}>({});
        const docking = ref<boolean>(false);
        const timeToTarget = ref(0);

        myWrapper.onStatusChange((ship: string, status: string) => {
            if (ship === props.shipName && 'nav' in shipData.value) {
                shipData.value.nav.status = status;
            }
        })

        myWrapper.onFuelChange((ship: string, fuel: number) => {
            if (ship === props.shipName && 'fuel' in shipData.value) {
                shipData.value.fuel.current = fuel;
            }
        })

        myWrapper.onTravelChange((ship: string, time: number) => {
            if (ship === props.shipName && 'nav' in shipData.value && shipData.value.nav.status === 'IN_TRANSIT') {
                timeToTarget.value = time;
            }
        })

        if (props.shipName) {
            myWrapper.getMyShipData(props.shipName).then((data: any) => {
                console.dir(data);
                shipData.value = data;
            });
        }

        function undock() {
            docking.value = true;
            myWrapper.undock(props.shipName).then((shipNav: any) => {
                docking.value = false;
                if (shipNav) {
                    shipData.value.nav = shipNav;
                }
            });
        }

        function dock() {
            docking.value = true;
            myWrapper.dock(props.shipName).then((shipNav: any) => {
                docking.value = false;
                if (shipNav) {
                    shipData.value.nav = shipNav;
                }
            });
        }

        return {
            shipData,
            docking,
            dock,
            undock,
            timeToTarget,
        };
    },
    components: { InventoryVue }
}