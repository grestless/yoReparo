export interface Technician {
    id: number;
    created_at: string;
    name: string;
    role: string;
    status: 'active' | 'inactive';
    phone?: string;
    email?: string;
}

export interface ServiceRequest {
    id: number;
    created_at: string;
    client_name: string;
    phone: string;
    address: string;
    location_type: string;
    services: string;
    issue_type: string;
    urgency: 'normal' | 'urgente';
    scheduled_date: string | null;
    time_slot: string | null;
    message: string | null;
    status: 'pendiente' | 'asignado' | 'en_proceso' | 'finalizado' | 'cancelado';
    technician_id: number | null;
    technicians?: {
        name: string;
    };
}
