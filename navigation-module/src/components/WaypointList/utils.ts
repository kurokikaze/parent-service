const TYPE_NAMES: Record<string, string> = {
    ORBITAL_STATION: 'Orbital Station',
    MOON: 'Moon',
    PLANET: 'Planet',
    ASTEROID_FIELD: 'Asteroid Field',
    GAS_GIANT: 'Gas Giant',
    JUMP_GATE: 'Jump Gate',
}

export const convertSystemData = (wpData: any) => wpData.data.map((item: Record<string, any>) => [item.symbol, TYPE_NAMES[item.type], item.traits.map(({name}: Record<string, any>) => name).join(', ')])