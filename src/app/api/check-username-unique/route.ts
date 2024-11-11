import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UserNameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username")
        }
        //validate with zod
        const result = UserNameQuerySchema.safeParse(queryParam)
        console.log(result, "to know what other values are there");
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(",") : "username is not uniqe"
            }, { status: 400 })
        }

        const {username} = result.data;
        const existingVerifiedUser = await UserModel.findOne({username, isVerified:true})
        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "username is already taken"
            }, { status: 400 })
        }
        return Response.json({
            success: true,
            message: "username is unique"
        }, { status: 201 })

    } catch (error) {
        console.log("Error while checking of username", error);
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
} 