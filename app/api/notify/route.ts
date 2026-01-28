import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { client_name, issue_type, description, urgency, phone, location_type } = body;

        const apiKey = process.env.CALLMEBOT_API_KEY;
        const adminPhone = process.env.CALLMEBOT_PHONE_NUMBER; // Read from env

        if (!apiKey || !adminPhone) {
            console.warn("CALLMEBOT_API_KEY or CALLMEBOT_PHONE_NUMBER is not set. WhatsApp notification skipped.");
            return NextResponse.json({ message: "Configuration missing" }, { status: 200 });
        }

        const message = `*Nueva Solicitud en YoReparo* 🛠️\n\n` +
            `👤 *Cliente:* ${client_name}\n` +
            `🔧 *Problema:* ${issue_type}\n` +
            `📍 *Descripción:* ${description}\n` +
            `🚨 *Urgencia:* ${urgency}\n` +
            `📱 *Tel:* ${phone}\n\n` +
            `*Tipo de cliente:* ${location_type}\n` +
            `Ver más en el panel: https://yo-reparo-ale.vercel.app/admin`;

        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodedMessage}&apikey=${apiKey}`;

        console.log("Sending WhatsApp notification...");
        console.log(`API Key present: ${!!apiKey}`);
        console.log(`Admin Phone: ${adminPhone}`);
        console.log(`Request URL (masked): ${url.replace(apiKey, "********")}`);

        const response = await fetch(url);
        const responseText = await response.text();

        console.log(`CallMeBot Response Status: ${response.status}`);
        console.log(`CallMeBot Response Text: ${responseText}`);

        if (!response.ok) {
            throw new Error(`CallMeBot API error: ${response.statusText} - ${responseText}`);
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
