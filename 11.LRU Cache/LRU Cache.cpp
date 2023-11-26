class Node {
    public:
    int key;
    int val;
    Node* next;
    Node* prev;
    
    Node(int key, int val) {
        this->key = key;
        this->val = val;
        next = nullptr;
        prev = nullptr;
    }
    
    static Node* addNodeToList(Node* node, Node* tail) {
        Node* tailPrev = tail->prev;
        tailPrev->next = node;
        node->prev = tailPrev;
        node->next = tail;
        tail->prev = node;
        return node;
    }
    
    static void deleteNodeFromList(Node* node) {
        Node* prevNode = node->prev;
        Node* nextNode = node->next;
        prevNode->next = nextNode;
        nextNode->prev = prevNode;
    }
};

class LRUCache
{
    public:
    unordered_map<int, Node*>m;
    int cap;
    Node* head = new Node(-1, -1);
    Node* tail = new Node(-1, -1);
    LRUCache(int cap) {
        this->cap = cap;
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if(m.find(key)!=m.end()) {
            int val = m[key]->val;
            Node* node = m[key];
            Node::deleteNodeFromList(node);
            node = Node::addNodeToList(node, tail);
            m.erase(key);
            m[key] = node;
            return val;
        }
        return -1;
    }
    
    void put(int key, int value) {
        if(m.find(key)!=m.end()) {
            Node* node = m[key];
            m.erase(key);
            Node::deleteNodeFromList(node);
            node = new Node(key, value);
            node = Node::addNodeToList(node, tail);
            m[key] = node;
        } else {
            if(m.size()>=cap) {
                m.erase(head->next->key);
                Node::deleteNodeFromList(head->next);
            }
            Node* node = new Node(key, value);
            m[key] = Node::addNodeToList(node, tail);
        }
    }
};
