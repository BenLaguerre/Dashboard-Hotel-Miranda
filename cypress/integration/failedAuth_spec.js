describe('Failed login', {scrollBehavior: false}, () => {
  it('The URL contains login', () => {
    cy.visit('http://localhost:3000')
    
    cy.get('input[name="login"]').type('123')
    cy.wait(2000)
    cy.get('input[name="password"]').type('123')
    cy.wait(2000)
    
    cy.contains('Log in').click()
    cy.wait(2000)
    cy.url().should('include', '/login')
    
  })
})