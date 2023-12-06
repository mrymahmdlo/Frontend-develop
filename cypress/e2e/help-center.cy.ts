export {};

describe('render the help center page correctly', () => {
  it('passes', () => {
    cy.visit('/help-center');
  });
});

describe('check user actions', () => {
  beforeEach(() => {
    cy.visit('/help-center');
  });

  it('get correct number of questions', () => {
    cy.contains('Help center');
    cy.get('[data-test-id=question-container]')
      .children()
      .should('not.equal', 0); 
  });

  it('open and close accordian', () => {
    cy.contains('Help center');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get('[data-test-id=question-container]').children().first().click(); // open first question
    cy.get('[data-test-id=question-container]').children().first().should("have.class","Mui-expanded");
    cy.get('.MuiAccordionSummary-content').first().click();; // close first question
    cy.get('[data-test-id=question-container]').children().first().should("not.have.class","Mui-expanded");
  });

  it('only one accordian at a time', () => {
    cy.contains('Help center');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get('[data-test-id=question-container]').children().first().click(); // open first question
    cy.get('[data-test-id=question-container]').children().first().should("have.class","Mui-expanded");
    cy.get('[data-test-id=question-container]').children().last().click(); // open last accordian
    cy.get('[data-test-id=question-container]').children().first().should("not.have.class","Mui-expanded"); // only last elements have expanded class
  });
});
