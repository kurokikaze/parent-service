<template>
  <ShipStatus shipName="KUROKIKAZE-1" ></ShipStatus>
</template>

<script>
import ShipStatus from './components/ShipStatus/ShipStatus.vue'

export default {
  name: 'App',
  components: {
    ShipStatus
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
