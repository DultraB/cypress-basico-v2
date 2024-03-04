Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=>{
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('email@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
   
})
 