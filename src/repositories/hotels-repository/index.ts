import { prisma } from "@/config";

async function getHotels() {
  return prisma.hotel.findMany();
}

async function checkHotel(hotelId: number) {
  return prisma.hotel.findFirst(
    {
      where: {
        id: hotelId
      }
    }
  );
}

async function getRooms(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId
    },
    include: {
      Hotel: true
    }
  });
}

const hotelRepository = {
  getHotels, checkHotel, getRooms
};

export default hotelRepository;
