import { conflictError, notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotels-repository";
import enrollmentRepository from  "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getTicketByUserIdAndCheckTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }if (ticket.status!== "PAID") {
    throw conflictError("Your ticket has not been paid yet");
  }
  if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
    throw conflictError("Your ticket doenst include hotel");
  }

  return ticket;
}

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
  getTicketByUserIdAndCheckTicket, getHotels, getRooms
};

export default hotelService;
