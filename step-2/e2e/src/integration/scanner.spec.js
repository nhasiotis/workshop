/// <reference types="Cypress" />

// Check the README.md file before running e2e tests
context("Given scanners", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/");
    });

    it("Should load scanner ids successfully", () => {
        cy.get('[data-id="scanner-select"]').as("ScannerDropdown");

        cy.get('[data-id="alert-msg-id"]')
            .should("have.class", "ant-alert-success")
            .should("have.text", "Data is loaded successfully");

        cy.get("@ScannerDropdown")
            .find("option")
            .its("length")
            .should("be.greaterThan", 0);

        cy.get("@ScannerDropdown")
            .select("scanner 3")
            .should("have.value", "scanner 3");
    });
});
