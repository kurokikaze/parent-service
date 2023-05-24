<script>
export { default } from './ShipInventoryCode'
</script>

<template>
    <div class="ship-inventory">
        <scale-data-grid heading="Inventory" v-bind:fields="fields" v-bind:rows="rows"></scale-data-grid>
    </div>
</template>

<style>
.ship-inventory {
    max-width: fit-content;
}
</style>