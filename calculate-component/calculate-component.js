const CalculateComponent = function() {
  this.firstInput = element(by.model("first"));
  this.secondInput = element(by.model("second"));
  this.goButton = element(by.id("gobutton"));
  this.latestEl = element(by.binding("latest"));
  this.operator = element(by.model("operator"));

  this.selectDropdownByNumber = index => {
    element
      .all(by.tagName("option"))
      .get(index)
      .click();
  };

  this.add = (a, b) => {
    this.firstInput.sendKeys(a);
    this.secondInput.sendKeys(b);

    this.goButton.click();
  };

  this.subtract = (a, b) => {
    this.firstInput.sendKeys(a);
    this.secondInput.sendKeys(b);

    this.selectDropdownByNumber(4);

    this.goButton.click();
  };

  this.division = (a, b) => {
    this.firstInput.sendKeys(a);
    this.secondInput.sendKeys(b);

    this.selectDropdownByNumber(1);

    this.goButton.click();
  };

  this.multiplication = (a, b) => {
    this.firstInput.sendKeys(a);
    this.secondInput.sendKeys(b);

    this.selectDropdownByNumber(3);

    this.goButton.click();
  };

  this.modulo = (a, b) => {
    this.firstInput.sendKeys(a);
    this.secondInput.sendKeys(b);

    this.selectDropdownByNumber(2);

    this.goButton.click();
  };

  this.setFirstInput = value => {
    this.firstInput.sendKeys(value);
  };

  this.setSecondInput = value => {
    this.secondInput.sendKeys(value);
  };
};

module.exports = CalculateComponent;
