import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";
import { User } from 'next-auth'
import mongoose from "mongoose";
import { Message } from "@/modal/User";

export async function POST(request: Request) {
    await dbConnect();

    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                message: "Not found user"
            }, { status: 404 })
        }
        // is user acctpting to messages

        if (!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "user not acception messagse"
            }, { status: 401 })
        }
        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message)
        await user.save();
        return Response.json({
            success: true,
            message: "Message sent"
        }, { status: 201 })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Not able to send message"
        }, { status: 401 })
    }



}