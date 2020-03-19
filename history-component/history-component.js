const HistoryComponent = function() {
  this.history = element.all(by.repeater("result in memory"));
};

module.exports = HistoryComponent;
