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
  it.only("Shows error when value isn't valid", () => {
    cy.mount(ProgrammableForm, {propsData : {
      inputs : {
        firstField : {
          props : {
            label : "First field",
          },
          checkFunction : function(value){
            let result = {};
            result.errorMessage = "";
            result.success = true;
            
            if(!value || value === ""){
              result.errorMessage = "First field cannot be empty";
              result.success = false;
            }

            return result;
          }
        },
      }
    }}).then(() => {
      cy.get("[name=firstField]").type("a{backspace}");
      cy.contains("First field cannot be empty").should("be.visible");
    })
  })
})