import IndexedPair from "./class/IndexedPair";
import farach from "./functions/farach";
import radixSort from "./functions/radixSort";

const string: string = "11111111";
const suffixTree = farach([...string]);
console.log(suffixTree);

