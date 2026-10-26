describe('breno-cv-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the home page introduction', () => {
    cy.contains('Who am I?').should('be.visible');
  });
});
