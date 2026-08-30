import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'  
export async function GET(request: Request){
    try{
        const cookieStore = await cookies();
        const token = await cookieStore.get("accesstoken")?.value;
    }
}