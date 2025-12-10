export const WHATSAPP_NUMBER = "5493816694147"; // Format: 549 + Area Code + Number

export const getWhatsAppLink = (message: string, phoneNumber: string = WHATSAPP_NUMBER) => {
    const encodedMessage = encodeURIComponent(message);
    // Remove non-numeric characters from phone number if provided
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

export const openWhatsApp = (message: string, phoneNumber: string = WHATSAPP_NUMBER) => {
    window.open(getWhatsAppLink(message, phoneNumber), '_blank');
};
