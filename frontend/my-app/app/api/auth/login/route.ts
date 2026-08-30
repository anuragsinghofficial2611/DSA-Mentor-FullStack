import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const backendresponse = await fetch(`${process.env.API_URL}/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await backendresponse.json();
        if (!backendresponse.ok) {
            return NextResponse.json(
                {
                    data,
                }, {
                status: data.status, 
            }
            )
        }
        const response = NextResponse.json({
            message: "login successfull"
        });
        response.cookies.set("access_token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        })
        return response;
    } catch(error){
        console.log(error);
        return NextResponse.json(
            {
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        )
    }

}