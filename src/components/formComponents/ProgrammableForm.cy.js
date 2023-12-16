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
  it("Shows error when value isn't valid", () => {
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
            
            if(!value){
              result.errorMessage = "First field cannot be empty";
              result.success = false;
            }

            return result;
          }
        },
      }
    }}).then(() => {
      cy.get("[name=firstField]").type("a{backspace}").blur();
      cy.contains("First field cannot be empty").should("be.visible");
    })
  })
  it("Shows close button when passed as prop", () => {
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
            
            if(!value){
              result.errorMessage = "First field cannot be empty";
              result.success = false;
            }

            return result;
          }
        },
      },
      closeFormButton : {
        name : 'closeForm',
        text : 'Close form',
        class : 'col-12'
      }
    }}).then(() => {
      cy.get("[name=closeForm]").should("have.class", "col-12");
    })
  })
  it("Can attempt to submit form", () => {
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
            
            if(!value){
              result.errorMessage = "First field cannot be empty";
              result.success = false;
            }

            return result;
          }
        },
      },
      onValidForm : function(data){
        console.log("Form is valid!");
        console.log(data);

        return {errorMessages : {}, message : "Form is valid"}
      }
    }}).then(() => {
      cy.get("[name=firstField]").type("a");
      cy.get("[name=submitForm]").click();
    })
  })
})