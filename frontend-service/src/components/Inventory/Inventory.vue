<script lang="ts">
import { defineCustomElements } from '@telekom/scale-components/loader';
import '@telekom/scale-components/dist/scale-components/scale-components.css';
import { ref, type PropType } from 'vue';
import type { ShipCargo } from '@/models/ShipCargo';

defineCustomElements()
export default {
    props: {
        cargo: {
            type: Object as PropType<ShipCargo>,
        },
    },
    setup(props) {
        // const dataGrid = document.querySelector('#inventory-datagrid');
        const fields = ref([
            {
                type: 'text',
                label: 'Item',
                sortable: true,
            },
            {
                type: 'text',
                label: 'Description',
                sortable: true,
            },
            {
                type: 'number',
                label: 'Quantity',
                sortable: true,
            },
        ]);
        
        return {
            fields: JSON.stringify(fields.value),
        };
    },
    computed: {
        rows():string {
            if (!this.cargo) return '[]';

            return JSON.stringify(this.cargo.inventory.map(({name, description, units}) => [name, description, units]));
        }
    }
}
</script>

<template>
    <div class="ship-inventory">
        <scale-data-grid heading="Inventory" v-bind:fields="fields" v-bind:rows="rows"></scale-data-grid>
    </div>
  </template>
  