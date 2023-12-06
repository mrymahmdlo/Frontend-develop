import ProviderBtn from '@/components/General/AuthProviderBtns/ProviderBtn';

describe('ProviderBtn', () => {
  // Button label
  const label = 'Hi there';

  it('button should contains label', () => {
    // Mount ProviderBtn component with label prop
    cy.mount(<ProviderBtn showSpinner={false} label={label} />);

    // button should contains label
    cy.get('button').should('contains.text', label);
  });

  it('button with id should contains label', () => {
    // Mount ProviderBtn component with label and id props
    cy.mount(<ProviderBtn showSpinner={false} label={label} id='btn' />);

    // button with id should contains label
    cy.get('#btn').should('contains.text', label);
  });

  it('button with iconName prop should contains svg element', () => {
    // Mount ProviderBtn component with id and iconName props
    cy.mount(<ProviderBtn showSpinner={false} id='btn' iconName='apple' />);

    // button with iconName and id props should contains svg element
    cy.get('button#btn').should('contain.html', 'svg');
    // button with just iconName and id props should not contains label
    cy.get('button#btn').should('not.contain.text', label);
  });

  it('button with iconName prop should contains svg element and label', () => {
    // Mount ProviderBtn component with label, id and iconName props
    cy.mount(
      <ProviderBtn
        showSpinner={false}
        label={label}
        id='btn'
        iconName='apple'
      />
    );

    // button with id, iconName and label props should contains svg element
    cy.get('button#btn').should('contain.html', 'svg');
    // button with id, iconName and label should contains label
    cy.get('button#btn').should('contains.text', label);
  });
});
