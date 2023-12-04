describe('Login Test', () => {
  beforeEach(() =>{
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  })
  it('1.Test-Login(Valid)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in username credentials
    cy.get('[name="username"]').type('Admin');
    //Type in password credentials
    cy.get('[name="password"]').type('admin123')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check to see if you are logged in 
    cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard')
  })
  it('2.Test-Login(inValid-Username)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in wrong username credentials
    cy.get('[name="username"]').type('Admin1');
    //Type in password credentials
    cy.get('[name="password"]').type('admin123')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if alert is shown
    cy.get('.oxd-alert.oxd-alert--error').should('contain', 'Invalid credentials');
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('3.Test-Login(inValid-Passowrd)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in username credentials
    cy.get('[name="username"]').type('Admin');
    //Type in wrong password credentials
    cy.get('[name="password"]').type('admin1234')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if alert is shown
    cy.get('.oxd-alert.oxd-alert--error').should('contain', 'Invalid credentials');
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('4.Test-Login(inValid-Both)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in wrong username credentials
    cy.get('[name="username"]').type('Admin1');
    //Type in wrong password credentials
    cy.get('[name="password"]').type('admin1234')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if alert is shown
    cy.get('.oxd-alert.oxd-alert--error').should('contain', 'Invalid credentials');
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('5.Test-Login(inValid-Case-Username)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in wrong username credentials
    cy.get('[name="username"]').type('admin');
    //Type in password credentials
    cy.get('[name="password"]').type('admin123')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if alert is shown
    cy.get('.oxd-alert.oxd-alert--error').should('contain', 'Invalid credentials');
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('6.Test-Login(inValid-Case-Passowrd)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in username credentials
    cy.get('[name="username"]').type('Admin');
    //Type in wrong password credentials
    cy.get('[name="password"]').type('Admin123')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if alert is shown
    cy.get('.oxd-alert.oxd-alert--error').should('contain', 'Invalid credentials');
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('7.Test-Login(inValid-Case-Both)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Type in wrong username credentials
    cy.get('[name="username"]').type('admin');
    //Type in wrong password credentials
    cy.get('[name="password"]').type('Admin123')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if alert is shown
    cy.get('.oxd-alert.oxd-alert--error').should('contain', 'Invalid credentials');
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('8.Test-Login(inValid-Empty-Username)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Check if input alert is shown
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('not.exist')
    //Type in password credentials
    cy.get('[name="password"]').type('admin123')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if input alert is shown
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('exist').should('have.text','Required')
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('9.Test-Login(inValid-Empty-Passowrd)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Check if input alert is shown
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('not.exist')
    //Type in username credentials
    cy.get('[name="username"]').type('Admin');
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if input alert is shown
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('exist').should('have.text','Required')
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
  it('10.Test-Login(inValid-Empty-Both)', () => {
    //Logo is there
    cy.get('.orangehrm-login-branding').should('exist')
    //Check if input alert is shown
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('not.exist')
    //Click on the Login button
    cy.get('.orangehrm-login-button').click()
    //Check if input alert is shown
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('exist').should('have.text','RequiredRequired')
    //Check if you are still on the same page
    cy.get('.orangehrm-login-branding').should("exist")
  })
})