import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotels-repository";

async function getHotels() {
  const hotels = await hotelRepository.getHotels();
  return hotels;
}
async function getRooms(hotelId: number) {
  const hotel = await hotelRepository.checkHotel(hotelId);
  if (!hotel) {
    throw notFoundError();
  }
  const roooms = await hotelRepository.getRooms(hotelId);
  if(!roooms) {
    throw notFoundError();
  }
  return roooms;
}
const hotelService = {
  getHotels, getRooms
};

export default hotelService;
