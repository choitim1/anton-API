/// <reference types = 'cypress' />

const Url = "https://api.realworld.io/api";
import { faker } from "@faker-js/faker";
let token;
let email;
let password;
let slug;
describe("POST", () => {
  it.skip("Should register a new user ", () => {
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
        email: "tim491@mail.ru",
        password: "tim491",
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
        expect(res.user.email).to.equal("tim491@mail.ru");
        token = res.user.token;
        cy.log(token);
      });
  });
  it("Should add new article", () => {
    cy.request({
      method: "Post",
      url: "https://api.realworld.io/api/articles",
      auth: { bearer: token },
      body: {
        article: {
          title: "Article about API",
          description: "How to add new article",
          body: "Let be string",
          tagList: ["New Tag"],
        },
      },
    })
      .then((res) => {
        //debugger;
        expect(res.status).to.eq(200);
        expect(res.statusText).to.eql("OK");
        expect(res.body.article.title).to.contain("Article about API");
        cy.log(res);
      })
      .its("body")
      .then((body) => {
        cy.log(body);
        expect(body.article.title).to.equal("Article about API");
        slug = body.article.slug;
        cy.log(slug);
      });
  });
  it("should get article", () => {
    cy.request({
      method: "Get",
      url: `${Url}/articles/feed?limit=20`,
      auth: { bearer: token },
    }).then((res) => {
      cy.log(res);
      //debugger;
    });
  });
  it("should to delete created article", () => {
    cy.request({
      method: "delete",
      url: `${Url}/articles/Article-about-API-134573`,
      auth: { bearer: token },
    }).then((res) => {
      cy.log(res);
      expect(res.status).to.eq(204);
    });
  });
});
//! тест надо выбрать или как новый пользователь или logIn
