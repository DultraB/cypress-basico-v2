/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
        it('verifica o título da aplicação', function() {
            cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
        })
        it('preenche os campos obrigatórios e envia o formulário', function(){
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('email@exemplo.com')
            cy.get('#open-text-area').type('teste')
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
        })
        it(('Digitando texto longo, delay'), function(){
            const longText = 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,'
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('email@exemplo.com')
            cy.get('#open-text-area').type(longText, {delay:0})
            cy.get('button[type="submit"]').click()
            cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')

        })
        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',() => {
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('email@exemplo')
            cy.get('#open-text-area').type('teste')
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
        })
        it('Se não for digitado valor numerico, campo continua vázio',() => {
            cy.get('#phone')
            .type('kkkkkkkk')
            .should('have.value','')    
        })
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('email@exemplo.com')
            cy.get('#open-text-area').type('teste')
            cy.get('#phone-checkbox').check()
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })
        it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
            cy.get('#firstName')
                .type('Walmyr')
                .should('be.value','Walmyr')
                .clear().should('have.value','')
            cy.get('#lastName')
                .type('Filho')
                .should('be.value','Filho')
                .clear().should('have.value','')
            cy.get('#email')
                .type('email@exemplo.com')
                .should('be.value','email@exemplo.com')
                .clear().should('have.value','')
            cy.get('#open-text-area')
                .type('teste')
                .should('be.value','teste')
                .clear().should('have.value','')
            cy.get('#phone')
                .type('123456789')
                .should('have.value','123456789') 
                .clear().should('have.value','')
        })
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
            cy.get('button[type="submit"]').click()
            cy.get('.error').should('be.visible')
        })
        it('envia o formuário com sucesso usando um comando customizado', () => {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
        })
        it('Usar a opção de contains', () => {
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
        })
        it('seleciona um produto (YouTube) por seu texto', () => {
            cy.get('#product')
                .select('YouTube')
                .should('be.value','youtube')
        })
        it('seleciona um produto (Mentoria) por seu valor (value)', () => {
            cy.get('#product')
                .select('mentoria')
                .should('be.value','mentoria')
        })
        it('seleciona um produto (Blog) por seu índice', () => {
            cy.get('#product')
                .select(1)
                .should('be.value', 'blog')
        })
        it('marca o tipo de atendimento "Feedback"', () => {
            cy.get('input[type="radio"][value="feedback"]')
                .check()
                .should('be.value', 'feedback')
        })
        it('marca cada tipo de atendimento', () => {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(function($radio){
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                }) 
        })
        it('marca ambos checkboxes, depois desmarca o último', ()=> {
            cy.get('input[type="checkbox"]')
                .check()
                .last()
                .uncheck()
                .should('not.be.checked')
        })
        it('seleciona um arquivo da pasta fixtures', ()=>{
            cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })
        it('seleciona um arquivo simulando um drag-and-drop', ()=>{
            //darg and drop simula o ato de arrastar o arquivo para o input
            cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
            //Da um alias/ apleido para a fixture
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
                .selectFile('@sampleFile')
                .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
                })
        })
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
            cy.get('#privacy a').should('have.attr', 'target' , '_blank')
        })
        it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click()
            cy.contains('Talking About Testing').should('be.visible')
        })
        it('',()=>{

        })
       
        
       
  })
  
