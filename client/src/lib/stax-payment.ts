interface PaymentRequest {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  registrationId?: number;
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  status?: string;
  message?: string;
  amount?: number;
}

export async function processPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Create a tokenized version of the card data for security
    const cardToken = await createCardToken(paymentData);
    
    // Process payment through our backend (which would integrate with STAX)
    const response = await fetch("/api/payments/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        cardToken,
        registrationId: paymentData.registrationId,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Payment failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Payment processing failed",
    };
  }
}

async function createCardToken(paymentData: PaymentRequest): Promise<string> {
  // In a real implementation, this would use STAX's tokenization API
  // For now, we'll create a mock token
  const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockToken;
}

export async function validateCard(cardNumber: string, expiryDate: string, cvv: string): Promise<boolean> {
  // Basic client-side validation
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  const cleanExpiryDate = expiryDate.replace(/\D/g, '');
  const cleanCvv = cvv.replace(/\D/g, '');

  // Check card number length
  if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
    return false;
  }

  // Check expiry date format (MMYY)
  if (cleanExpiryDate.length !== 4) {
    return false;
  }

  // Check CVV length
  if (cleanCvv.length < 3 || cleanCvv.length > 4) {
    return false;
  }

  // Check if expiry date is in the future
  const month = parseInt(cleanExpiryDate.substring(0, 2));
  const year = parseInt(cleanExpiryDate.substring(2, 4)) + 2000;
  const currentDate = new Date();
  const expiryDateObj = new Date(year, month - 1);

  if (expiryDateObj <= currentDate) {
    return false;
  }

  return true;
}

export function formatCardNumber(value: string): string {
  const cleanValue = value.replace(/\s/g, '');
  const match = cleanValue.match(/\d{4}/g);
  return match ? match.join(' ') : cleanValue;
}

export function formatExpiryDate(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
  }
  return cleanValue;
}
