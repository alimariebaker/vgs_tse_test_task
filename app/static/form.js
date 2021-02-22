const vgsForm = window.VGSCollect.create('tntd7ulqmxm', 'sandbox', (state) => {});

const css = {
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI"',
};

vgsForm.field('#cc-number', {
  type: 'card-number',
  name: 'card_number',
  successColor: '#4F8A10',
  errorColor: '#D8000C',
  placeholder: 'Card number',
  showCardIcon: true,
  validations: ['required', 'validCardNumber'],
  css: css,
});

vgsForm.field('#cc-cvv', {
  type: 'card-security-code',
  name: 'card_cvv',
  successColor: '#4F8A10',
  errorColor: '#D8000C',
  placeholder: 'CVV',
  maxLength: 3,
  validations: ['required', 'validCardSecurityCode'],
  css: css,
});

vgsForm.field('#cc-expiration-date', {
  type: 'card-expiration-date',
  name: 'card_exp',
  successColor: '#4F8A10',
  errorColor: '#D8000C',
  placeholder: 'MM / YY',
  validations: ['required', 'validCardExpirationDate'],
  css: css,
});


document.querySelector("form").addEventListener('submit', (e) => {
  e.preventDefault();
  vgsForm.submit('/secure', {
    method: 'POST',
    serializer: 'deep',
    serialization: 'json'
    },
    (status, response) => {
      console.log('RESPONSE RECEIVED: ', status, response);
      window.location.href="outbound";
    },
    (error) => {
      console.log(error);
    }
  );
});
