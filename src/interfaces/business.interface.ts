import { JwtPayload } from "jsonwebtoken";
import { EmployeeProps } from "./employee.interface";
import { ShipmentProps } from "./shipment.interface";
import { TravelProps } from "./travel.interface";
import { VehicleProps } from "./vehicle.interface";
import { Request } from "express";

export interface BusinessProps {
  id?: string;
  businessName: string;
  email: string;
  logo?: string;
  password: string;
  confirmed: boolean;
  token: string;
  employees: EmployeeProps[];
  trucks: VehicleProps[];
  travels: TravelProps[];
  shipment: ShipmentProps[];
}

export interface RequestBusiness extends Request {
  business?: JwtPayload | { id: string; token: string };
  id?: string;
}
