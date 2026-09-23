// Single source of truth for the WhatsApp click-to-chat contact link.
// Keep the number and message here only — build the URL from these values
// rather than hardcoding the full link in multiple places.

// International format for wa.me: country code + number, digits only.
// No "+", spaces, brackets or hyphens.
export const WHATSAPP_NUMBER = '917588174528';

// Professional, pre-filled enquiry message.
export const WHATSAPP_MESSAGE =
  'Hi Mahesh, I came across Mahesh Builds and would like to discuss a project.';

// Final click-to-chat URL with a properly URL-encoded message.
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
