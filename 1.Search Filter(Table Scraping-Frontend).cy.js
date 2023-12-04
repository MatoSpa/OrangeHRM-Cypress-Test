//THIS TEST CHECKS IF THE FILTER IS CORRECTLY DISPLAYING INFORMATIONS
//ITS SET FOR CHECKING THE EMPLOYEE NAME INPUT BOX AND WITH THAT THE FIRST,MIDDLE, AND LAST NAME OF THE EMPLOYEE
//IT CAN BE ADJUSTED TO OTHER INPUT BOXES AND OTHER SEARCH CRITERIA

//SOMETIMES AFTER THE DATA IS ALL GATHERED A ACCOUNT CAN BE ADDED OR DELETED OR EDITED (VERY UNLIKLY)
//- ITS A TIME FRAME OF A FEW MOMENTS, BUT IT CAN MESS WITH THE TEST 


describe('Search Filter(table scraping)', () => {
    var previousButton = ''
    var pageCount = []
    var pageCountTotal
    var number
    var numberFiltered
    var dataFirstName = []
    var dataLastName = []
    var positive = 0
    let inputValue
    let combinedData = []


    beforeEach('Logging In', () => {
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
    it('1.Test- Seach Filter - Table Scraping', () => {
        //Click on PIM
        cy.get('.oxd-main-menu li').eq(1).click()
        //Confirm you are on Pim
        cy.get('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('have.text', 'PIM')
        //Get the number of employees
        cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-paper-container > div:nth-child(2) > div > span')
            .should('contain.text', 'Records Found').invoke('text').then((text) => {
                number = text.slice(2, -15)
            })
        //Check if the number employees matches the number of rows
        cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-paper-container > div.orangehrm-container > div > div.oxd-table-body')
            .children('.oxd-table-card').its('length').then((numberOfRows) => {
                pageCount.push(numberOfRows)
            })


        // IF THERE ARE MULTIPLE PAGES        Timeout set for max optimatization~ 
        cy.get('.orangehrm-bottom-container',{ timeout: 1000 }).then(($bottomContainer) => {
            if ($bottomContainer.find('nav').length > 0) {
                // GET THE NUMBER OF BUTTONS FOR THE PAGES
                cy.get('ul[class="oxd-pagination__ul"]').should('exist').then(($ul) => {
                    cy.wrap($ul).children('li').its('length').then((pageButtonsNumber) => {
                        // THE NUMBER OF PAGES IS EQ TO NUMBER OF BUTTONS MINUS THE ('>'- NEXT PAGE) BUTTON
                        let pageNumber = pageButtonsNumber - 1

                        cy.then(() => {

                            // SCRAP TABLE FOR DATA - FIRST AND LAST NAME
                            cy.get('div.oxd-table-body > div').each(($row, index, $rows) => {
                                const firstNames = []
                                const lastNames = []
                                cy.wrap($row).within(() => {

                                    cy.get('div[role="row"] > div[role="cell"]:nth-child(3)').each(($col, index, $cols) => {
                                        const dataFN = $col.text().toLowerCase();
                                        firstNames.push(dataFN)

                                    })
                                    cy.get('div[role="row"] > div[role="cell"]:nth-child(4)').each(($col, index, $cols) => {
                                        const dataLN = $col.text().toLowerCase();
                                        lastNames.push(dataLN)

                                    })
                                })
                                dataFirstName.push(firstNames)
                                dataLastName.push(lastNames)
                            })

                            cy.then(() => {
                                // AFTER SCRAP OF THE FIRST PAGE CHANGE PAGE X NUMBER OF TIMES(X = TO THE NUMBER OF EXISTING PAGES)
                                for (let p = 2; p <= pageNumber; p++) {
                                    if (pageNumber > 1) {
                                        cy.get('ul[class="oxd-pagination__ul"]>li:nth-child(' + p + ')')
                                            .invoke('text').then((currentButton => {
                                                // CHANGE PAGE
                                                cy.get('ul[class="oxd-pagination__ul"]>li:nth-child(' + p + ')').find('button').click()
                                                cy.log('Page Change')
                                                // CONFIRM PAGE CHANGE BY CHANGE IN TEXT 
                                                cy.get('ul[class="oxd-pagination__ul"] > li:nth-child(' + p + ') > button')
                                                    .invoke('text').should('not.be.empty').and('not.eq', previousButton)
                                                // RESET
                                                currentButton = previousButton
                                                cy.log('Page Change Confirmation')
                                            }))
                                        // ON EVERY PAGE GET THE NUMBER OF ROWS
                                        cy.then(() => {
                                            cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-paper-container > div.orangehrm-container > div > div.oxd-table-body')
                                                .children('.oxd-table-card').its('length').then((numberOfRows) => {
                                                    // ADD THAT NUMBER TO THE TOTAL ROW COUNT
                                                    pageCount.push(numberOfRows)
                                                    pageCountTotal = pageCount.reduce((acc, num) => acc + num, 0);
                                                    cy.log('Total Row Count', pageCountTotal)
                                                })
                                        })
                                        // THEN SCRAP THAT PAGE FOR DATA - FIRST AND LAST NAME
                                        cy.then(() => {
                                            cy.get('div.oxd-table-body > div').each(($row, index, $rows) => {
                                                const firstNames = []
                                                const lastNames = []
                                                cy.wrap($row).within(() => {

                                                    cy.get('div[role="row"] > div[role="cell"]:nth-child(3)').each(($col, index, $cols) => {
                                                        const dataFN = $col.text().toLowerCase();
                                                        firstNames.push(dataFN)

                                                    })
                                                    cy.get('div[role="row"] > div[role="cell"]:nth-child(4)').each(($col, index, $cols) => {
                                                        const dataLN = $col.text().toLowerCase();
                                                        lastNames.push(dataLN)

                                                    })
                                                })
                                                dataFirstName.push(firstNames)
                                                dataLastName.push(lastNames)

                                            })
                                        })
                                    }
                                }
                            })
                        })
                    })
                })
            // IF IT'S ONLY ONE PAGE
            } else {
                // SCRAP TABLE FOR DATA FROM THE ONLY EXISTING PAGE - FIRST AND LAST NAME
                cy.get('div.oxd-table-body > div').each(($row, index, $rows) => {
                    const firstNames = []
                    const lastNames = []
                    cy.wrap($row).within(() => {

                        cy.get('div[role="row"] > div[role="cell"]:nth-child(3)').each(($col, index, $cols) => {
                            const dataFN = $col.text().toLowerCase();
                            firstNames.push(dataFN)

                        })
                        cy.get('div[role="row"] > div[role="cell"]:nth-child(4)').each(($col, index, $cols) => {
                            const dataLN = $col.text().toLowerCase();
                            lastNames.push(dataLN)

                        })
                    })
                    dataFirstName.push(firstNames)
                    dataLastName.push(lastNames)
                })
            }
            // COMBINE EVERY STRING FROM THE FIRST NAME CELL AND LAST NAME CELL INTO ONE STRING, FROM EVERY ROW 
            cy.then(() => {
                for (let i = 0; i < Math.min(dataFirstName.length, dataLastName.length); i++) {
                    combinedData.push(`${dataFirstName[i]} ${dataLastName[i]}`);

                }

                // GET THE NUMBER OF EMPLOYEES AND FIND OUT IF THEY MATCH WITH THE NUMBER OF TOTAL ROWS
                cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-paper-container > div:nth-child(2) > div > span')
                    .should('contain.text', 'Records Found').invoke('text').then((text) => {
                        number = text.slice(2, -15)
                        expect(String(number)).to.satisfy(value => {
                            return value === String(pageCountTotal) || value === String(pageCount);
                          });
                        cy.log('Employee Number is Correct')
                    })

                // FIND EMPLOYEE NAME AND TYPE IN X IN THE INPUT BOX
                cy.then(() => {
                    cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.oxd-table-filter > div.oxd-table-filter-area > form > div.oxd-form-row > div > div:nth-child(1) > div > div:nth-child(2) > div > div > input')
                    //YOU SET UP INPUT FOR TEST HERE!!!!!! (NOT CASE SENSITIVE)  
                    .should('exist').type('a').then(($input) => {
                            // GET THE VALUE OF THE INPUT AND STORE IT IN THE VARIABLE
                            inputValue = $input.val().toLowerCase();
                        });
                    // CHECK HOW MANY ELEMENTS CONTAIN THE LETTER FROM THE INPUT    
                    cy.then(() => {
                        cy.log('Combined dataName:', String(combinedData));
                        combinedData.forEach((name) => {
                            // CHECK IF THE CURRENT ELEMENT CONTAINS THE LETTER FROM THE INPUT
                            if (name.includes(inputValue)) {
                                positive++;
                            }
                        })
                        cy.log('Positive Number is', positive)
                    })

                })
                // FIND THE SEARCH FILTER BUTTON AND CLICK ON IT 
                cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.oxd-table-filter > div.oxd-table-filter-area > form > div.oxd-form-actions > button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space')
                    .should('exist').click()

                // GET THE NUMBER OF FILTERED EMPLOYEES AND CHECK IF IT MATCHES WITH ,,POSITIVE NUMBER''
                cy.get('#app > div.oxd-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.orangehrm-paper-container > div:nth-child(2) > div > span')
                    .should('contain.text', 'Records Found').invoke('text').then((text) => {
                        numberFiltered = text.slice(2, -15)
                        expect(String(positive)).to.eq(String(numberFiltered))
                        cy.log('Filtered numbers match')
                    })
            })
        })
    })
})