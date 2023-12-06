import React from 'react';
import ReduxProvider from '@/context/ReduxProvider';
import { store } from '@/context';
import UniversalModalContainer from '@/components/General/Modal';
import { hideModal, showModal } from '@/context/slices/modalSlice';

describe('<ClientModalWrapper />', () => {
  // initial dialog check
  it('renders', () => {
    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );
  });

  // check if dialog opens with content
  it('dialog should show the content', () => {
    const data = {
      modalState: true, // show the modal
      modalContent: <p>Hello world</p> // content
    };
    store.dispatch(showModal(data));
    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );

    // p should be exist and have content
    cy.get('.MuiDialogContent-root').should('contains.text', 'Hello world');
  });

  // check if dialog closes after hideModal
  it('dialog should remove the content', () => {
    const data = {
      modalState: true, // show the modal
      modalContent: <p>Hello world</p> // content
    };

    store.dispatch(showModal(data)); // render data

    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );

    store.dispatch(hideModal()); // remove content

    // the content must be full
    cy.get('.MuiDialogContent-root').should('not.exist');
  });

  it('dialog should show the custom title', () => {
    const data = {
      modalState: true,
      modalContent: <p>Hello world</p>,
      modalHeaderTitle: <>Title</> // check if it fits
    };

    store.dispatch(showModal(data));

    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );
    // if title has Title
    cy.get('[data-test-id=universal-modal-app]').should('contain.text', 'Title');
  });

  it('dialog should show back Icon', () => {
    const data = {
      modalState: true,
      modalContent: <p>Hello world</p>,
      modalBackIconFunction: () => {} // active back Icon
    };

    store.dispatch(showModal(data));

    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );
    // it must render svg icon if back Icon exits
    cy.get('[data-test-id=universal-modal-back-icon]').should('contain.html', 'svg');
  });

  it('dialog should not ne able to be closed when clicked outside the box', () => {
    const data = {
      modalState: true,
      modalContent: <p>Hello world</p>,
      modalDisableClose: true // esc key should not work
    };

    store.dispatch(showModal(data));

    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );
    // it must not be closed when click outside
    cy.get('body').type('{esc}');
    cy.get('.MuiDialogContent-root').should('exist');
  });

  it('dialog should display action ', () => {
    const data = {
      modalState: true,
      modalContent: <p>Hello world</p>,
      modalActions: <button>hey</button> // action button
    };

    store.dispatch(showModal(data));

    cy.mount(
      <ReduxProvider>
        <UniversalModalContainer />
      </ReduxProvider>
    );
    // it must renders dialog action in the modal
    cy.get('.MuiDialogActions-root').should('exist');
  });
});
