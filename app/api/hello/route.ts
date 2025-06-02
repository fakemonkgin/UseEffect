export async function GET() {
    return Response.json({ 
      message: "Hello from Next.js 15 API!",
      timestamp: new Date().toISOString()
    })
  }
  
  export async function POST(request: Request) {
    const data = await request.json()
    return Response.json({ 
      message: "Data received successfully",
      received: data,
      timestamp: new Date().toISOString()
    })
  }