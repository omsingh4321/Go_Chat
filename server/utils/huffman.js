import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Hufftree {
    constructor(val, letter) {
        this.val = val;
        this.letter = letter;
        this.left = null;
        this.right = null;
    }

    // Serialize the tree to a JSON-compatible object
    serialize() {
        return {
            val: this.val,
            letter: this.letter,
            left: this.left ? this.left.serialize() : null,
            right: this.right ? this.right.serialize() : null,
        };
    }

    // Static method to deserialize a JSON-compatible object back to a Hufftree
    static deserialize(data) {
        if (!data) return null;
        const node = new Hufftree(data.val, data.letter);
        node.left = Hufftree.deserialize(data.left);
        node.right = Hufftree.deserialize(data.right);
        return node;
    }
}

function frequency(s) {
    const M = new Map();
    for (let i = 0; i < s.length; i++) {
        M.set(s[i], (M.get(s[i]) || 0) + 1);
    }
    const V = Array.from(M.entries()).map(([letter, val]) => [val, letter]);
    V.sort((a, b) => a[0] - b[0]);
    return V;
}

function makeTree(freq) {
    const Q = freq.map(([val, letter]) => new Hufftree(val, letter));
    Q.sort((a, b) => a.val - b.val);

    while (Q.length > 1) {
        const left = Q.shift();
        const right = Q.shift();
        const mix = new Hufftree(left.val + right.val, '#');
        mix.left = left;
        mix.right = right;
        Q.push(mix);
        Q.sort((a, b) => a.val - b.val);
    }
    return Q[0];
}

function tellme(M, str, root) {
    if (!root) return;
    if (root.letter !== '#') {
        M[root.letter] = str;
    } else {
        tellme(M, str + "0", root.left);
        tellme(M, str + "1", root.right);
    }
}

export function decode(root, res) {
    let ans = '';
    let currentNode = root;
    for (let i = 0; i <= res.length; i++) {
        if (currentNode.letter !== '#') {
            ans += currentNode.letter;
            currentNode = root;
        }
        if (i < res.length) {
            currentNode = res[i] === '0' ? currentNode.left : currentNode.right;
        }
    }
    return ans;
}

export function MakeEncode(plain) {
    const freq = frequency(plain);
    const tree = makeTree(freq);
    const M = {};
    tellme(M, "", tree);
    let encoded = "";
    for (let i = 0; i < plain.length; i++) {
        encoded += M[plain[i]];
    }
    return { tree: tree.serialize(), encoded };
}

export { Hufftree }; // Ensure Hufftree is exported
