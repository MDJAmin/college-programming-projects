/* =========================
   NODE
========================= */

class TransactionNode {
  constructor(id, title, amount, type) {
    this.id = id;
    this.title = title;
    this.amount = Number(amount);
    this.type = type;
    this.next = null;
    this.prev = null;
  }
}

/* =========================
   DOUBLY LINKED LIST
========================= */

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /* ---------- Utilities ---------- */

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  toArray() {
    return this.getAll().map(({ id, title, amount, type }) => ({
      id,
      title,
      amount,
      type,
    }));
  }

  loadFromArray(dataArray = []) {
    this.clear();

    dataArray.forEach(({ id, title, amount, type }) => {
      const node = new TransactionNode(id, title, amount, type);
      this._appendNode(node);
    });
  }

  _generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  _appendNode(node) {
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  /* ---------- CRUD ---------- */

  addTransaction(title, amount, type) {
    const node = new TransactionNode(this._generateId(), title, amount, type);

    this._appendNode(node);
  } // O(1)

  deleteTransaction(id) {
    let current = this.head;

    while (current) {
      if (current.id === id) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.size--;
        return true;
      }

      current = current.next;
    }

    return false;
  } // O(n)

  /* ---------- Getters ---------- */

  getAll() {
    const data = [];
    let current = this.head;

    while (current) {
      data.push(current);
      current = current.next;
    }

    return data;
  } // O(n)

  getTotal() {
    let total = 0;
    let current = this.head;

    while (current) {
      const amount = current.amount;

      total += current.type === "expense" ? -amount : amount;
      current = current.next;
    }

    return total;
  }
} // O(n)

/* =========================
   INSTANCE
========================= */

const transactionList = new DoublyLinkedList();
