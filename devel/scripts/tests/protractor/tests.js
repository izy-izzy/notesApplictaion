var LOCALSERVERHTTP = 'http://localhost:8080';

describe('angularjs homepage', function() {
  it('should add a todo', function() {
    browser.get('http://localhost:4444/');

    //element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    expect(element(by.id('intro-login')).isPresent()).toBe(true);
    console.log("LOL");
    /*element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);*/
  });
});