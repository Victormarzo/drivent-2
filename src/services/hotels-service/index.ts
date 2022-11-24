import hotelRepository from "@/repositories/hotels-repository";

async function getHotels() {
  const hotels = await hotelRepository.getHotels();
  return hotels;
}

const hotelService = {
  getHotels,
};

export default hotelService;
