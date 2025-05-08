// import { Request, Response } from "express";
// import { monarchsData } from "../data/data";
// import { IMonarch } from "../models/IMonarch";

// export const getOne = (req: Request, res: Response) => {
//   const { id } = req.params;

//   const monarch = monarchsData.find((monarch: IMonarch) => monarch.id === id);

//   if (!monarch) {
//     res.status(404).json({ message: "Monarch not found" });
//     return;
//   }

//   res.status(200).json(monarch);
// };
