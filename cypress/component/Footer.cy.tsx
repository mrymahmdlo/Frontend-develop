import Footer from '@/components/General/Footer';
import { links } from '@/components/General/Footer/footerList';

describe('Footer Component', () => {
  beforeEach(() => {
    // You might want to set up your test environment or navigate to the component's page here.
    // For example, if your component is part of a web application.
  });

  it('Renders the newsletter section when isNews is true', () => {
    // You should set isNews to true before rendering the component
    cy.mount(<Footer isNews={true} />);
    cy.get('[data-test=newsletter-section]').should('exist');
  });

  it('Does not render the newsletter section when isNews is false', () => {
    // You should set isNews to false before rendering the component
    cy.mount(<Footer isNews={false} />);
    cy.get('[data-test=newsletter-section]').should('not.exist');
  });

  it('Displays social media icons', () => {
    cy.mount(<Footer isNews={true} />);
    cy.get('[data-test=social-icons]').should('exist');
    cy.get('[data-test=social-icons]').children().should('have.length', 5); // Assuming there are 5 social icons
  });

  it('Renders product links', () => {
    cy.mount(<Footer isNews={true} />);
    cy.get('[data-test=product-links]').should('exist');
    cy.get('[data-test=product-links] a').should(
      'have.length',
      +links.Products.length
    );
  });

  it('Renders company links', () => {
    cy.mount(<Footer isNews={true} />);
    cy.get('[data-test=company-links]').should('exist');
    cy.get('[data-test=company-links] a').should(
      'have.length',
      +links.Company.length
    );
  });

  it('Renders community links', () => {
    cy.mount(<Footer isNews={true} />);
    cy.get('[data-test=community-links]').should('exist');
    cy.get('[data-test=community-links] a').should(
      'have.length',
      +links.Community.length
    );
  });

  it('Renders business links', () => {
    cy.mount(<Footer isNews={true} />);
    cy.get('[data-test=business-links]').should('exist');
    cy.get('[data-test=business-links] a').should(
      'have.length',
      +links['For business'].length
    );
  });
});
