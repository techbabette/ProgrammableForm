import ProgrammableForm from './ProgrammableForm.vue'

describe('<ProgrammableForm />', () => {
  it('Catches value changes', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ProgrammableForm, {propsData : {
      inputs : {
        firstField : {
          props : {
            label : "First field"
          }
        },
        secondField : {
          props : {
            label : "Second field",
            fieldType : "number"
          }
        }
      }
    }}).then(() => {
      cy.get("[name=secondField]").type("5");
    })
  })
})