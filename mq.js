/**
 * Replaces the standard Element.
 * You can access the Element from the MQElement instance's el property.
 * @version 1.0
 */
class MQElement {
  /**
   * Creates a new MQElement based on the given Element.
   * @param {Element} element The Element reference.
   */
  constructor(element) {
    this.el = element;
  }
  
  /**
   * Sets or returns the innerText of the element.
   * If given newText, the innerText will be set.
   * Otherwise, the innerText will be returned.
   * @param {string} newText The new value of innerText.
   * @returns {string} The innerText of the element, if newText is not given.
   * @example element.text('Changed Text');
   * @example console.log(element.text());
   */
  text(newText) {
    if (newText == null) return this.el.innerText;
    else this.el.innerText = newText;
  }
  
  /**
   * Sets or returns the innerHTML of the element.
   * If given newHTML, the innerHTML will be set.
   * Otherwise, the innerHTML will be returned.
   * @param {string} newHTML The new value of innerHTML.
   * @returns {string} The innerHTML of the element, if newHTML is not given.
   * @example element.html('<strong>Bold</strong>');
   * @example console.log(element.html());
   */
  html(newHTML) {
    if (newHTML == null) return this.el.innerHTML;
    else this.el.innerHTML = newHTML;
  }
  
  /**
   * Sets or returns the value of an attribute.
   * @param {string} attributeName The name of the attribute to set or return.
   * @param {string} newValue The new value of the attribute. Leave this blank to return the current value of the attribute.
   * @returns {string} The current value of the attribute, if newValue is not given.
   * @example // Set the disabled attribute.
   * element.attr('disabled', 'true');
   * @example // Remove the disabled attribute.
   * element.attr('disabled', '');
   * @example // Return if the element is disabled.
   * element.attr('disabled');
   */
  attr(attributeName, newValue) {
    if (!attributeName) return;
    
    if (newValue) this.el.setAttribute(attributeName, newValue);
    else if (newValue == '') this.el.removeAttribute(attributeName);
    else return this.el.getAttribute(attributeName);
  }
  
  /**
   * Sets or returns the value of a style attribute.
   * @param {string} attributeName The name of the style attribute to set or return.
   * @param {string} newValue The new value of the style attribute. Leave this blank to return the current value of the style attribute.
   * @returns {string} The current value of the style attribute, if newValue is not given.
   * @example // Set the color to blue.
   * element.style('color', 'blue');
   * @example // Remove the color.
   * element.style('color', '');
   * @example // Return the color.
   * element.style('color');
   */
  style(attributeName, newValue) {
    if (!attributeName) return;
    
    if (newValue) this.el.style[attributeName] = newValue;
    else return this.el.style[attributeName];
  }
  
  /**
   * Returns if the element has the given class.
   * @param {string} className The name of the class to check for.
   * @returns {string} Whether or not the element has the given class.
   * @example const hasBorder = element.hasClass('border');
   */
  hasClass(className) {
    return className ? this.el.classList.contains(className) : false;
  }
  
  /**
   * Adds the given class if the element does not have it.
   * Removes the given class if the element has it.
   * @param {string} className The name of the class to toggle.
   * @example element.toggleClass('border');
   */
  toggleClass(className) {
    if (className) this.el.classList.toggle(className);
  }
  
  /**
   * Adds a class to the element, if it does not have the class.
   * @param {string} className The name of the class to add.
   * @example element.addClass('border');
   */
  addClass(className) {
    if (className) this.el.classList.add(className);
  }
  
  /**
   * Removes a class from the element, if it has the class.
   * @param {string} className The name of the class to remove.
   * @example element.removeClass('border');
   */
  removeClass(className) {
    if (className) this.el.classList.remove(className);
  }
  
  /**
   * Adds an event listener to the element.
   * @param {string} eventName The name of the event, exluding the text 'on', for example, .on('click') instead of .on('onclick').
   * @param {function} action The function to use when the event is triggered.
   * @example element.on('click', () => {  });
   * @example element.on('click', onClick);
   */
  on(eventName, action) {
    if (eventName && action) this.el.addEventListener(eventName, action);
  }
  
  /**
   * Removes an event listener from the element.
   * @param {string} eventName The name of the event, exluding the text 'on', for example, .off('click') instead of .off('onclick').
   * @param {function} action The function to use when the event is triggered.
   * @example element.off('click', onClick);
   */
  off(eventName, action) {
    if (eventName && action) this.el.removeEventListener(eventName, action);
  }
  
  /**
   * Removes the element from the DOM.
   * @example element.remove();
   */
  remove() {
    this.el.parentNode?.removeChild(this.el);
  }
}

/**
 * Provides query and Element creation methods.
 * @version 1.0
 */
class mq {
  /**
   * Returns an MQElement that match the given selector.
   * @param {string} selector The selector to use.
   * @returns {MQElement} One MQElement, or null if none found by the given selector.
   * @example const paragraph = mq.one('p');
   */
  static one(selector) {
    const selection = document.querySelector(selector);
    return selection ? new MQElement(selection) : null;
  }
  
  /**
   * Returns and array of MQElements that match the given selector.
   * @param {string} selector The selector to use.
   * @returns {Array} Potentially multiple MQElements, or an empty array if non were found by the given selector.
   * @example const paragraphs = mq.all('p');
   */
  static all(selector) {
    const selection = document.querySelectorAll(selector);
    
    if (!selection || !selection.length) return [];
    
    let elements = [];
    selection.forEach(element => elements.push(new MQElement(element)));
    
    return elements;
  }
  
  /**
   * Creates an element and adds it to the DOM or the given parent Element/MQElement.
   * @param {string} tag The HTML tag to create.
   * @param {Element|MQElement} parent The Element or MQElement to store the child under. If not given, the document body will be used instead.
   * @returns {MQElement} An MQElement representation of the newly created Element.
   * @example const paragraph = mq.new('p', mq.one('#paragraph-container'));
   * @example const paragraph = mq.new('p', mq.one('#paragraph-container').el);
   * @example const paragraph = mq.new('p', document.getElementById('paragraph-container'));
   */
  static new(tag, parent) {
    if (!tag) return;
    
    let parentToUse = parent;
    if (parent && parent instanceof MQElement) parentToUse = parent.el;
    
    const element = document.createElement(tag);
    
    if (parentToUse) parentToUse.appendChild(element);
    else document.body.appendChild(element);
    
    return new MQElement(element);
  }
}