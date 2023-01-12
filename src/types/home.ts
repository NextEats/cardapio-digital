
export interface IRestaurant {
    id: string,
    name: string,
    type: string,
    addressLink: SVGStringList
    schedules: {
      monday: IHours
      tuesday: IHours
      wednesday: IHours
      thursday: IHours
      friday: IHours
      saturday: IHours
      sunday: IHours
    },
    latitude: number,
    longitude: number,
}

export interface IHours {
    opensAt: string
    closesAt: string
}