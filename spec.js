let CalculateComponent = require("./calculate-component/calculate-component");
let HistoryComponent = require("./history-component/history-component");

describe("Protractor Demo App", () => {
  let calculateComponent = new CalculateComponent();
  let historyComponent = new HistoryComponent();

  beforeEach(() => {
    browser.get("http://juliemr.github.io/protractor-demo/");
  });

  it("should have a url", () => {
    expect(browser.getCurrentUrl()).toEqual(
      "http://juliemr.github.io/protractor-demo/"
    );
  });

  it("should have a title", () => {
    expect(browser.getTitle()).toEqual("Super Calculator");
  });

  it("should add eleven and fifteen", () => {
    calculateComponent.add(11, 15);
    expect(calculateComponent.latestEl.getText()).toEqual("26");
  });

  it("should add one and three", () => {
    calculateComponent.add(1, 3);

    expect(calculateComponent.latestEl.getText()).toEqual("4");
  });

  it("should read the value from an input", () => {
    calculateComponent.setFirstInput(2);
    expect(calculateComponent.firstInput.getAttribute("value")).toEqual("2");

    calculateComponent.setSecondInput(1330);
    expect(calculateComponent.secondInput.getAttribute("value")).toEqual(
      "1330"
    );
  });

  it("should a have history", () => {
    calculateComponent.add(3, 7);
    calculateComponent.add(2, 9);
    expect(historyComponent.history.count()).toEqual(2);

    calculateComponent.add(5, 5);

    expect(historyComponent.history.last().getText()).toContain("10");
  });

  it("should choose operators", () => {
    let operators = element.all(
      by.options("value for (key, value) in operators")
    );

    expect(operators.count()).toEqual(5);

    expect(operators.last().getText()).toEqual("-");
  });

  it("should subtract two values", () => {
    calculateComponent.subtract(17, 3);
    expect(calculateComponent.latestEl.getText()).toEqual("14");

    expect(
      historyComponent.history
        .last()
        .element(by.binding("result.value"))
        .getText()
    ).toEqual("14");

    expect(calculateComponent.operator.getAttribute("value")).toEqual(
      "SUBTRACTION"
    );
  });

  it("should division two values", () => {
    calculateComponent.division(144, 12);

    expect(calculateComponent.latestEl.getText()).toBe("12");

    expect(calculateComponent.operator.getAttribute("value")).toEqual(
      "DIVISION"
    );
  });

  it("should multiplication two values", () => {
    calculateComponent.multiplication(7, 15);
    expect(calculateComponent.latestEl.getText()).toEqual("105");

    expect(calculateComponent.operator.getAttribute("value")).toEqual(
      "MULTIPLICATION"
    );
  });

  it("should modulo two values", () => {
    calculateComponent.modulo(9, 4);
    expect(calculateComponent.latestEl.getText()).toEqual("1");

    expect(calculateComponent.operator.getAttribute("value")).toEqual("MODULO");
  });

  it("should be infinite when division on null", () => {
    calculateComponent.division(31, 0);

    expect(calculateComponent.latestEl.getText()).toEqual("Infinity");

    expect(historyComponent.history.first().getText()).toContain("Infinity");
  });

  it("should be NaN if one of the values isn't a number", () => {
    calculateComponent.add(2, "hello");

    expect(calculateComponent.latestEl.getText()).toBe("NaN");
    expect(historyComponent.history.first().getText()).toContain("NaN");

    calculateComponent.add("2", "2");

    expect(calculateComponent.latestEl.getText()).toBe("4");
  });

  it("should be NaN if values aren't passed", () => {
    calculateComponent.add("", "");

    expect(calculateComponent.latestEl.getText()).toEqual("NaN");
  });
});
