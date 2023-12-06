import React from 'react';
import ReduxProvider from '@/context/ReduxProvider';
import AletContainer from '@/components/General/Alert';
import { store } from '@/context';
import { hideAlert, showAlert } from '@/context/slices/alertSlice';

describe('<ClientAlertWrapper />', () => {
  // initial dialog check
  it('renders', () => {
    cy.mount(
      <ReduxProvider>
        <AletContainer />
      </ReduxProvider>
    );
  });

  // check if dialog opens with content
  it('dialog should show the content', () => {
    const data = {
      alertState: true, // show the modal
      alertContent: <p>Hello world</p> // content
    };
    store.dispatch(showAlert(data));
    cy.mount(
      <ReduxProvider>
        <AletContainer />
      </ReduxProvider>
    );

    // p should be exist and have content
    cy.get('.MuiDialogContent-root').should('contains.text', 'Hello world');
  });

  // check if dialog closes after hideAlert
  it('dialog should remove the content', () => {
    const data = {
      alertState: true, // show the modal
      alertContent: <p>Hello world</p> // content
    };

    store.dispatch(showAlert(data)); // render data

    cy.mount(
      <ReduxProvider>
        <AletContainer />
      </ReduxProvider>
    );

    store.dispatch(hideAlert()); // remove content

    // the content must be full
    cy.get('.MuiDialogContent-root').should('contain.text', '');
  });

  it('dialog should show the custom title', () => {
    const data = {
      alertState: true,
      alertContent: <p>Hello world</p>,
      alertHeaderTitle: <>Title</> // check if it fits
    };

    store.dispatch(showAlert(data));

    cy.mount(
      <ReduxProvider>
        <AletContainer />
      </ReduxProvider>
    );
    // if title has Title
    cy.get('[data-test-id=universal-alert-app]').should(
      'contain.text',
      'Title'
    );
  });

  it('dialog should show back Icon', () => {
    const data = {
      alertState: true,
      alertContent: <p>Hello world</p>,
      alertBackIconFunction: () => {} // active back Icon
    };

    store.dispatch(showAlert(data));

    cy.mount(
      <ReduxProvider>
        <AletContainer />
      </ReduxProvider>
    );
    // it must render svg icon if back Icon exits
    cy.get('[data-test-id=universal-alert-app]').should('contain.html', 'svg');
  });
});
