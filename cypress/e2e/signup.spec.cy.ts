/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const randomPseudo = faker.internet.username();
const randomEmail = faker.internet.email();

describe("should redirect to signin", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });

  it("Should load signup page successfully", () => {
    cy.get('[data-cy="heading"]').should("exist");
  });

  it("Should display alert if password not match", () => {
    cy.get('[data-cy="alert"]').should("not.exist");
    cy.get('input[role="pseudo"]').type("johndoe");
    cy.get('input[role="email"]').type("johndoe@gmail.com");
    cy.get('input[role="password"]').type("Azerty1234.");
    cy.get('input[role="confirmPassword"]').type("Azerty1234566.");
    cy.get('[data-cy="signup"]').click();
    cy.get('[data-cy="alert"]').should("exist");
  });

  it("Should display alert if email not valid", () => {
    cy.get('[data-cy="alert"]').should("not.exist");
    cy.get('input[role="pseudo"]').type("johndoe");
    cy.get('input[role="email"]').type("johndoegmail.com");
    cy.get('input[role="password"]').type("Azerty1234566.");
    cy.get('input[role="confirmPassword"]').type("Azerty1234566.");
    cy.get('[data-cy="signup"]').click();
    cy.get('[data-cy="alert"]').should("exist");
  });

  it("Should display alert if email exist in DB", () => {
    cy.get('[data-cy="alert"]').should("not.exist");
    cy.get('input[role="pseudo"]').type("johndoe");
    cy.get('input[role="email"]').type("johndoe@gmail.com");
    cy.get('input[role="password"]').type("Azerty1234566.");
    cy.get('input[role="confirmPassword"]').type("Azerty1234566.");
    cy.get('[data-cy="signup"]').click();
    cy.get('[data-cy="alert"]').should("exist");
  });

  it("Should display alert if pseudo exist in DB", () => {
    cy.get('[data-cy="alert"]').should("not.exist");
    cy.get('input[role="pseudo"]').type("johndoe");
    cy.get('input[role="email"]').type(randomEmail);
    cy.get('input[role="password"]').type("Azerty1234566.");
    cy.get('input[role="confirmPassword"]').type("Azerty1234566.");
    cy.get('[data-cy="signup"]').click();
    cy.get('[data-cy="alert"]').should("exist");
  });

  /*it("Should redirect to signin page", () => {
    cy.get('[data-cy="alert"]').should("not.exist");
    cy.get('input[role="pseudo"]').type(randomPseudo);
    cy.get('input[role="email"]').type(randomEmail);
    cy.get('input[role="password"]').type("Azerty1234566.");
    cy.get('input[role="confirmPassword"]').type("Azerty1234566.");
    cy.get('[data-cy="signup"]').click();
    cy.url().should("include", "/signin");
  });
  */
});
