import { RuleChecker } from '@/components/General';

// assume the component is imported as RuleChecker and rendered in a page at http://localhost:3000
describe('RuleChecker component', () => {
  // check if the component has the correct label and icon
  it('should display the correct label and icon', () => {
    cy.mount(<RuleChecker label='Password must be at least 8 characters' />);
    cy.get('.rule-checker-label').should(
      'have.text',
      'Password must be at least 8 characters'
    ); // default label
    cy.get('.MuiStack-root').should('have.css', 'opacity', '1'); // check if icon is opacity 1
  });

  // check if the component changes its opacity and icon when checked
  it('should change its opacity and icon when checked', () => {
    cy.mount(
      <RuleChecker
        label='Password must be at least 8 characters'
        isChecked={true}
      />
    ); // mount the component with isChecked prop
    cy.get('.MuiStack-root').should('have.css', 'opacity', '0.5'); // check if icon is opacity 0.5
  });
});
