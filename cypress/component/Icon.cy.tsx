import Icon from '@/components/General/Icon';

describe('Icon', () => {
  it('should mount', () => {
    cy.mount(<Icon name='apple' />);
  });
});
