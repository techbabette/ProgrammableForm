import ProgrammableForm from './ProgrammableForm.vue'

describe('<ProgrammableForm />', () => {
  it('Catches value changes', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ProgrammableForm, {propsData : {
      inputs : [
        {
          props : {
            name : "firstField",
            label : "First field"
          }
        },
        {
          props : {
            name : "secondField",
            label : "Second field",
            fieldType : "number"
          }
        }
      ]
    }}).then(() => {
      cy.get("[name=secondField]").type("5");
    })
  })
})