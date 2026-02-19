import api from '../httpClient';
import { ENDPOINTS } from '../endpoints';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const contactService = {
  submitContactForm: async (data: ContactFormData) => {
    // For now, simulate API call since backend isn't ready
    // Replace with actual API call when Spring Boot is ready:
    // return api.post<ContactResponse>(ENDPOINTS.CONTACT.SUBMIT, data);
    
    console.log('Contact form submitted:', data);
    
    // Simulated response
    return new Promise<{ data: ContactResponse; error: null; status: number }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            id: `contact_${Date.now()}`,
          },
          error: null,
          status: 200,
        });
      }, 1000);
    });
  },
};

export default contactService;
