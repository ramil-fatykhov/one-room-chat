const Node = require("./node")

class SingleList {
  constructor() {
    this._length = 0;
    this.head = null;
  }

  storeMessage (value) {
    let node = new Node(value),
      currentNode = this.head;

    if (!currentNode) {
      this.head = node;
      this._length++;

      return node;
    }

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = node;

    this._length++;

    return node;
  }
}

module.exports = SingleList;