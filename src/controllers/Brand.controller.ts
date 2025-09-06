import { Request, Response } from "express";
import brandService from "../services/Brand.service";
const brandController = {
    createBrand: async (req: Request, res: Response) => {
        // const response = await brandService.createBrand(req.body);
        // if (response) {
        //     res.status(201).json({ message: "Brand created successfully" });
        // } else {
        //     res.status(500).json({ message: "Failed to create brand" });
        // }
    }
}
export default brandController;