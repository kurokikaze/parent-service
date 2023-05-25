import { FleetApi, SystemsApi } from "./apis";
import { Ship, ShipNav, System } from "./models";

const SHIP_DATA_KEY = 'savedShipData';
const WAYPOINTS_DATA_KEY = 'savedWaypointsData'

export class DataWrapper {
    private statusCallbacks: Function[] = []
    private fuelCallbacks: Function[] = []
    private travelCallbacks: Function[] = []
    private waypointCallbacks: Function[] = []

    constructor(private fleetApi: FleetApi, private systemApi: SystemsApi) {}

    async undock(callSign: string): Promise<ShipNav|null> {
        try {
            const shipData = await this.fleetApi.orbitShip({ shipSymbol: callSign })
            if (shipData && 'data' in shipData) {
                this.updateShipNavStatus(callSign, shipData.data.nav)
                return shipData.data.nav;
            }
        } catch(e) {
            console.error(`Error undocking the ship ${callSign}`)
        }

        return null
    }

    
    async dock(callSign: string): Promise<ShipNav|null> {
        try {
            const shipData = await this.fleetApi.dockShip({ shipSymbol: callSign })
            if (shipData && 'data' in shipData) {
                this.updateShipNavStatus(callSign, shipData.data.nav)
                return shipData.data.nav;
            }
        } catch(e) {
            console.error(`Error docking the ship ${callSign}`)
            console.dir(e)
        }
    }

    async navigate(ship: string, waypoint: string): Promise<ShipNav|null> {
        try {
            const shipData = await this.fleetApi.navigateShip({ shipSymbol: ship, navigateShipRequest: { waypointSymbol: waypoint } })
            if (shipData && 'data' in shipData) {
                this.updateShipNavStatus(ship, shipData.data.nav);
                this.sendOutFuelChange(ship, shipData.data.fuel.current);
                
                this.setArrivalTimeout(ship, shipData.data.nav);
                return shipData.data.nav;
            }
        } catch(e) {
            console.error(`Error navigating ship ${ship} to waypoint ${waypoint}`);
        }
    }

    async getMyShips() {
        try {
            const shipsData = await this.fleetApi.getMyShips();
            console.dir(shipsData);
        } catch (e) {
            console.log('Error getting ship list')
        }
        return []
    }

    onStatusChange(callback: (ship: string, status: string) => void): Function {
        this.statusCallbacks.push(callback);
        return () => this.statusCallbacks = this.statusCallbacks.filter(savedCallback => savedCallback !== callback);
    }

    onFuelChange(callback: (ship: string, fuel: number) => void): Function {
        this.fuelCallbacks.push(callback);
        return () => this.fuelCallbacks = this.fuelCallbacks.filter(savedCallback => savedCallback !== callback);
    }

    onTravelChange(callback: (ship: string, timeLeft: number) => void): Function {
        this.travelCallbacks.push(callback);
        return () => this.travelCallbacks = this.travelCallbacks.filter(savedCallback => savedCallback !== callback);
    }

    onWaypointChange(callback: (ship: string, waypoint: string) => void): Function {
        this.waypointCallbacks.push(callback);
        return () => this.waypointCallbacks = this.waypointCallbacks.filter(savedCallback => savedCallback !== callback);
    }

    private updateShipNavStatus(ship: string, nav: ShipNav) {
        const savedShipData = this.loadShipData(ship)
        // If the status has changed or no data recorded...
        if (!savedShipData || savedShipData.nav.status !== nav.status) {
            // Send out the new status
            this.sendOutStatusChange(ship, nav.status);
        }
        if (!savedShipData || savedShipData.nav.waypointSymbol !== nav.waypointSymbol) {
            this.sendOutWaypointChange(ship, nav.waypointSymbol);
        }
        if (savedShipData) {
            this.saveShipData(ship, {
                ...savedShipData,
                nav,
            });
        }
    }

    private sendOutStatusChange(ship: string, status: string) {
        this.statusCallbacks.forEach(cb => cb(ship, status));
    }

    private sendOutFuelChange(ship: string, fuel: number) {
        this.fuelCallbacks.forEach(cb => cb(ship, fuel));
    }

    private sendOutTravelChange(ship: string, seconds: number) {
        this.travelCallbacks.forEach(cb => cb(ship, seconds));
    }

    private sendOutWaypointChange(ship: string, waypoint: string) {
        this.waypointCallbacks.forEach(cb => cb(ship, waypoint));
    }

    async getMyShipData(callSign: string): Promise<Ship | null> {
        console.log(`Getting ship data: ${callSign}`);
        const savedShipData = this.loadShipData(callSign);
        // Re-request data for the ships in transit
        if (savedShipData && 'cargo' in savedShipData && (savedShipData.nav.status !== 'IN_TRANSIT')) {
            console.log('Saved ship data')
            console.dir(savedShipData);
            this.sendOutStatusChange(callSign, savedShipData.nav.status);
            this.sendOutWaypointChange(callSign, savedShipData.nav.waypointSymbol);
            return savedShipData
        } else {
            try {
                const shipData = await this.fleetApi.getMyShip({ shipSymbol: callSign });
                if (shipData && 'data' in shipData) {
                    this.saveShipData(callSign, shipData.data)
                    return shipData.data;
                }
            } catch(e) {
                console.error(`Error getting ship ${callSign} data: ${e.message}`);
            }

            return null
        }
    }

    async getSystemWaypoints(system: string): Promise<System|{}> {
        const waypointDataKey = `${WAYPOINTS_DATA_KEY}:${system}`
        const savedWaypointsData = localStorage.getItem(waypointDataKey)
        if (savedWaypointsData) {
            return JSON.parse(savedWaypointsData)
        } else {
            try {
                const wpData = await this.systemApi.getSystemWaypoints({ systemSymbol: system });
                if (wpData && 'data' in wpData) {
                    localStorage.setItem(waypointDataKey, JSON.stringify(wpData))
                    return wpData
                }
            } catch(e) {
                console.error(`Error getting waypoints of system ${system}: ${e.message}`);
            }

            return {}
        }
    }

    private loadShipData(callSign: string): Ship | null {
        const shipDataKey = `${SHIP_DATA_KEY}:${callSign}`
        const rawShipData = localStorage.getItem(shipDataKey)
        if (rawShipData) {
            return JSON.parse(rawShipData) as Ship
        }
        return null
    }

    private saveShipData(callSign: string, shipData: Ship) {
        const shipDataKey = `${SHIP_DATA_KEY}:${callSign}`
        localStorage.setItem(shipDataKey, JSON.stringify(shipData))
    }

    private setArrivalTimeout(ship: string, nav: ShipNav) {
        const timeToTarget = (new Date(nav.route.arrival)).getTime() - (new Date(nav.route.departureTime)).getTime() 

        // Send out our initial estimate of the travel time
        // Here timeToTarget is in milliseconds
        this.sendOutTravelChange(ship, timeToTarget / 1000);

        // Every second send out additional tick for anyone interested
        const travelInterval = setInterval(() => {
            const msToTarget = (new Date(nav.route.arrival)).getTime() - (new Date()).getTime()
            const newTimeToTarget = Math.floor(msToTarget / 1000);
            this.sendOutTravelChange(ship, newTimeToTarget);
        }, 1000);

        setTimeout(() => {
            clearInterval(travelInterval);
            const shipData = this.loadShipData(ship);
            const newNav: ShipNav = {
                ...shipData.nav,
                status: "IN_ORBIT",
                waypointSymbol: nav.route.destination.symbol,
            }
            this.updateShipNavStatus(ship, newNav);
        }, timeToTarget)
    }
}