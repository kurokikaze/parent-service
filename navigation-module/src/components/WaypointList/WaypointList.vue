<script>
export { default } from './WaypointListCode'
</script>

<template>
    <div class="waypoint-list">
        <scale-data-grid hide-menu heading="Waypoints" v-bind:fields="fields" v-bind:rows="rows" freeze-header></scale-data-grid>
    </div>
</template>
