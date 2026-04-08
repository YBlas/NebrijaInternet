import { NextRequest, NextResponse } from "next/server";



export const proxy = (request: NextRequest) => {

    console.log(request.url);

    // const isRutaImportante = request.nextUrl.pathname.startsWith('/importante');

    const esLegal = request.cookies.get('esLegal');

    // if(isRutaImportante && !esLegal){
    //     return NextResponse.redirect(new URL ('/', request.url));
    // }

    if(!esLegal){
        return NextResponse.redirect(new URL ('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/importante/:path*']
}