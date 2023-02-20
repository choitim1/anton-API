import meUser from "../fixtures/me-user.json";

function login() {
  cy.get("@appHeader").find('a[href$="/login"]').click();
  cy.url().should("include", "/#/login");

  cy.get(".auth-page").should("be.visible").as("loginPage");
  cy.get("@loginPage").find("h1").should("have.text", "Sign in");
  cy.get("@loginPage").find("form").should("be.visible").as("loginForm");

  cy.get("@loginForm").find("input[ng-model$=email]").type(meUser.email);
  cy.get("@loginForm").find("input[ng-model$=password]").type(meUser.password);
  cy.get("@loginForm").find("button[type=submit]").click();

  cy.get("@appHeader").should("contain.text", meUser.username);

  // cy.readFile("token.txt")
  //   .should("not.be.empty")
  //   .then((token) => {
  //     cy.visit("/", {
  //       onBeforeLoad: (window) => setJwtToken(window, token),
  //     });
  //   });
  // cy.get(".navbar").should("be.visible")
  //   .should("contain.text", meUser.username);
}

function setJwtToken(window, token) {
  window.localStorage.setItem("jwtToken", token);
}

function openMyArticles() {
  // cy.get(' ul:nth-child(3) > li:nth-child(4) > a').click()
  // cy.get (' div.user-info > div > div > div > h4').should('have.text','Tim491')
  // cy.url().should('include','https://demo.realworld.io/#/@Tim491')
  // cy.wait(2000)
  // cy.get ('  div.container.page > div > div.col-md-9 > div > ul > li:nth-child(2) > a').click()
  // cy.get (' div.banner > div > h1').should('have.text','Libero vitae cumque distinctio provident sint illo ipsum sapiente.')
  cy.get(".navbar").as("appHeader");

  // open my profile
  cy.get("@appHeader").should("contain", "T", meUser.username).click();

  // my articles should be active
  cy.get(".articles-toggle > ul > li:first-child a").should(
    "have.class",
    "active"
  );
}
function clearArticle() {
  cy.get(
    "div.banner > div > article-actions > article-meta > div > ng-transclude > span:nth-child(1) > a"
  ).click();
  cy.get(" form > fieldset > fieldset:nth-child(3) > textarea").clear();
  cy.get("");
  // cy.get('')
}

export { login, setJwtToken, openMyArticles, clearArticle };
