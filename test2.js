const arr = [1, 2, 3];

const obj = {
    arr,
    x : 3,
}

const newObj = Object.assign({}, obj);

console.log(newObj);

newObj.arr.push(4);

console.log(newObj);

console.log("====")

console.log(obj);