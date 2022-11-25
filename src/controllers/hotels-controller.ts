import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status!== "PAID") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    const hotels = await hotelService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    if (ticket.status!== "PAID") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true) {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    const rooms = await hotelService.getRooms(Number(hotelId));
    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

