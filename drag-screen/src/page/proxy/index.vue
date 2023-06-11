<script setup>
// todo shallowRef差别
import { ref, reactive } from 'vue'

let func = ref(`function hook(data, currentLine) {
    data.proxyObject.a = 1;
    data.proxyObject.a;
    delete data.proxyObject.a;
}`);
let currentLine = { num: 0 };
let result = reactive([]);


let definePropObject = {};
let definePropArray = [];
let originObject = {};
let originArray = [];
let proxyObject = new Proxy(originObject, {
    get: (target, propkey, receiver) => {
        result.push(`${currentLine.num}行触发 proxy get监听方法`)
        console.log("get", target, propkey, receiver)
        return target[propkey];
    },
    set: (target, propkey, value) => {
        result.push(`${currentLine.num}行触发 proxy set监听方法`)
        target[propkey] = value;
        console.log("set", target, propkey, value)
        return true
    },
    apply (target, ctx, args) {
        result.push(`${currentLine.num}行触发 proxy apply监听方法`)
        console.log("apply", target, ctx, args);
        return true
    },
    has: (target, propkey) => {
        result.push(`${currentLine.num}行触发 proxy has监听方法`)
        console.log("has", target, propkey);
        return true
    },
    construct (target, args, newTarget) {
        result.push(`${currentLine.num}行触发 proxy construct监听方法`)
        console.log("construct", target, args, newTarget);
        return true
    },
    deleteProperty (target, key) {
        result.push(`${currentLine.num}行触发 proxy deleteProperty监听方法`)
        console.log("deleteProperty", target, key);
        return true
    },
    getOwnPropertyDescriptor (target, key) {
        result.push(`${currentLine.num}行触发 proxy getOwnPropertyDescriptor监听方法`)
        console.log("getOwnPropertyDescriptor", target, key);
        return Object.getOwnPropertyDescriptor(target, key);
    },
    getPrototypeOf (target) {
        result.push(`${currentLine.num}行触发 proxy getPrototypeOf监听方法`)
        console.log("getPrototypeOf", target);
        return true
    },
    isExtensible (target) {
        result.push(`${currentLine.num}行触发 proxy isExtensible监听方法`)
        console.log("isExtensible", target);
        return true
    },
    ownKeys (target) {
        result.push(`${currentLine.num}行触发 proxy ownKeys监听方法`)
        console.log("ownKeys", target);

        return true
    },
    preventExtensions (target) {
        result.push(`${currentLine.num}行触发 proxy preventExtensions监听方法`)
        console.log("preventExtensions", target);
        return true
    },
    setPrototypeOf (target) {
        result.push(`${currentLine.num}行触发 proxy setPrototypeOf监听方法`)
        console.log("setPrototypeOf", target);
        return true
    },
})
let proxyArray = new Proxy(originArray, {
    get: (target, propkey, receiver) => {
        result.push(`${currentLine.num}行触发 proxy get监听方法`)
        console.log("get", target, propkey, receiver)
        return target[propkey];
    },
    set: (target, propkey, value) => {
        result.push(`${currentLine.num}行触发 proxy set监听方法`)
        target[propkey] = value;
        console.log("set", target, propkey, value)
        return true
    },
    apply (target, ctx, args) {
        result.push(`${currentLine.num}行触发 proxy apply监听方法`)
        console.log("apply", target, ctx, args);
        return true
    },
    has: (target, propkey) => {
        result.push(`${currentLine.num}行触发 proxy has监听方法`)
        console.log("has", target, propkey);
        return true
    },
    construct (target, args, newTarget) {
        result.push(`${currentLine.num}行触发 proxy construct监听方法`)
        console.log("construct", target, args, newTarget);
        return true
    },
    deleteProperty (target, key) {
        result.push(`${currentLine.num}行触发 proxy deleteProperty监听方法`)
        console.log("deleteProperty", target, key);
        return true
    },
    getOwnPropertyDescriptor (target, key) {
        result.push(`${currentLine.num}行触发 proxy getOwnPropertyDescriptor监听方法`)
        console.log("getOwnPropertyDescriptor", target, key);
        return Object.getOwnPropertyDescriptor(target, key);
    },
    getPrototypeOf (target) {
        result.push(`${currentLine.num}行触发 proxy getPrototypeOf监听方法`)
        console.log("getPrototypeOf", target);
        return true
    },
    isExtensible (target) {
        result.push(`${currentLine.num}行触发 proxy isExtensible监听方法`)
        console.log("isExtensible", target);
        return true
    },
    ownKeys (target) {
        result.push(`${currentLine.num}行触发 proxy ownKeys监听方法`)
        console.log("ownKeys", target);
        return true
    },
    preventExtensions (target) {
        result.push(`${currentLine.num}行触发 proxy preventExtensions监听方法`)
        console.log("preventExtensions", target);
        return true
    },
    setPrototypeOf (target) {
        result.push(`${currentLine.num}行触发 proxy setPrototypeOf监听方法`)
        console.log("setPrototypeOf", target);
        return true
    },
})
let data = {
    definePropObject,
    definePropArray,
    proxyObject,
    proxyArray
}
Object.defineProperty(data, "definePropObject",  {
    get: () => {
        result.push(`${currentLine.num}行触发 defineProperty get监听方法`)
        return definePropObject
    },
    set: () => {
        result.push(`${currentLine.num}行触发 defineProperty set监听方法`)
    }
});
Object.defineProperty(data, "definePropArray", {
    get: () => {
        result.push(`${currentLine.num}行触发 defineProperty get监听方法`)
        return definePropArray
    },
    set: () => {
        result.push(`${currentLine.num}行触发 defineProperty set监听方法`)
    }
});

function changeFunc (e){
    func.value  = e.target.value;
}

function createExecFunc() {
    const formatFunc = `return ${func.value}`
        .replace(/\n/g, "\ncurrentLine.num++;\n");
    return new Function(formatFunc)()
}

function execFunc() {
    const canExecFunc = createExecFunc();
    clearResult();
    canExecFunc(data, currentLine);
}

function clearResult() {
    currentLine = { num: 0 };
    result.splice(0, result.length);
}

</script>

<template>
  <div class="flex flex-row">
    <textarea 
        contenteditable="true"
        class="w-96 h-96"
        :value="func"
        @input="changeFunc"
    >
    </textarea>
    <ul
        class="w-96 h-96"
    >
        <li v-for="(item, index) in result" :key="index">{{item}}</li>
    </ul>
  </div>
  <button @click="execFunc">执行</button>
</template>
