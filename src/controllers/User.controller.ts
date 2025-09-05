import { Request, Response } from "express";
import bcrypt from "bcryptjs";
const userController = {
    changePassword: (req: Request, res: Response): void => {
        const { oldPassword, newPassword } = req.body;
        // const user = 
    }


}
export default userController


