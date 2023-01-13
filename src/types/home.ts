export interface IRestaurant {
  id: string;
  name: string;
  type: string;
  addressLink: SVGStringList;
  latitude: number;
  longitude: number;
}

export interface IHours {
  opensAt: string;
  closesAt: string;
}
