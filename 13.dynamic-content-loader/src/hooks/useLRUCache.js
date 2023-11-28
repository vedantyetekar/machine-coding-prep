import { useRef } from "react";

class ListNode {
  constructor(key, val) {
    this.val = val;
    this.key = key;
    this.next = null;
    this.prev = null;
  }

  addNodeToList(node) {
    let headNext = this.head.next;
    node.next = headNext;
    headNext.prev = node;
    this.head.next = node;
    node.prev = this.head;
  }

  deleteNodeFromList(node) {
    let nextNode = node.next;
    let prevNode = node.prev;
    nextNode.prev = prevNode;
    prevNode.next = nextNode;
  }
}

class LRUCache extends ListNode {
  constructor(cap) {
    super();
    this.cache = {};
    this.capacity = cap;
    this.head = new ListNode(-1, -1);
    this.tail = new ListNode(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (this.cache[key]) {
      let val = this.cache[key].val;
      this.deleteNodeFromList(this.cache[key]);
      this.addNodeToList(new ListNode(key, val));
      this.cache[key] = this.head.next;
      return val;
    }
    return null;
  }

  put(key, val) {
    if (this.cache[key]) {
      this.deleteNodeFromList(this.cache[key]);
      this.addNodeToList(new ListNode(key, val));
      this.cache[key] = this.head.next;
      return val;
    } else {
      if (Object.keys(this.cache).length >= this.capacity) {
        delete this.cache[this.tail.prev.key];
        this.deleteNodeFromList(this.tail.prev);
      }
      this.addNodeToList(new ListNode(key, val));
      this.cache[key] = this.head.next;
    }
  }

  getCachedData() {
    const arr = new Array();
    let tmp = this.head.next;
    while (tmp.next != null) {
      arr.push(tmp.key);
      tmp = tmp.next;
    }
    return arr;
  }
}

export const useLRUCache = (cap) => {
  const lruRef = useRef(new LRUCache(cap));
  console.log(lruRef);
  return {
    get: (key) => lruRef.current.get(key),
    put: (key, val) => lruRef.current.put(key, val),
    getCachedData: () => lruRef.current.getCachedData(),
  };
};
