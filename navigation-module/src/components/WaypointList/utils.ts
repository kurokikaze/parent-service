const TYPE_NAMES: Record<string, string> = {
    ORBITAL_STATION: 'Orbital Station',
    MOON: 'Moon',
    PLANET: 'Planet',
    ASTEROID_FIELD: 'Asteroid Field',
    GAS_GIANT: 'Gas Giant',
    JUMP_GATE: 'Jump Gate',
}

export const convertSystemData = (wpData: any, ship: string, status: string, waypoint: string, wrapper: {navigate: (ship: string, system: string) => void}) => wpData.data.map((item: Record<string, any>) => [
    item.symbol,
    TYPE_NAMES[item.type],
    item.traits.map(({name}: Record<string, any>) => name).join(', '),
    item.symbol !== waypoint ? [{
        label: 'Navigate',
        variant: 'secondary',
        disabled: status !== 'IN_ORBIT',
        onClick: () => {
            wrapper.navigate(ship, item.symbol);
        }
    }] : []
])