let token;
let url = "https://bbb.testpro.io";
let createdPlaylistID;
let createdPlaylistName;

describe("Api request", () => {
  it("LogIN", function () {
    cy.request("POST", `${url}/api/me`, {
      email: "234@gmail.com",
      password: "te$t$tudent",
    })
      .its("body")
      .then((res) => {
        cy.log(res);
        token = res.token;
        cy.log(`token = ${token}`);
        cy.log(token);
      });
  });
  it("should create playlist", function () {
    cy.request({
      method: "POST",
      url: `${url}/api/playlist`,
      auth: {
        bearer: token,
      },
      body: {
        name: "newName",
      },
    })
      .then((data) => {
        expect(data.body.name).to.be.equal(
          data.allRequestResponses[0]["Response Body"].name
        );
      })
      .its("body")
      .then((data) => {
        cy.log(data);
        createdPlaylistName = data.name;
        createdPlaylistID = data.id;
        cy.log(`this is ${createdPlaylistID}`);

        expect(data.id).is.not.null;
        expect(data.is_smart).to.be.false;
      });
  });

  it("should get playlists", function () {
    cy.request({
      method: "GET",
      url: `${url}/api/playlist`,
      auth: {
        bearer: token,
      },
    }).then((data) => {
      cy.log(data);
      expect(data.status).to.equal(200);
      expect(data.body[0]).to.deep.equal({
        id: createdPlaylistID,
        name: "newName",
        rules: [],
        is_smart: false,
      });
    });
  });

  it("should rename playlist", function () {
    cy.request({
      method: "PUT",
      url: `${url}/api/playlist/${createdPlaylistID}`,
      auth: {
        bearer: token,
      },
      body: {
        name: "RenamedPlaylist",
      },
    })
      .then((res) => {
        cy.log(res);
        expect(res.status).to.equal(200);
      })
      .its("body")
      .then((res) => {
        cy.log(res);
        expect(res.name).to.not.equal(createdPlaylistName);
      });
  });
  it("should delete playlist", function () {
    cy.request({
      method: "DELETE",
      url: `${url}/api/playlist/${createdPlaylistID}`,
      auth: {
        bearer: token,
      },
    })
      .then((data) => {
        cy.log(data);
        expect(data.status).to.equal(200);
      })
      .its("body")
      .then((data) => {
        cy.log(data);
      });
  });
});
