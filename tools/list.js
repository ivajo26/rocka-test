class Node {
    constructor(data, next, prev) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    };
};

class List {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    add(data) {
        const newNode = new Node(data, null, this.tail);

        if (this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            this.tail = newNode;
            this.head = newNode;
        };
        this.size++;
    };

    isEmpty() {
        return this.size === 0;
    };
}

export default function createList(array) {
    const list = new List()
    array.forEach(m => {
        list.add(m)
    });
    return list
}