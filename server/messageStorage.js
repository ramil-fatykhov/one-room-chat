export class SingleList {
  constructor(data) {
    this.data = data;
    this.next = null;
    this._length = 0;
    this.head = null;
  }

  storeMessage () {
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
