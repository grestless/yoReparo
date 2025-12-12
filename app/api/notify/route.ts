import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { client_name, issue_type, urgency, phone, location_type } = body;

        const apiKey = process.env.CALLMEBOT_API_KEY;
        const adminPhone = "5493816694147"; // Admin's phone number

        if (!apiKey) {
            console.warn("CALLMEBOT_API_KEY is not set. WhatsApp notification skipped.");
            return NextResponse.json({ message: "API Key missing" }, { status: 200 });
        }

        const message = `*Nueva Solicitud en YoReparo* 🛠️\n\n` +
            `👤 *Cliente:* ${client_name}\n` +
            `🔧 *Problema:* ${issue_type}\n` +
            `🚨 *Urgencia:* ${urgency}\n` +
            `📱 *Tel:* ${phone}\n\n` +
            `*Tipo de cliente:* ${location_type}\n` +
            `Ver más en el panel: https://yo-reparo-ale.vercel.app/admin`;

        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodedMessage}&apikey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`CallMeBot API error: ${response.statusText}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending WhatsApp notification:", error);
        return NextResponse.json(
            { error: "Failed to send notification" },
            { status: 500 }
        );
    }
}
