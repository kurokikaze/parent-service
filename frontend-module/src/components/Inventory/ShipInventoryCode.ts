import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { ref } from 'vue';
// import type { ShipCargo } from '@/models/ShipCargo';

defineCustomElements()
export default {
    props: {
        cargo: {
            type: Object,
        },
    },
    setup() {
        const fields = ref([
            {
                type: 'text',
                label: 'Item',
                sortable: true,
                width: 100,
            },
            {
                type: 'text',
                label: 'Description',
                sortable: true,
                stretchWeight: 1,
            },
            {
                type: 'number',
                label: 'Quantity',
                sortable: true,
                width: 50,
            },
        ]);
        
        return {
            fields: JSON.stringify(fields.value),
        };
    },
    computed: {
        rows() {
            if (!this.cargo) return '[]';

            return JSON.stringify(this.cargo.inventory.map(({name, description, units}: {name: string, description: string, units: number}) => [name, description, units]));
        }
    }
}
