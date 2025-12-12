"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

export function AdminNotificationListener() {
    const router = useRouter();

    useEffect(() => {
        console.log("AdminNotificationListener: Mounting and subscribing...");

        const channel = supabase
            .channel("admin-notifications")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "requests",
                },
                (payload: RealtimePostgresInsertPayload<{ [key: string]: any }>) => {
                    console.log("AdminNotificationListener: New request received:", payload);
                    const newRecord = payload.new;

                    // Play a sound if possible (optional, but good for "pop-up" feel)
                    // const audio = new Audio('/notification.mp3');
                    // audio.play().catch(e => console.log('Audio play failed', e));

                    toast.success(`¡Nueva Solicitud!`, {
                        description: `${newRecord.name || "Cliente"} ha enviado una solicitud.`,
                        duration: 5000, // Auto-dismiss after 5 seconds
                        position: "top-center", // Force top center for this toast
                        style: {
                            background: "#10B981", // Green background
                            color: "white",
                            border: "none",
                            fontSize: "16px"
                        },
                        className: "p-4"
                    });
                }
            )
            .subscribe((status) => {
                console.log("AdminNotificationListener: Subscription status:", status);
                if (status === "SUBSCRIBED") {
                    // toast.info("Sistema de notificaciones activo");
                }
                if (status === "CHANNEL_ERROR") {
                    console.error("AdminNotificationListener: Channel error");
                }
            });

        return () => {
            console.log("AdminNotificationListener: Unsubscribing...");
            supabase.removeChannel(channel);
        };
    }, [router]);

    return null;
}
