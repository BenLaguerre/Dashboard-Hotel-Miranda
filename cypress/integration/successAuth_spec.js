

describe('Successful login', {scrollBehavior: false} , () => {
  
  it('The url does not contain login', () => {
   
    cy.visit('http://localhost:3000')
    
    cy.get('input[name="login"]').type('ben')
    cy.wait(2000)
    cy.get('input[name="password"]').type('admin')
    cy.wait(2000)
    cy.contains('Log in').click()
    cy.wait(2000)
    cy.url().should('not.include', '/login')
    
  })
})