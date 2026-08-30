import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try{
        const body = await request.json();
        if(!body.name || !body.email || !body.password ){
            return NextResponse.json(
                {
                    message: "Every field is required"
                }
            );
        }
        const backendresponse = await fetch(`${process.env.API_URL}/v1/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await backendresponse.json();
        if(!backendresponse.ok){
            console.log(data);
            return NextResponse.json(
                {
                    message: "Response is not ok"
                },{
                    status: backendresponse.status
                }
            )
        }
        console.log("backend response " , data);
        NextResponse.json(
            {
                message:"User created in database",
                data
            },
            {
                status: backendresponse.status
            }
        )
    } catch(error){
        console.log(error);
        NextResponse.json(
            {
                message: "Internal Server Error",
                error
            },{
                status: 500
            }
        )
    }
}