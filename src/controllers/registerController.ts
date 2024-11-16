import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerStartup = async (req: Request, res: Response) => {
  try {
    const {
      name,
      entity_name,
      sector,
      categories,
      year,
      brand_name,
      entityRegistrationStatus,
      stage,
      detailsText,
      size,
      incubation_status,
      startupIndiaRegister,
      reg_number,
      reg_date,
      reg_certificate,
      gst,
      ipr,
      addrLine1,
      addLine2,
      state,
      city,
      district,
      pincode,
      founderName,
      designation,
      mobile,
      address,
      equity,
      password,
      email,
      pitch_deck,
      Aadhar_Number,
      Pan_Number,
      Dipp_number,
    } = req.body;

    const startup = await prisma.startup_Profile.create({
      data: {
        name,
        entity_name,
        sector,
        categories,
        year,
        brand_name,
        entityRegistrationStatus,
        stage,
        detailsText,
        size,
        incubation_status,
        startupIndiaRegister,
        registrations: {
          create: {
            reg_number,
            reg_date: new Date(reg_date),
            reg_certificate,
            gst,
            ipr,
          },
        },
        addresses: {
          create: {
            addrLine1,
            addLine2,
            state,
            city,
            district,
            pincode,
          },
        },
        founders: {
          create: {
            name: founderName,
            designation,
            mobile,
            address,
            equity,
            password,
            email,
          },
        },
        documents: {
          create: {
            pitch_deck,
            Aadhar_Number: Aadhar_Number,
            Pan_Number,
            Reg_certificate: reg_certificate,
            Dipp_number,
          },
        },
      },
      include: {
        registrations: true,
        addresses: true,
        founders: true,
        documents: true,
      },
    });

    res
      .status(201)
      .json({ message: "Startup registered successfully", data: startup });
  } catch (error) {
    console.error("Error registering startup:", error);
    const errorMessage = (error as Error).message;

    res
      .status(500)
      .json({ message: "Error registering startup", error: errorMessage });
  }
};
