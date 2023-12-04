describe('Logout Test',()=>{
    beforeEach(() =>{
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
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
    it('1.LogOut',() =>{
        //Logo is not there
        cy.get('.orangehrm-login-branding').should('not.exist')

        //Click on the user tab
        cy.get('.oxd-userdropdown-tab').click()
        //click on the logout button
        cy.get('.oxd-dropdown-menu li').wait(300).eq(3).click();

        
        //Logo is there
        cy.get('.orangehrm-login-branding').should('exist')
    })
})