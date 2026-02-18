class TransactionNode {
  constructor(id, title, amount, type) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addTransaction(title, amount, type) {
    const node = new TransactionNode(Date.now(), title, amount, type);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size++;
  }

  deleteTransaction(id) {
    let current = this.head;

    while (current) {
      if (current.id == id) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;

        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;

        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  getAll() {
    let data = [];
    let current = this.head;

    while (current) {
      data.push(current);
      current = current.next;
    }

    return data;
  }

  getTotal() {
    let total = 0;
    let current = this.head;

    while (current) {
      if (current.type === "expense") total -= Number(current.amount);
      else total += Number(current.amount);

      current = current.next;
    }

    return total;
  }
}

const transactionList = new DoublyLinkedList();
