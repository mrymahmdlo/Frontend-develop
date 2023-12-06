// carousel.spec.js

import Carousel from '@/components/General/Carousel';

describe('Carousel Component', () => {
  it('should render Carousel with correct number of slides', () => {
    const images = [
      {
        src: '/assets/images/slide0.png',
        height: 300,
        width: 400,
        header: 'Leading',
        subHeader: ' Cryptocurrency exchange',
        text: '500+ cryptocurrency'
      },
      {
        src: '/assets/images/slide1.png',
        height: 300,
        width: 400,
        header: 'Licensed',
        subHeader: ' operation Audited by top firm',
        text: 'Obtained regulatory license from the EU, US, Canada and Australia.Released PoR certification from Mazars and passed the security audit by Certik.'
      },
      {
        src: '/assets/images/slide2.png',
        height: 300,
        width: 400,
        header: 'Largest',
        subHeader: ' Crypto trading community',
        text: 'Auto copy elite traders’ strategies in real time'
      }
    ];

    cy.mount(<Carousel images={images} />);

    // Ensure there are the correct number of slides based on your test data
    const expectedSlideCount = images.length;

    cy.get('.swiper-slide').should('have.length', expectedSlideCount);
  });

  it('should navigate between slides', () => {
    const images = [
      {
        src: '/assets/images/slide0.png',
        height: 300,
        width: 400,
        header: 'Leading',
        subHeader: ' Cryptocurrency exchange',
        text: '500+ cryptocurrency'
      },
      {
        src: '/assets/images/slide1.png',
        height: 300,
        width: 400,
        header: 'Licensed',
        subHeader: ' operation Audited by top firm',
        text: 'Obtained regulatory license from the EU, US, Canada and Australia.Released PoR certification from Mazars and passed the security audit by Certik.'
      },
      {
        src: '/assets/images/slide2.png',
        height: 300,
        width: 400,
        header: 'Largest',
        subHeader: ' Crypto trading community',
        text: 'Auto copy elite traders’ strategies in real time'
      }
    ];

    cy.mount(<Carousel images={images} />);

    // Find and click the next slide button (if available)
    cy.get('.swiper-button-next').click();

    // Assert that the next slide is active
    cy.get('.swiper-slide-active').should('exist');

    // Find and click the previous slide button (if available)
    cy.get('.swiper-button-prev').click();

    // Assert that the previous slide is active
    cy.get('.swiper-slide-active').should('exist');
  });
});
