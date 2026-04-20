export const loginData = {
  validUsername: process.env.LOGIN_USERNAME || 'practice',
  validPassword: process.env.LOGIN_PASSWORD || 'SuperSecretPassword!',
  invalidUsername: 'wrongUser',
  invalidPassword: 'wrongPassword'
};

export const formData = {
  valid: {
    contactName: 'Christopher Demillo',
    contactNumber: '012-3456789',
    pickupDate: '2026-04-20',
    paymentMethod: 'card'
  },
  invalid: {
    contactName: '',
    contactNumber: '',
    pickupDate: '',
    paymentMethod: ''
  }
};

export const searchData = {
  existingKeyword: 'john',
  missingKeyword: 'zzzzzz_not_found'
};