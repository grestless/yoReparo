import * as z from "zod";

export const requestSchema = z.object({
    // Step 0: Location
    locationType: z.enum(["hogar", "empresa", "local"], {
        message: "Por favor seleccioná un tipo de ubicación.",
    }),

    // Step 1: Service & Urgency
    urgency: z.enum(["normal", "urgente"]),

    // Step 2: Availability
    scheduledDate: z.string().min(1, "Seleccioná una fecha preferida."),
    timeSlot: z.string().min(1, "Seleccioná una franja horaria."),

    // Step 3: Details
    issueType: z.string().optional(),
    message: z.string().min(10, "Por favor describí el problema con al menos 10 caracteres."),

    // Step 4: Contact
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
    phone: z.string().min(8, "Ingresá un número de teléfono válido."),
    address: z.string().min(5, "La dirección debe ser más detallada."),
});

export type RequestFormData = z.infer<typeof requestSchema>;
