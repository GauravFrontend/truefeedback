import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";

export async function POST(request: Request) {
    await dbConnect()
    try {

        const { username, code } = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message:"user not found"
                },
                {
                    status: 500
                }
            )
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "Account Verified"
                },
                {
                    status: 200
                }
            )
        }else if(!isCodeNotExpired){
            return Response.json(
                {
                    success: false,
                    message: "code expired"
                },
                {
                    status: 400
                }
            )
        }else{
            return Response.json(
                {
                    success: false,
                    message: "code is wrong"
                },
                {
                    status: 400
                }
            )
        }

        

    } catch (error) {
        console.log("Error while verifing username", error);
        return Response.json(
            {
                success: false,
                message: "Error while verifing username"
            },
            {
                status: 500
            }
        )

    }
}