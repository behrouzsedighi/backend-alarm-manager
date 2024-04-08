import { PartialType } from "@nestjs/mapped-types";
import { CreateDeviceDTO } from "./CreateDevice.dto";

export class UpdateDevice extends PartialType(CreateDeviceDTO) {

}