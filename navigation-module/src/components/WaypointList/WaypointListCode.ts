import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { ref } from 'vue';
// @ts-ignore
import { myWrapper } from '@T-Systems/FleetAPI';
import {convertSystemData} from './utils'

defineCustomElements();

export default {
    props: {
        system: { type: String, },
    },
    setup(props: {system: string}) {
        const docked = ref<string>('DOCKED');
        const resData = ref<any>({});
        const rows = ref([]);
        const waypoint = ref('');

        myWrapper.onStatusChange((_ship: string, status: string) => {
            docked.value = status;
            if (resData.value && 'data' in resData.value) {
                rows.value = convertSystemData(resData.value, 'KUROKIKAZE-1', docked.value, waypoint.value, myWrapper)
            }
        });

        myWrapper.onWaypointChange((_ship: string, newWaypoint: string) => {
            waypoint.value = newWaypoint;
            if (resData.value && 'data' in resData.value) {
                rows.value = convertSystemData(resData.value, 'KUROKIKAZE-1', docked.value, waypoint.value, myWrapper);
            }
        });

        const fields = ref([
            { 
                type: 'text',
                label: 'Waypoint symbol',
                sortable: true,
            }, {
                type: 'text',
                label: 'Type',
                sortable: true,
            }, {
                type: 'tags',
                label: 'Tags',
            }, {
                type: 'actions',
                label: 'Actions',
                sortable: false,
            },
        ]);

        myWrapper.getSystemWaypoints(props.system || 'X1-VS75').then((res: any) => {
            if (res.data) {
                resData.value = res;
                const newRows = convertSystemData(res, 'KUROKIKAZE-1', docked.value, waypoint.value, myWrapper);
                console.dir(newRows);
                rows.value = newRows;
            }
        });

        return {
            fields: JSON.stringify(fields.value),
            rows,
            docked,
        };
    },
}