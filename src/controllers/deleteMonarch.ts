// import { Request, Response } from "express";
// import { monarchsData } from "../data/data";
// import { IMonarch } from "../models/IMonarch";

// export const deleteMonarch = (req: Request, res: Response) => {
//   const { id } = req.params;

//   const index = monarchsData.findIndex((monarch: IMonarch) => monarch.id === id);

//   if (index === -1) {
//     res.status(404).json({ message: "Monarch not found" });
//     return;
//   }

//   const deleteMonarch = monarchsData.splice(index, 1)[0];

//   res.status(200).json({
//     message: "Monarch deleted",
//     deleted: deleteMonarch,
//   });
// };
