/// <reference types = 'cypress' />

const Url = "https://api.realworld.io/api";
import { faker } from "@faker-js/faker";
let token;
let email;
let password;
describe("POST", () => {
  it("Should register a new user ", () => {
    cy.request("Post", `${Url}/users`, {
      user: {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: "zyx",
      },
    }).then((res) => {
      cy.log(res);
      expect(res.status).to.be.equal(200);
      expect(res.statusText).to.be.equal("OK");
      expect(res.body).to.have.key("user");
      const { user } = res.body;
      expect(user).to.have.all.keys(
        "username",
        "email",
        "bio",
        "image",
        "token"
      );
      expect(user.username).to.not.be.empty;
      expect(user.email).to.not.be.empty;
      expect(user.image).to.not.be.empty;
      expect(user.token).to.not.be.empty;
      cy.log(user.token);
      cy.log(user.username);
      cy.log(user.email);

      token = user.token;
      email = user.email;
      password = "zyx";
    });
  });

  it("should login existing user", () => {
    cy.request("Post", `${Url}/users/login`, {
      user: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        cy.log(res);
        expect(res.status).to.equal(200);
        expect(res.statusText).to.equal("OK");
      })
      .its("body")
      .then((res) => {
        cy.log(res);
        expect(res.user.email).to.equal(email);
        // expect(res.user.username).to.equal("Tim491");
      });
  });
});
