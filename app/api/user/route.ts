import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request){
    try{
        const body = await req.json();
        const { email, name, password} = body;

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email}
        });
        if(existingUserByEmail){
            return NextResponse.json({ user: null, message: "User with this email already exists"}, {status: 409});
        }

        const newUser = await db.user.create({
            data: {
                email,
                name,
                password
            }
        });


        return NextResponse.json( {user: newUser, message: "User created successfully" }, {status: 201});

    } catch (error) {
        return NextResponse.json({ user: null, message: "Something went wrong"}, {status: 500});
    }
}