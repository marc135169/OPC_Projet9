import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";


describe("When Form is created", () => {
  test("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

describe("When a page is created", () => {
  it("a list of events is displayed", async() => {
    const {container} = render(<Home />);
    
    const debugTab = await [...container.querySelectorAll(".EventCard")];
    screen.debug(debugTab);    
    const eventsCards = await screen.getByTestId("events-testid"); 
    
    expect(eventsCards).toBeInTheDocument();
  });
  
  it("a list a people is displayed", async() => {
    // to implement
    render(<Home />);
    const peopleCards = await screen.findAllByTestId("card-people-testid");
    expect(peopleCards.length).toEqual(6);
  })
  it("a footer is displayed", () => {
    // to implement
    render(<Home />);    
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument();    
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
    render(<Home />);
    expect(screen.getByTestId("last-event")).toBeInTheDocument();
  })
});
