import AdaptableInput from './AdaptableInput.vue'

describe('<AdaptableInput />', () => {
  it('Can act as text input', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AdaptableInput, {propsData : {fieldType :'string'}}).then(() => {
      cy.get("input[type=text]")
    })
  })

  it('Can act as number input', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AdaptableInput, {propsData : {fieldType :'number'}}).then(() => {
      cy.get("input[type=number]")
    })
  })

  it('Can act as select input', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AdaptableInput, {propsData : {fieldType :'select', options: 
    [
      {id : 0, name : 'First option'}
    ]}}).then(() => {
      cy.get("select")
    })
  })

  it('Can show label', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AdaptableInput, {propsData : {label :'Text input field'}}).then(() => {
      cy.contains("Text input field").should("be.visible");
    })
  })
})