import { CountDownClock } from '@/components/General';

describe('CountDownClock', () => {
  it('counter should contains 02:00', () => {
    // Mount CountDownClock component with label prop
    cy.mount(<CountDownClock onComplete={() => console.log('done')} />);

    // div with counter test id should contain 02:00 text
    cy.get('[data-test-id="counter"]').should('contains.text', '02:00');
  });

  it('counter should contains 00:00 after complete', () => {
    // Mount CountDownClock component with label prop
    cy.mount(
      <CountDownClock second={3} onComplete={() => console.log('done')} />
    );

    // div with counter test id should contain 00:03 text
    cy.get('[data-test-id="counter"]').should('contains.text', '00:03');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    // After count down complete then it should contain 00:00 text
    cy.get('[data-test-id="counter"]').should('contains.text', '00:00');
  });
});
