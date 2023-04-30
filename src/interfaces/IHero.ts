export default interface IHero{
    _id: string,
    name: string,
    description: string,
    life: number,
    def: number,
    atq: {
        base: number,
        range: number,
    },
    dmg: {
        base: number,
        range: number
    },
    power: number
}