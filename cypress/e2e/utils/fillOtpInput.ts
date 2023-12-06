export default function fillOtpInput() {
  const OTP = '111111' as const;

  cy.get('input[id=":r0:"]').type(OTP[5]);
  cy.get('input[id=":r1:"]').type(OTP[4]);
  cy.get('input[id=":r2:"]').type(OTP[3]);
  cy.get('input[id=":r3:"]').type(OTP[2]);
  cy.get('input[id=":r4:"]').type(OTP[1]);
  cy.get('input[id=":r5:"]').type(OTP[0]);
}
