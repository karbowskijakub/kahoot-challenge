// Class representing a autocomplete system using a trie data structure that supports very fast search.
class AutoComplete {
  constructor() {
    this.trie = new Trie();
  }

  addToDictionary(word) {
    this.trie.addWord(word);
  }

  getAutoCompleteList(query) {
    const node = this.trie.findNode(query);
    if (!node) {
      return [];
    }
    return node.getWords();
  }
}

// Class for trie data structure implementation to sort strings.
class Trie {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
    this.word = null;
  }

  addWord(word) {
    let node = this;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new Trie();
      }
      node = node.children[char];
    }
    node.isWordEnd = true;
    node.word = word;
  }

  findNode(query) {
    let node = this;
    for (const char of query) {
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    return node;
  }

  getWords() {
    const words = [];
    if (this.isWordEnd) {
      words.push(this.word);
    }
    for (const child in this.children) {
      words.push(...this.children[child].getWords());
    }
    return words;
  }
}

// Creating a new instance of the AutoComplete class.
const autoComplete = new AutoComplete();

// Add some words to the dictionary.
autoComplete.addToDictionary("car");
autoComplete.addToDictionary("carpet");
autoComplete.addToDictionary("java");
autoComplete.addToDictionary("javascript");
autoComplete.addToDictionary("internet");

// Get the autocomplete list for different queries and log them to the console.
console.log(autoComplete.getAutoCompleteList("c")); // ["car", "carpet"]
console.log(autoComplete.getAutoCompleteList("car")); // ["car", "carpet"]
console.log(autoComplete.getAutoCompleteList("carp")); // ["carpet"]
console.log(autoComplete.getAutoCompleteList("jav")); // ["java", "javascript"]
console.log(autoComplete.getAutoCompleteList("intern")); // ["internet"]
console.log(autoComplete.getAutoCompleteList("foo")); // []
