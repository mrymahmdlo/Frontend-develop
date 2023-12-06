import passStepOne from './passStepOne';
import passStepThree from './passStepThree';
import passStepTwo from './passStepTwo';

export default function stepFourTests() {
  function skipper() {
    // Pass step one
    passStepOne();
    // Pass step two
    passStepTwo();
    // Pass step three
    passStepThree();
  }

  function passFavoriteMarketStepOne() {
    skipper();

    // Select one of market
    cy.getByData('market-item-0').find('button').click();
    cy.getByData('market-item-1').find('button').click();
    cy.getByData('market-item-4').find('button').click();

    cy.getByData('favorite-markets-step-one').submit();

    cy.intercept('GET', '/api/content/markets/tickers/?name=', {
      statusCode: 200,
      body: {
        results: [
          {
            name: 'BTC',
            abbreviation: 'Bit coin',
            sign: '/media'
          },
          {
            name: 'ETHRIUM',
            abbreviation: 'Ethrium',
            sign: '/media'
          },
          {
            name: 'BOC',
            abbreviation: 'Bit coin onion',
            sign: '/media'
          },
          {
            name: 'NYPD',
            abbreviation: 'NY Police Department',
            sign: '/media'
          },
          {
            name: 'FBI',
            abbreviation: 'Federal',
            sign: '/media'
          },
          {
            name: 'GMC',
            abbreviation: 'General Motors',
            sign: '/media'
          },
          {
            name: 'BMW',
            abbreviation: 'Be em wi :)',
            sign: '/media'
          }
        ]
      }
    }).as('get-markets');

    // Wait for sign up get markets request
    cy.wait('@get-markets').its('response.statusCode').should('eq', 200);

    // Check we are in next step of favorite market
    cy.getByData('favorite-markets-step-two');
  }

  const minimumMaximumMessage =
    'You must choose at least 2 and at most 5 items from the specified list';

  it('go to step 4 favorite markets and cannot enter into next step without choosing market', () => {
    skipper();

    cy.getByData('favorite-markets-step-one').submit();
    cy.contains(minimumMaximumMessage);
  });

  it('cannot enter into next step with one choose', () => {
    skipper();

    // Select one of market
    cy.getByData('market-item-0').find('button').click();
    cy.getByData('favorite-markets-step-one').submit();
    cy.contains(minimumMaximumMessage);
  });

  it('cannot enter into the next step with more than 5 choices', () => {
    skipper();

    // Select one of market
    cy.getByData('market-item-0').find('button').click();
    cy.getByData('market-item-1').find('button').click();
    cy.getByData('market-item-2').find('button').click();
    cy.getByData('market-item-3').find('button').click();
    cy.getByData('market-item-4').find('button').click();
    cy.getByData('market-item-5').find('button').click();

    cy.getByData('favorite-markets-step-one').submit();

    cy.contains(minimumMaximumMessage);
  });

  it('enter into the next step with between 2 and 5 choices', () => {
    passFavoriteMarketStepOne();
  });

  it('cannot send data without choosing submarket', () => {
    passFavoriteMarketStepOne();

    cy.getByData('favorite-markets-step-two').submit();
    cy.contains(minimumMaximumMessage);
  });

  it('selected market should appear in selected market section', () => {
    passFavoriteMarketStepOne();

    // Select one of market
    cy.getByData('submarket-0').click();

    // Should appear in selected market section
    cy.getDouble(
      'selected-submarket-0',
      'selected-submarket-abbreviation'
    ).should('contain.html', 'Bit coin');
    cy.getDouble('selected-submarket-0', 'selected-submarket-name').should(
      'contain.html',
      'BTC'
    );

    cy.getByData('favorite-markets-step-two').submit();

    cy.contains(minimumMaximumMessage);
  });

  it('selected market should disappear when diselect', () => {
    passFavoriteMarketStepOne();

    // Select one of market
    cy.getByData('submarket-0').click();

    // Should appear in selected market section
    cy.getByData('selected-submarket-0');

    // Should disppear when diselect
    cy.getByData('selected-submarket-0').click();
    cy.getByData('selected-submarket-0').should('not.exist');

    cy.getByData('favorite-markets-step-two').submit();

    cy.contains(minimumMaximumMessage);
  });

  it('cannot send data with one submarket choose ', () => {
    passFavoriteMarketStepOne();

    // Select one of market
    cy.getByData('submarket-0').click();

    cy.getByData('favorite-markets-step-two').submit();

    cy.contains(minimumMaximumMessage);
  });

  it('cannot send data with more than 5 choices', () => {
    passFavoriteMarketStepOne();

    // Select one of market
    cy.getByData('submarket-0').click();
    cy.getByData('submarket-0').click();
    cy.getByData('submarket-0').click();
    cy.getByData('submarket-0').click();
    cy.getByData('submarket-0').click();
    cy.getByData('submarket-0').click();

    cy.getByData('favorite-markets-step-two').submit();

    cy.contains(minimumMaximumMessage);
  });
}
