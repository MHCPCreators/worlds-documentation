<p align=center>
<b>TypeScript Conventions and Best Practices for Horizon Worlds</b><br>
December 2024<br>
(Updated formatting July 2025)<br>
Shards632<br>
</p>

# Introduction

TypeScript is a robust and full-featured computer programming language that is derived from JavaScript (also known as ECMAScript). Like most computer languages, it does not come with any official formatting guidelines to enforce consistency, and, due to its legacy in JavaScript, contains some language features that are best just avoided.

This document will endeavor to present a consistent formatting style for use by Horizon Worlds TypeScript developers, while listing best practices that TypeScript developers ought to follow in order to avoid falling into some of the pitfalls of the language that either are just ‘bad’ or do not translate well to the Horizon Worlds environment.

## Prerequisites and Expectations

This is not a document about ‘learning typescript’ or even about ‘learning the Horizon Worlds typescript api’. It is expected that you are coming to this document with some experience with programming languages, and some experience in writing scripts for Horizon Worlds.

Following conventions and best practices are not _required_ for writing code in Horizon Worlds. The purpose of conventions and best practices is to make your code easier for others to understand (and for you to understand other people’s code more easily), and to avoid common mistakes that are caused by formatting ambiguities or language features that are easy to use incorrectly. Some choices for conventions can seem a bit arbitrary, but the _most important_ thing about conventions is that some decisions are made and that people try to follow them whenever possible.

## Document Organization

This document has a shorter Minimal Recommendations section that, if you adopt nothing else, you should at least do, followed by an Extended Recommendations section that has a more robust set of rules.

Some of the recommendations are stronger than others and should almost always be followed, while others are perhaps a bit more difficult to apply consistently or are considered ‘controversial’.

Finally, if you are using an IDE like VSCode or Webstorm or similar to write your typescript code (rather than, say Notepad or something), there are freely available plugins that you can install that will handle many of these recommendations for you automatically (and probably even more\!). If you’re impatient, skip to the [TL;DR Plugins](#tldr-plugins) section, install those tools, and be on your way.

# 👉🏻 Minimal Recommendations TL;DR

If you adopt nothing else, you should at least do (or not do) the following:

| [Whitespace](#whitespace) |
| ---- |
| [✅ Use Spaces, not Tab](#use-spaces-not-tabs) |
| [✅ Use consistent indentation amounts](#use-consistent-indentation-amounts) |
| [✅ Always use curly braces on control flow blocks](#always-use-curly-braces-on-control-flow-blocks) |
| [✅ Separate adjacent methods in a class with a blank line](#separate-adjacent-methods-in-a-class-with-a-blank-line) |
| [🚫 Don’t use string continuations, instead append strings](#dont-use-string-continuations-instead-append-strings) |

| [Language Features](#language-features)
| ---- |
| [✅ Always include a default in switch statements](#always-include-a-default-in-switch-statements)
| [✅ Use ?? rather than \|\| for defaults on undefined values](#use--rather-than--for-defaults-on-undefined-values)
| [⚠️ Avoid using as](#avoid-using-as)
| [⚠️ Avoid using ! on null or undefined values](#avoid-using--on-null-or-undefined-values)
| [⚠️ Avoid using Number, Boolean, String, Object as types](#avoid-using-number-boolean-string-object-as-types)
| [⚠️ Avoid using for…in](#avoid-using-forin)
| [⚠️ Avoid using new Array()](#avoid-using-new-array)
| [🚫 Do not compare booleans to true or false](#do-not-compare-booleans-to-true-or-false)
| [🚫 Do not write non-trivial fallthrough case statements](#do-not-write-non-trivial-fallthrough-case-statements)
| [🚫 Do not use the {} type as an opaque type](#do-not-use-the--type-as-an-opaque-type)
| [❌ Never use any](#never-use-any)
| [❌ Never use == or != for equality checks, Use === and !== instead](#never-use--or--for-equality-checks-use--and--instead)
| [❌ Never use var](#never-use-var)
| [❌ Never do assignment in a conditional statement](#never-do-assignment-in-a-conditional-statement)

| [Naming](#naming) |
| ---- |
| [✅ Only use 7-bit alphanumeric characters and _ for identifiers](#only-use-7-bit-alphanumeric-characters-and-_-for-identifiers) |

| [Horizon Worlds Features](#horizon-worlds-features) |
| ---- |
✅ Define Events once and export to all users
✅ Prefer NetworkEvents and LocalEvents over CodeBlockEvents
✅ Always quote asset ids as strings
🚫 Do not use bind() when registering event handlers, use arrow functions
🚫 Don’t connect to events in start(), use preStart()
❌ Never send events in preStart(), use start() instead.
❌ Never subclass a Horizon Worlds API class other than Component or UIComponent



# 👉🏻 Extended Recommendations TL;DR

A more robust set of recommendations

| [Whitespace](#whitespace-1) |
| ---- |
| [✅ Use whitespace liberally (there is no fee for use!)] (#use-whitespace-liberally-there-is-no-fee-for-use)
| [✅ Put control flow blocks on their own line](#put-control-flow-blocks-on-their-own-line)
| [✅ Use semicolons to end statements](#use-semicolons-to-end-statements)

| [Language Features](#language-features) |
| ---- |
| ✅ [Use const rather than let on local/global variables whenever possible](#use-const-rather-than-let-on-localglobal-variables-whenever-possible) |
| ✅ [Use readonly on class variables whenever possible](#use-readonly-on-class-variables-whenever-possible) |
| ✅ [Mark class variables and methods private (or protected) whenever possible](<#mark-class-variables-and-methods-private-or-protected-whenever-possible>) |
| ✅ [Use parameter properties on constructor arguments](#use-parameter-properties-on-constructor-arguments) |
| ✅ [Use override on all class methods that are being overridden, especially start() and preStart()](#use-override-on-all-class-methods-that-are-being-overridden-especially-start-and-prestart) |
| ✅ [Use undefined rather than null](#use-undefined-rather-than-null) |
| ✅ [For simple arrays of type T, use T[] and readonly T[] rather than Array<T> or ReadonlyArray<T>](#for-simple-arrays-of-type-t-use-t-and-readonly-t-rather-than-arrayt-or-readonlyarrayt)   |
| ✅ [Use interpolated strings only when there is interpolation](#use-interpolated-strings-only-when-there-is-interpolation) |
| ✅ [Use tuples rather than returning pair objects](#use-tuples-rather-than-returning-pair-objects) |
| ✅ [Minimize escape characters in strings](#minimize-escape-characters-in-strings) |
| ✅ [Use forEach(), map(), reduce(), and filter() instead of writing for() loops](<#use-foreach-map-reduce-and-filter-instead-of-writing-for-loops>) |
| ✅ [Prefer the Map<K, V> type rather than using object or Record<K, V> types for key/value mappings](#prefer-the-mapk-v-type-rather-than-using-object-or-recordk-v-types-for-keyvalue-mappings) |
| ✅ [Use the spread operator … to concatenate arrays and objects](#use-the-spread-operator--to-concatenate-arrays-and-objects) |
| [✅ Export only what’s needed](#export-only-whats-needed)|
| [🤔 Consider destructured imports](#consider-destructured-imports) |
| [⚠️ Avoid using methods on the Object class](#avoid-using-methods-on-the-object-class) |
| [🚫 Do not assign arrow functions to class member variables](#do-not-assign-arrow-functions-to-class-member-variables) |
| [🚫 Omit obvious types when initializing variables at declaration](#omit-obvious-types-when-initializing-variables-at-declaration) |
| [🚫 Do not assign function declarations to variables or pass them as arguments](#do-not-assign-function-declarations-to-variables-or-pass-them-as-arguments) |

| [Naming](#naming-1)
| ---- |
| [✅ PascalCase for types, camelCase for variables/functions, CAPITALIZED_SNAKE_CASE for global constants](#pascalcase-for-types-camelcase-for-variablesfunctions-capitalized_snake_case-for-global-constants)
| [✅ Use descriptive names](#use-descriptive-names)
| [🚫 Don’t use _ (underline) prefix for private member variables](#dont-use-_-underline-prefix-for-private-member-variables)

| [Layout](#layout)
| ---- |
| [✅ All imports at top of file](#all-imports-at-top-of-file)
| [✅ Organize files with type definitions first, then globals, then classes](#organize-files-with-type-definitions-first-then-globals-then-classes)
| [✅ Organize classes with statics, then variables, then methods](#organize-classes-with-statics-then-variables-then-methods)

| [General](#general)
| ---- |
| [✅ Comment the important things](#comment-the-important-things)
| [✅ Write TSDoc comments on functions and on important variables/classes](#write-tsdoc-comments-on-functions-and-on-important-variablesclasses)
| [✅ Separate unrelated Components into separate files](#separate-unrelated-components-into-separate-files)
| [✅ Use line comments for internal implementation details](#use-line-comments-for-internal-implementation-details)
| [✅ Avoid clever code](#avoid-clever-code)

# Minimal Recommendations

## Whitespace

### Use spaces, not tabs

Never use tabs for indenting your code. Different people may have different tab stop settings and when they invariably get mixed in with people who indent using spacing, the formatting can become a mess.

### Use consistent indentation amounts

Use the same indentation level amounts in your code. Do not indent some levels by three spaces and others by seven spaces and others by zero spaces. The typical indentation amount for typescript code is 2 spaces per level.

**✅ Do this:**

```typescript
function myFunction() {
  if (someCondition) {
    // do some things
    // do some other things
  } else {
    for (let i = 0; i < 10; i++) {
      // do something 10 times
    }
  }
}
```

**🚫 Not this:**

```typescript
function myFunction() {
 if (someCondition) {
    // do some things
      // do some other things
   } else {
for (let i = 0; i < 10; i++) {
  // do something 10 times
}
 }
}
```

### Always use curly braces on control flow blocks

When you have a sub-block of code, such as with an `if`, `else`, `for`, or `while` block, always use curly braces to enclose it. Critical errors can be prevented by always enclosing blocks in curly braces rather than leaving them hanging naked where someone might erroneously add a line that executes when unexpected.

✅ Do this:
```typescript
if (someBoolean) {
 return;
} 

while (keepLooping) {
 inLoop();
} 

for (let i = 0; i < 10; i++) {
 doLoop();
}
```

🚫 Not this:

```typescript
if (someBoolean) 
 return;

while (keepLooping) 
 inLoop();

for (let i = 0; i < 10; i++) 
 doLoop();
```

### Separate adjacent methods in a class with a blank line

It is difficult to see the end of one method and the start of another if they run together without an empty line break in between them.

✅ Do this:

```typescript
class MyClass {

  method1() {
    // do stuff
  }

  method2() {
    // do other stuff
  }
}
```

🚫 Not this:

```typescript
class MyClass {
  method1() {
    // do stuff
  }
  method2() {
    // do other stuff
  }
}
```

### Don’t use string continuations, instead append strings

✅ Do this:

```typescript
const string = "A very long string" +
    "crossing multiple lines."
```

🚫 Not this:

```typescript
const string = "A very long string\
    crossing multiple lines."
```

## Language features

### Never use `any`

If you don’t know the type of something, use `unknown`. Use of the `any` keyword turns off typescript’s type checking, which defeats a large amount of the benefit of using typescript over javascript.

✅ Do this:

```typescript
const somethingUnknown: unknown
```

🚫 Not this:

```typescript
const somethingUnknown: any
```

### Never use `var`

Use `let` or `const` for all variable declarations. The use of `var` has unexpected scoping consequences that can cause difficult to track down bugs.

✅ Do this:

```typescript
let value: number = 0
if (somethingTrue) {
  value = 2
}
console.log(value)
```

🚫 Not this::

```typescript
if (somethingTrue)
  var value: number = 2
}
console.log(value)
```

### Avoid using `as`

Likewise, the `as` keyword is you telling typescript that the type is different than it thinks, and partially defeats the typing system. Instead, use an `if` statement to test that the object is an `instanceof` the class you expect.

Assuming these definitions:

```typescript
class SomeType {
}

class SubType extends SomeType {
  doThing() {
    // subtype thing
  }
} 
```

✅ Do this:

```typescript
function doIfSubType(thing: SomeType) {
  if (foo instanceof SubType) {
    foo.doThing();
  }
}
```

🚫 Not this:

```typescript
function doIfSubType(thing: SomeType) {
  (thing as SubType).doThing();
}
```

There are a few rare cases where using `as` is important, such as when you mark an explicit structure `as const` to indicate the values cannot be changed.

```typescript
const Events = {
   myEvent1: new LocalEvent('event1'),
   myEvent2: new LocalEvent('event2'),
} as const;
```

**Note:** This does not include a prohibition on the `Entity.as()` method, of which use is necessary to convert Horizon Worlds Entity types to their corresponding Gizmos.

### Avoid using `!` on `null` or `undefined` values

Similar to using `any`, the use of `!` tells typescript to ignore its typing checks because you know better that the variable is actually defined. Typescript is very good at tracking the types of variables, so if you find yourself forcing typescript to treat something as defined that it thinks may not be, ask yourself if you _really_ understand what’s going on.

Preferably, rewrite your code using an if statement to check for undefined or `null` (or nullish values) so that the type guard will remove the necessity of using `!`. Also, use `?`, when possible, to short circuit statements that might be undefined.

✅ Do this:

```typescript
if (thing !== undefined && thing !== null) { // explicit check
  thing.callFunction();
}

if (thing) {  // check for nullish / falsy value
  thing.callFunction();
}

thing?.callFunction(); // optional chaining
```

🚫 Not this:

```typescript
thing!.callFunction();
```

Unfortunately, the `props` on Components may be undefined if nothing was wired up to them. You really ought to check they are not `undefined` before you use them. At the very least, check in `start()` or `preStart()` that all the `props` are defined and if not, emit a very large `console.error()` and throw an exception before you go adding `this.props.myProp!` In other methods in the class.

Example:

```typescript
class MyComponent extends Component<typeof MyComponent> {
  static propsDefinition = {
    prop1: { type: PropTypes.Entity },
    prop2: { type: PropTypes.Entity },
  }

  override preStart() {
    if (!this.props.prop1 || !this.props.prop2) {
      console.error("prop1 or prop2 are not set!");
      throw new Error("fatal config error"); // kills the script at world start
    }
    // no need for ! here because the if test above protects this statement
    this.connectLocalEvent(this.props.prop1, SomeEvent, () => { /* some action */ });
  }

  override start() {
    // safe-ish to use ! here because start() will never be called if preStart() throws an Error killing the script
    this.sendLocalEvent(this.props.prop2!, SomeEvent, {});
  }
}
```

### Avoid using `Number`, `Boolean`, `String`, `Object` as types

These capitalized versions of `number`, `boolean`, `string`, and `object` are wrappers for the primitive types, and only need to be used as types for special purposes. You almost always want to avoid the wrappers and use the primitive types instead.

✅ Do this:

```typescript
const someNum: number = 3
function doThing(someString: string): boolean
```

🚫 Not this::

```typescript
const someNum: Number = 3
function doThing(someString: String): Boolean
```

These classes _do_ have a lot of useful functions for manipulating `number`s, `strings`s, etc. It is ok to use those functions on the classes.

```typescript
// ok
if (Number.isInteger(someNumber)) {
  // do integer things with someNumber
}

// ok
const oneHalf = String.fromCharCode(189)
```

### Never use `==` or `!=` for equality checks (Use `===` and `!==` instead) 

Never use the `==` and `!=` operators to compare values. They will sometimes do some unexpected type conversions and will return true or false when you would think they would do the opposite.

✅ Do this:

```typescript
if (someNumber === 3 && someString !== "foo") {
  // do stuff
}
```

🚫 Not this:
```typescript
if (someNumber == 3 && someString != "foo") {
  // do stuff
}
```

### Never do assignment in a conditional statement

Never assign a variable value using `=` in a conditional statement. It leaves people wondering whether you really meant to use an equality check rather than assignment. Also, a side effect of assigning a value within a conditional statement is unexpected and makes your code difficult to understand.

✅ Do this:
```typescript
let storedValue: boolean;
function setAndCheckValue(value: boolean) {
  storedValue = value;
  if (storedValue) {
    // do thing
  }
}

```

🚫 Not this::
```typescript
let storedValue: boolean;
function setAndCheckValue(value: boolean) {
  if (storedValue = value) {
    // do thing
  }
}
```

### Use `??` rather than `||` for defaults on undefined values

This is similar to using `===` and `!==`, as the automatic type conversion of `||` will sometimes convert things into a binary false value that you don’t expect. Using `??` makes sure that only undefined and null values are treated as false.

✅ Do this:

```typescript
function defaultIfUnset(value?: number): number {
  return value ?? 5;
}
```

🚫 Not this:

```typescript
function defaultIfUnset(value?: number): number {
  return value || 5;
}
```

### Avoid using `for…in` 

The `for…in` construct loops over the keys of an array, which is rarely what you want. Instead, use `for…of`, or `forEach()`

✅ Do this:
```typescript
function printNumberMembers(values: number[]) {
  for (const value of values) {
    console.log(value);
  }
}

function printStringMembers(values: string[]) {
  values.forEach(value => {
    console.log(value);
  })
} 
```

🚫 Not this:

```typescript
function printBooleanMembers(values: boolean[]) {
  for (const index in values) {
    console.log(values[index]);
  } 
}
```

### Do not compare booleans to `true` or `false`

Boolean values are already `true` or `false`, so it makes no sense to compare them to boolean literals.

✅ Do this:

```typescript
if (myBoolean1 && !myBoolean2) {
  // do stuff
}
```

🚫 Not this:

```typescript
if (myBoolean1 === true && myBoolean2 === false) {
}
```

### Do not write non-trivial fallthrough `case` statements 

If you have a `switch`/`case` statement, it is a common error to forget to write `break` after each `case`. The only instance where it is acceptable to not have a `break` for each `case` is if that case has zero statements, and you are just trying to group a bunch of common cases together into exactly the same action. Otherwise, always put in a `break` at the end of each `case` block (including `default`).

✅ Do this:

```typescript
switch (someValue) {
  case 1:
    doThing1();
    doThing2(); // explicitly do thing2 here that also applies to 1
    break;
  case 2:
    doThing2();
    break;
  case 3: // ok to fall through because empty case
  case 4:
    doThing3And4();
    break;
  default:
    doDefault();
    break;
}
```

🚫 Not this:

```typescript
switch (someValue) {
  case 1:
    doThing1();
    // yucky fall through to case 2
  case 2:
    doThing2();
    break;
  case 3:
    doThing3And4(); // possibly unnecessary duplication
    break;
  case 4:
    doThing3And4();
    break;
  default:
    doDefault();
    // missing break on default
}
```

### Always include a default in switch statements

The last case in a switch statement should always be `default`, even if empty. If it is invalid for it to be reached because all other combinations should have been handled, it must at least log a warning or error to the console, if not throw an exception.

✅ Do this:

```typescript
switch (someValue) {
  case 1:
    doThing1();
    break;
  case 2:
    doThing2();
    break;
  default:
    console.warn("unhandled case", someValue)
    break;
}
```

🚫 Not this:

```typescript
switch (someValue) {
  case 1:
    doThing1();
    break;
  case 2:
    doThing2();
    break;
} // if you add a new possible value later, you may miss handling the case!
```

### Do not use the `{}` type as an opaque type

The `{}` type is a bit like `any`, but for `object`s. When you don’t know the type, use `unknown`. If you mean a dictionary, use `Record<string, unknown>`. If you mean an object, use `object`.

✅ Do this:

```typescript
let someUnknownThing: unknown;
let someRecordThing: Record<string, Type>;
let someObjectThing: object;
```

🚫 Not this:

```typescript
let someThing: {}
```

### Avoid using `new Array()`

The constructor arguments for the `Array` class are not terribly consistent and are confusing to use correctly.

✅ Do this:

```typescript
const myPrefilledArray = Array.from<number>({ length: 5 }).fill(3)
const myArray = [5, 6, 7]
```

🚫 Not this:

```typescript
const myArray = new Array(true) // 1 element boolean[] array containing [ "true" ]
const myArray = new Array(5) // 5 element empty array of any[] type
const myArray = new Array(5, 6, 7) // 3 element number[] array containing [ 5, 6, 7]
```

## Naming

### Only use 7-bit alphanumeric characters and \_ for identifiers

Do not use unicode characters in identifiers, or other special characters (such as $). Some unicode characters are very difficult to distinguish from 7-bit ascii.

## Horizon Worlds Features

### Do not use `bind()` when registering event handlers, use arrow functions

Due to a design flaw in the `LocalEvent` and `NetworkEvent` types, the typescript compiler cannot always correctly type check the parameters for functions bound to event handlers if you use `bind()`. Instead, use an arrow function for registering the event. You can either explicitly pass the data object payload to a handler function, or destructure the data object so that the handler function signature is more convenient.

Given this definition:
```typescript
const myEvent1 = new LocalEvent<{thing: Entity, name: string}>('myEvent1');
const myEvent2 = new NetworkEvent<{ player: Player }>('myEvent2');
```

✅ Do this:

```typescript
override preStart() {
  this.connectLocalEvent(this.entity, myEvent1, data => this.onEvent1(data));
  this.connectNetworkEvent(this.entity, myEvent2, ({player}) => this.onEvent2(player));
}

onEvent1(data: {thing: Entity, name: string}) {
  // argument types will be checked in connect() call
  console.log(data.thing, data.name);
}

onEvent2(player: Player) {
  // we destructured the payload when connecting the event
  console.log(player.name.get());
}
```

🚫 Not this:

```typescript
override preStart() {
  this.connectLocalEvent(this.entity, myEvent1, this.onEvent1.bind(this));
  this.connectLocalEvent(this.entity, myEvent2, this.onEvent2.bind(this));
}

onEvent1(data: {stuff: string, value: number}) {
  // this will compile but the values will be undefined
  console.log(data.stuff, data.value);
}

onEvent2(player: Player) {
  // this will compile, but player will not be a Player.
  console.log(player.name.get());
}
```

Note: This problem does not affect `CodeBlockEvents`, but for consistency, you should probably register all your event handlers the same way to avoid mistakes.

### Don’t connect to events in `start()`, use `preStart()`

To avoid race conditions, make sure you run your `connect*Event()` code in `preStart()` rather than `start()`. As, at world start, the system runs all of the `preStart()` calls in all Components before `start()` is called in any Component, you will be sure that all event listeners are registered before anyone tries to send an event to them.

✅ Do this:

```typescript
override preStart() {
  this.connectLocalEvent(this.entity, someEvent, () => console.log('event received'));
}

override start() {
}
```

🚫 Not this:
```typescript
override preStart() {
}

override start() {
  this.connectLocalEvent(this.entity, someEvent, () => console.log('event received'));
}
```

### Never send events in `preStart()`, use `start()` instead

Similar to the above, never call `send*Event()` in `preStart()`, as some Components may not have set up event listeners yet and will miss the event if you send it too early.

✅ Do this:

```typescript
override preStart() {
}

override start() {
  this.sendLocalEvent(this.props.target, someEvent, {});
}
```

🚫 Not this:

```typescript
override preStart() {
  this.sendLocalEvent(this.props.target, someEvent, {});
}

override start() {
}

```

### Define Events once and export to all users

Do not re-declare the same `CodeBlockEvents`, `LocalEvents`, or `NetworkEvents` in different places in the code. Have one ‘home’ for each event declaration, export it from there to other users, who should import that definition. This way, you can be _sure_ that everyone agrees on the string name of the event, the type of the event (CodeBlock, Network, or Local), and, most importantly, the parameters of the event. This is especially important if you are changing the event definitions during the development process.

One common pattern is to have a single Events.ts module and dump _all_ the events for the entire world in there as exported objects.

Events.ts
```typescript
import { LocalEvent, NetworkEvent, CodeBlockEvent } from "horizon/core";

export const MyEvents = {
 event1: new LocalEvent("event1"),
 event2: new NetworkEvent("event2"),
 event3: new CodeBlockEvent("event3", []),
};
```

MyComponent.ts
```typescript
import { Component } from "horizon/core";
import { MyEvents } from "Events";

class MyComponent extends Component<typeof MyComponent> {

   preStart() {
       this.connectCodeBlockEvent(this.entity, MyEvents.event3, () => { });
   }

   start() {
   }
}
```

Another approach is to have each event in the module of the primary ‘listener’ and have it export the event so that all senders can import the definition.

A note for people using the Horizon Hub ‘waffle-converter’: due to the fact that it doesn’t have ‘multi-file’ knowledge of your system, it places all `CodeBlockEvent` definitions locally in each module where they are sent or received. You will need to refactor this code to ensure there is only one definition of each event in your world by moving the definitions to a common location.

### Prefer NetworkEvents and LocalEvents over CodeBlockEvents 

While CodeBlockEvents continue to work in TypeScript, they are less efficient to send and receive, and have much more limited payload types than either NetworkEvents or LocalEvents.

NetworkEvents can send structured data that cannot be sent in CodeBlockEvents, and, like CodeBlockEvents, can be sent across the network between different script owners.

LocalEvents can only be sent to the same script owner, but, unlike NetworkEvents, can send practically _anything_ as a payload.

Note that NetworkEvents arrive, at earliest, in the next frame, while LocalEvents are sent immediately and are more like function calls.

### Always quote asset ids as strings

When using asset ids to construct Asset objects in code, always treat them as strings, never as numbers. The id space of assets is 2^64, but the maximum integer for a number is 2^56, so there are some asset ids that can’t be represented as numbers.

✅ Do this:
```typescript
const myAsset = new Asset(BigInt("123456678901234"))
```

🚫 Not this:
```typescript
const myAsset = new Asset(Bigint(12345678901234))
```

### Never subclass a Horizon Worlds API class other than `Component` or `UIComponent`

As a general rule, don’t subclass classes that are not marked `abstract`, as they may not be designed to work properly as subclasses. An abstract class _must_ be subclassed to be instantiated, so generally it is safe to do so to implement the abstracted parts of the class definition. Both `Component` and `UIComponent` are abstract classes (Component has an `abstract start()` method, and UIComponent has an `abstract initializeUI()` method).

So, do not subclass `Vec3`, `Quaternion`, `Color`, `Asset`, `Entity`, etc. as the API is probably not set up to handle your subclassed versions of these classes correctly in all circumstances or for all future releases.

# Extended Recommendations

## Whitespace

### Use whitespace liberally (there is no fee for use!) 

Insert a space after all keywords (`if`, `while`, `for`). Insert a space after commas. Insert spaces around binary operator (`+`, `-`, `*`, `/`). Use newlines to separate logical blocks of code.

✅ Do this:

```typescript
for (let i = 0; i < 10; i++) {
   callFunction(arg1, i / 10 + 20);
}

while (notDone()) {
  const check: boolean = doCheck();
  if (check && !globalError) {
    console.log("status is:",status)  
}
```

🚫 Not this:

```typescript
for(let i=0;i<10;++){
  callFunction(arg1,i/10+20)
}
while(notDone()){
  const check:boolean=doCheck();
  if(check&&!globalError){
    console.log("status is:",status)
  }
}
```

### Put control flow blocks on their own line

Always put sub-blocks (such as with `if`, `else`, `for`, etc) on the next line. Do not write single line `if` statements.

✅ Do this:

```typescript
if (condition) {
  doAction();
}
```

🚫 Not this::

```typescript
if (condition) doAction();
```

### Use semicolons to end statements

Semicolons at the end of statements are semi-optional in typescript. Automatic Semicolon Insertion (ASI) by the compiler _usually_ avoids the need to add them explicitly. However, sometimes they are needed to either make the code compile or avoid a subtle bug. Thus, it’s generally best to get in the habit of always including them to avoid problems.

## Language Features

### Use `const` rather than let on local/global variables whenever possible 

When declaring variables use `const` unless you later determine that you need to edit the value. Using `const` allows other readers of your code to know that the value can never change, so they don’t need to go hunt for places where it might change its value after its initial declaration.

### Use `readonly` on class variables whenever possible

Similar to `const` for local/global variables, this information makes it clear that the value can never change, making your code more understandable.

### Mark class variables and methods `private` (or `protected`) whenever possible

When you mark variables `private` (or `protected`), it is an indication that nothing outside of this class (or its subclasses) can alter these values. This makes it easier to understand your code, and prevents certain kinds of bugs due to ‘misuse’ of the internal state of your class by other code.

### Use parameter properties on constructor arguments

Rather than writing boilerplate code to plumb through an assignment from a constructor argument to a `readonly`/`private`/`protected` member variable, use parameter properties on the constructor.

✅ Do this:

```typescript
class Foo {
  constructor(private bar: string, readonly protected foo: number, public naf: boolean)
}
```

🚫 Not this:

```typescript
class Foo {
  private bar: string;
  readonly protected foo: number;
  naf: boolean;

  constructor(bar: string, foo: number, naf: boolean) {
    this.bar = bar;
    this.foo = foo;
    this.naf = naf;
  }
}
```

### Use `override` on all class methods that are being overridden, especially `start()` and `preStart()` 

If you explicitly mark a method with the `override` keyword, the compiler will guarantee that you are actually overriding a function from the base class. This can catch common spelling errors such as typing `prestart()` rather than `preStart()`.

### Use `undefined` rather than `null`

TypeScript, unfortunately, has two values that are ‘nullish’. They both are ‘falsy’, but they are not equal to one another. Try to use `undefined`, whenever possible, as the value for things that have no value set on them. The `undefined` value is what the TypeScript api returns for things like accessing an unset index on an array, or fetching an un-stored key from a Map, or for an optional argument to a method that has not been supplied.

The only time to use `null` is when you _really_ need to distinguish between ‘this value has not been set’ (`undefined`) and ‘this value has been explicitly set to no value’ (`null`).

Meta has chosen to use `null` in a bunch of Horizon Worlds apis where they probably should have used `undefined`. So, you will need to adapt to that.

### Minimize escape characters in strings

When writing non-interpolated string values, use the appropriate quotation marks to avoid unnecessary escape characters. I.e. if your string has apostrophes, use double quotes for the string. If your string has embedded double quotes, use an apostrophe for the string.

✅ Do this:

```typescript
const str1 = 'This string "has quotes" and stuff'
const str2 = "This string 'has apostrophes' and stuff"
```

🚫 Not this:

```typescript
const str1 = "This string \"has quotes\" and stuff"
const str2 = 'This string \'has apostrophes\' and stuff'
```

### Use interpolated strings only when there is interpolation

Don’t use backticks for quoting strings unless you are actually interpolating variable values into the string.

✅ Do this:

```typescript
const num = 3
const str1 = `This string interpolates ${num} a number`
const str2 = 'This string does not'
```

🚫 Not this:

```typescript
const str3 = `This string has no interpolation`
```

### Use tuples rather than returning pair objects

If you need to return two values from a function, return a tuple `[a, b]` rather than creating a pair object `{first: a, second: b}`, and then use destructuring to extract the parts of the tuple at the call site.

✅ Do this:

```typescript
function splitInHalf(input: string): [string, string] {
  ... code to split string into x and y
  return [x, y]
}

const [left, right] = splitInHalf('my string');
```

🚫 Not this:

```typescript
type Pair {
  first: string;
  second: string;
}

function splitInHalf(input: string): Pair {
  .. code to split string into x and y
  return {first: x, second: y};
}

const value: Pair = splitInHalf('my string');
const left = value.first;
const right = value.second;
```

### Do not assign function declarations to variables or pass them as arguments 

Just use arrow functions.

✅ Do this:

```typescript
const myFunction = (arg1: bool) => { ... stuff ... }
```

🚫 Not this:

```typescript
const myFunction = function(arg1: bool) { ... stuff ...}
```

### Do not assign arrow functions to class member variables

Instead, just write a method on the class.

✅ Do this:

```typescript
class MyClass {
  method(arg1: boolean) {
    ... body ...
  }
}
```

🚫 Not this:

```typescript
class MyClass {
  method = (arg1: boolean) => {
    ... body ...
  }
}
```

### Omit obvious types when initializing variables at declaration

If you are initializing a variable to a number of boolean or specific class or whatever, you do not need to also put a type on the variable. Also, return types for functions that have obvious outputs can be omitted. Only do this when it is 100% unambiguous, tho. If in doubt, put the type.

✅ Do this:

```typescript
const foo = 3
function foo() {
  return true;
}
```

🚫 Not this:

```typescript
const foo: number = 3
function foo(): boolean {
  return true;
}
```

### For simple arrays of type `T`, use `T[]` and `readonly T[]` rather than `Array<T>` or `ReadonlyArray<T>` 

It is easier to read the `T[]` form, so prefer that, even for non readonly multidimensional arrays (e.g. `T[][][]`). Only revert to the `Array<>` form if the type of the array is a compound type itself.

✅ Do this:

```typescript
let myStringArray: string[];
let myMatrix: number[][];
let myReadonlyMatrix: ReadonlyArray<number[]>;
let myArrayOfStringOrNumber: Array<string | number>;
```

🚫 Not this:

```typescript
let myStringArray: Array<string>;
let myMatrix: Array<Array<number>>;
let myReadonlyMatrix: readonly number[][];
let myArrayOfStringOrNumber: (string | number)[];
```

### Use `forEach()`, `map()`, `reduce()`, and `filter()` instead of writing `for()` loops

These functional programming constructs are easier to understand and less prone to error than `for` loops. However, they are somewhat slower, so don’t use them in critical performance areas. However, such critical performance areas are unlikely to exist in most Horizon Worlds creations.

✅ Do this:

```typescript
myArray.forEach(entry => {
  doSomething(entry)
}

const newArray = myArray.map(entry => alterEntry(entry))

const filteredArray = myArray.filter(entry => isWantedEntry(entry))

const sum = myArray.reduce((acc, value) => acc + value, 0)
```

🚫 Not this:

```typescript
for (let i = 0; i < myArray.length; i++) {
  doSomething(myArray[i])
}

const newArray = []
for (let i = 0; i < myArray.length; i++) {
  newArray.push(alterEntry(myArray[i]));
}

const filteredArray = []
for (let i = 0; i < myArray.length; i++) {
  if (isWantedEntry(myArray[i]) {
    filteredArray.push(myArray[i]);
  }
}

let sum = 0
for (let i = 0; i < myArray.length; i++) {
  sum = sum + myArray[i]
}
```

### Avoid using methods on the Object class

If possible, do not use reflection methods like `Object.prototype.hasOwnProperty()`, `Object.keys()`, `Object.values()`, `Object.entries()`, etc. These are not strongly typed and can cause runtime errors if you are not absolutely sure what you’re doing.

### Prefer the `Map<K, V>` type rather than using `object` or `Record<K, V>` types for key/value mappings

The `Map<K, V>` type gives you additional functionality over `object` types, including the use of any type as a key, the `has()` method, the `size` property, and the ability to iterate over entries in insertion order using `for..of` loops.

A `Record<K, V>` is a more strongly typed `object`, which can be useful if you _have_ to work with `object` types rather than `Map`s for some reason.

### Use the spread operator `…` to concatenate arrays and objects

When combining a number of arrays together into a new array, use the `...` operator to spread the arrays or objects into a new array/object literal rather than using `Array.concat()` or `Object.assign()` to combine them together.

✅ Do this:

```typescript
View({
  style: {
    ...defaultViewStyle,
    margin: 10,
    padding: 20,
  }
})
```

🚫 Not this:

```typescript
View({
  style: defaultViewStyle.concat({
    margin: 10, 
    padding: 20,
  })
})
```

### Export only what’s needed

Only export type definitions, classes, and variables that actually need to be imported elsewhere. Default to not exporting things until needed. Only use named exports, do not do `default` exports.

### Consider destructured imports

Rather than doing `import * as hz from 'horizon/core'`, import specific types/classes that you need, i.e. `import { Component } from 'horizon/core'`. Only importing what you need makes it clear to other people what the code in your file is doing, and is slightly better for compiler performance and optimization tools. VSCode will help you auto-manage your destructured import list. If you need to rename something to avoid a collision, you can use `as` to rename the imported symbol in your file.

## Naming

### PascalCase for types, camelCase for variables/functions, CAPITALIZED_SNAKE_CASE for global constants

Classes and type declarations should use PascalCase (each word capitalized). Variable and function names should use camelCase (first word lower case, remaining words capitalized). Global constants should use CAPITALIZED_SNAKE_CASE (each word capitalized, separated by an underscore). Do not use snake_case mixed with PascalCase, or PascalCase for variables/functions. It should be immediately identifiable whether something is a type or a variable/function based on the naming.

Examples:
```typescript
const DEFAULT_POINTS = 3;

type UserData = {
  totalPoints: number;
}

class MySpecialClass {
  addPoints(userData: UserData, newPoints?: number) {
    userData.totalPoints += newPoints ?? DEFAULT_POINTS
  }
}
```

### Use descriptive names

Name your variables, functions, classes, etc descriptively. Avoid single letter or very short variable names in all but the most simplistic cases. You want to write ‘really obvious code’ so that someone else or a later version of you will be able to read it and understand what its doing just by the names of things.

### Don’t use `_` (underline) prefix for private member variables

It’s really not necessary, and makes the code harder to read. Most of your class member variables should be private, anyway.

## Layout

### All imports at top of file

Do not intersperse import statements throughout your file. Put them at the top. Also, keep them organized in alphabetical order and remove unnecessary import declarations. The VSCode ‘Organize Imports’ function can do this for you. Run it every so often to clean them up.

### Organize files with type definitions first, then globals, then classes

Having a standardized organization for where different sorts of things are in a file will make orienting people to your code easier when they first encounter it. Put type definitions first after imports. Then declare any global constants or variables used in the file. Then declare your classes. Register each of your Components immediately after their declaration.

### Organize classes with statics, then variables, then methods

Having a standardized organization for where different things are in your class will make orienting people to your code easier when they first encounter it. Put static variables first (e.g. propsDefinition), followed by any static method. Then put instance variables, and finally put instance methods.

```typescript
import { Component, PropTypes } from "horizon/core";

type MyData = {
   info: string,
   price: number,
}

const DEFAULT_PRICE = 10;

class MyComponent extends Component<typeof MyComponent> {
   static propsDefinition = {
       prop1: { type: PropTypes.String, default: "default value" },
   };

   static dataMap: Map<string, MyData> = new Map();

   static addData(key: string, data: MyData) {
       MyComponent.dataMap.set(key, data);
   }

   readonly myKey = "key";
   myData: MyData = { info: "info", price: DEFAULT_PRICE };

   override start() {
       console.log("MyComponent started");
       MyComponent.addData(this.myKey, this.myData);
   }

   myFunction() {
       console.log("MyComponent function called");
   }
}
```

## General

### Avoid clever code

Like using descriptive names, you want to write ‘really obvious code’. Don’t use obscure language features in ‘clever ways’ or try to condense complex code into a small space such that its purpose is inscrutable at first glance. Do not try to ‘show off’ to other people by writing very convoluted code when more straightforward would do. If there are reasons to do something ‘clever’ or use esoteric language features, make sure you add _copious_ comments describing what you are doing and, more importantly, why.

### Comment the important things

A ‘future you’ will thank yourself if you write down what you were thinking when you wrote your code\! However, do not comment pedantically, and make sure you have [used descriptive names](#use-descriptive-names) for your variables and functions, as that can make extra comments unnecessary. Only comment the _important_ things, and comment things that the VSCode hover popups will pick up, such as documentation comments on functions describing its effects, parameters, and return values.

### Write TSDoc comments on functions and on important variables/classes

When you use the TSDoc comment format, the VSCode editor will be able to pick them up and display them as popups when you hover over the identifiers usage elsewhere. You do not need to include types in your comments, as they are already in the code.

Comments on functions and methods should be of the form:

```typescript
/**
 * Description of what myFunction does
 * @param paramName parameter purpose
 * @return information about return value
 */
function myFunction(paramName: type): returnValue {
}
```

On variables or classes, it should just be a block of descriptive text

```typescript
/**
 * Information about myVariable
 */
const myVariable: number = 3

/**
 * Information about MyClass
 */
class MyClass {
}
```

### Separate unrelated Components into separate files

If you are writing code for a bunch of Components that are closely related, sometimes it is useful to put them all in the same file for organizational reasons or so that they can share some types or global variables that don't need to be exported.

However, avoid writing really long files. Also, do not put unrelated Components in the same file, as it makes code organization less clear, encourages accidental and unnecessary coupling between Components, and reduces reusability of your code.

### Use line comments for internal implementation details

A line comment starts with two slashes // and continues to the end of the current line. Use these inline in your code to describe interesting details of the algorithm or other important information. Prefer multiple lines of single line comments using // to multi-line block comments using /\* \*/.

✅ Do this:

```typescript
class MyClass {
    
  someMethod() {
    someCode();
    // someDisabledCode1();
    // someDisabeldCode2();
  }

  // someDisabledMethod() {
  //   thing1();
  //   thing2();
  //   thing3();
  // }

}
```

🚫 Not this:

```typescript
class MyClass {
    
  someMethod() {
    someCode();
    /*
    someDisabledCode1();
    someDisabeldCode2();
    */
  }
/*
  someDisabledMethod() {
    thing1();
    thing2();
    thing3();
  }
*/

}
```

# TL;DR Plugins

## Coding Conventions

Coding conventions discussions can be contentious, with ‘religious wars’ about where spaces go, when to use newlines, how many statements can go on a line, etc. One way to avoid those pitfalls is to just leave it to someone else to argue about what is the ‘best’ way to format code, and just accept whatever they decide. Additionally, it requires the expending of extra mental energy to _apply_ the conventions while you are typing your code, so having something do that automatically frees up brain cycles for something else.

### Prettier

Fortunately for us, there is [Prettier](https://prettier.io), an industry leading coding conventions enforcer plugin that has made the decisions for us, and will apply them automatically. They have a good summary on [why you should use Prettier](https://prettier.io/docs/en/why-prettier). In particular, they have an [opinionated philosophy](https://prettier.io/docs/en/option-philosophy) on code formatting, so there are fairly few options to configure how it works. It’s best to just leave their options on their defaults, and accept that they have thought long and hard about _why_ their way is the best way.

#### Installation

To install prettier in VSCode, simply open VSCode, go to the Extensions tab on the right sidebar (the three cubes with the fourth cube offset), search for “Prettier”, click on “Prettier \- Code formatter”, and click Install.

![](typescript-conventions-best-practices-images/image1.png)

For other editors, check out the [Editor Integrations](https://prettier.io/docs/en/editors) page.

#### Configuration

The most important configuration setting to make is to ensure that Prettier is used as the default formatter for typescript files. If you don’t currently have a formatter configured, and you are in a typescript file, and run Format Document (Shift \+ Alt \+ F), you will get a popup asking you to Configure a default formatter. Make sure you choose “Prettier \- Code Formatter”.

If you don’t get a popup when doing Format Document for the first time, it means you already have a typescript formatter configured. You will want to change that to Prettier by going to File \-\> Preferences \-\> Settings, typing `@id:editor.defaultFormatter @lang:typescript` in the search bar, and switching the Default Formatter to ‘Prettier \-\> Code Formatter’.

![](typescript-conventions-best-practices-images/image2.png)

By default, Prettier won’t format anything until you tell it to via Format Document or Format Selection. However, you can also configure VSCode to Format On Save, On Paste, and On Type. Note that if you have File: Auto Save set to `afterDelay`, then Format On Save will only work on an explicit save.

To find the formatting options in File-\>Preferences-\>Settings, search for `editor:format` and tick on whichever options you prefer (below shows all of On Paste, On Save, and On Type enabled).

![](typescript-conventions-best-practices-images/image3.png)

There are a number of other minor settings you can adjust, listed on the [options](https://prettier.io/docs/en/options) page and via the ‘gear’ icon on the plugin, such as Tab Width (default 2), and Print Width (default 80). Those values are a bit of an anachronism from when people didn’t have very wide monitors. However, if you make customizations, make sure you put a [configuration file](https://prettier.io/docs/en/configuration) like `.prettierrc` or `.editorconfig` in the scripts directory of _each_ of your horizon world projects so that others using your code will pick up the same settings. Thus, it’s best to just not change them at all.

If there are particular files that you need Prettier to ignore, you can add them to the `.prettierignore` file (in the [same format as .gitignore](https://www.w3schools.com/git/git_ignore.asp)).

#### Usage

If you have precious but non-standard formatting somewhere in your file that you want to preserve, you can precede that block of code with a comment of the following form:

```typescript
// prettier-ignore
```

This will prevent Prettier from reformatting until the syntactically next statement is reached (which can be one line or many lines, depending on the type of statement that follows the comment).

##

## Best Practices

There are a variety of language features that are often misused, or just bad to use at all. These are more complex ‘code quality’ issues rather than formatting conventions handled by plugins like Prettier. The class of plugins that check for these code quality issues are typically called ‘linters’, as they remove [‘unwanted bits of fluff from your code’](<https://en.wikipedia.org/wiki/Lint_(software)#History>) (i.e. the ‘lint’). Linters are _very_ powerful tools and often have a bewildering number of rules that can be configured. This is a more advanced helper than coding convention formatters like Prettier, but will identify subtle programming errors in your code and make your code more robust and bug free. Reading the web pages associated with any linter errors found in your code will teach you how to be a better typescript coder.

### typescript-eslint

The ESlint linter has been used for years to check Javascript/ECMAscript code, and now has a variant called [typescript-eslint](https://typescript-eslint.io/) specifically tailored for Typescript that uses typing information provided by the typescript compiler to enhance its ability to detect coding errors. (note: there is an [older TSLint project that has been deprecated](https://typescript-eslint.io/users/what-about-tslint). Use typescript-eslint instead). (Also, note that while ESLint can do coding convention formatting as well, they [recommend leaving that to Prettier](https://typescript-eslint.io/users/what-about-formatting)).

#### Installation

Installation of typescript-eslint is significantly more complicated than installation of Prettier, which is just a VSCode plugin. Installing the ESLint plugin within VSCode is part of the process, but you will need to also have a minimal Node.js installation, and use npm (or yarn or pnpm) to locally install and configure ESLint into _each_ project you want to use it in using command line tools. You will need to know the directory of your projects scripts directory, which you can easily get from both the Desktop Editor and VSCode.

- Desktop Editor \- Open Scripts Folder in Explorer  
  ![](typescript-conventions-best-practices-images/image4.png)  
  Go to the scripts menu, press on the triple dot menu, and select Open Scripts Folder in Explorer (note it actually opens the folder \_above\_ the `scripts` folder, you will need to click on `scripts` once the window opens to go into that folder)

- VSCode \- Reveal in File Explorer  
  ![](typescript-conventions-best-practices-images/image5.png)  
  Right click on your `tsconfig.json` file and select Reveal in File Explorer

In the File Explorer, you can then click past the _end_ of the location bar text (don’t click on any of the text), and copy the path to the `scripts` directory to the clipboard for use with your command line terminal of choice.

![](typescript-conventions-best-practices-images/image6.png) It should be something like `C:\Users\live\AppData\LocalLow\Meta\Horizon Worlds\eslint test_10160832935606146\scripts`

##### VSCode ESLint plugin (one time)

To install ESLint in VSCode, open VSCode, go to the Extensions tab on the right sidebar (the three cubes with the fourth cube offset), search for “ESLint”, and click Install (same procedure as for Prettier).

![](typescript-conventions-best-practices-images/image7.png)

##### Node.js runtime (one time)

Download the latest Node.js LTS package from [https://nodejs.org/en/](https://nodejs.org/en/) (current version is v22.11.0) and install. Use all the default installation options (don’t enable or disable any options).

##### Typescript-eslint command line tools (every world)

Open a Terminal prompt (e.g. run ‘cmd’ from the system search bar), change directory to the `scripts` directory of your world you obtained above, e.g.

```shell
cd C:\\Users\\live\\AppData\\LocalLow\\Meta\\Horizon Worlds\\eslint test_10160832935606146\\scripts
```

and run:

```shell
npm install \--no-save eslint@^8.56.0 @eslint/js typescript@4.7.4 typescript-eslint@^7.18.0 eslint-config-prettier
```

(Note: if you are using the yarn or pnpm package managers, see instructions [here](https://typescript-eslint.io/getting-started/)).

(Note: we need to pin to older versions of eslint and typescript-eslint because horizon worlds is running such an old version of typescript).

(Note: due to current shortcomings of the desktop editor, you must run `npm install` after each time you open the desktop editor on the world, as the desktop editor will clobber the previous installation of eslint).

As above, you **must** install locally to the `scripts` directory for _each_ world you want to use typescript-eslint. [It cannot be installed ‘globally’](https://typescript-eslint.io/troubleshooting/faqs/typescript#should-typescript-be-installed-globally-or-locally).

##### ESLint configuration file (every world)

Create a `eslint.config.mjs` file in your world’s scripts directory. Be sure to exclude the `types/*.d.ts` files, as the code there is not well formatted and will cause _lots_ of error messages, and the `.backups` directory that contains old deleted code.

```typescript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  // @ts-ignore
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      'types/*.d.ts',
      '.backups/**',
    ]
  },
);
```

##### Installation Test (every world… tho can skip once you have the process sorted out)

Create a file in your `scripts` directory (e.g. `ESLintTest.ts`) with valid typescript, but an obviously inadvisable language construct, such as the following variable declaration that uses the any type.

```typescript
export const foo: any = true;
```

Test that you are able to run eslint from the command line from your scripts directory, and that it detects this error

```shell
npx eslint .
```

This command should generate an error message on the above file:

```shell
C:\\Users\\name\\AppData\\LocalLow\\Meta\\Horizon Worlds\\eslint test_10160832935606146\\scripts\\ESLintTest.ts
 1:19 error Unexpected any. Specify a different type @typescript\-eslint/no\-explicit\-any
✖ 1 problem (1 error, 0 warnings)
```

Next, open VSCode on your same project, and click the same test file (e.g. `ESLintTest.ts`) and verify that the “Problems” tab of the IDE shows the same error message for this file.

If you click on the underlined error message in the Problems listing, a web browser will be launched that explains why what you have written is a bad idea (in this case linking to [@typescirpt-eslint/no-explicit-any](https://typescript-eslint.io/rules/no-explicit-any/)).

If you hover over the error in the code and click `Ctrl-.` (for Quick Fix), you will see that the first suggestion in the pop-up is to ‘use `unknown` instead’, which is a much better option than any.

#### Configuration

The installation configuration above installs the [‘recommended’](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations) javascript rules, [‘recommended’](https://typescript-eslint.io/users/configs#recommended) typescript rules, and disables any formatting rules in ESLint that replicate or would [interfere with the Prettier](https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#eslint-config-prettier) plugin. However, there are \_lots\_ of deeper configuration options you might want to consider, and a number of additional [‘shared configs’](https://typescript-eslint.io/users/configs) that you can use, such as:

- [recommendedTypeChecked](https://typescript-eslint.io/users/configs#recommended-type-checked)

  - Uses the power of the typescript typing engine to do even deeper checks on your code usage

  - Requires a minor amount of [extra configuration](#extra-configuration-for-eslint-recommendedtypechecked)

- [strict](https://typescript-eslint.io/users/configs#strict)

  - Includes everything in ‘recommended’, plus somewhat more ‘opinionated’ rules that may not be applicable to all codebases

  - Also comes in a [strictTypeChecked](https://typescript-eslint.io/users/configs#strict-type-checked) variant with extra typing checks

- [stylistic](https://typescript-eslint.io/users/configs#stylistic)

  - Additional opinionated stylistic rules that don’t impact program logic to be used alongside either ‘recommended’ or ‘strict’

  - Also comes in a [stylisticTypeChecked](https://typescript-eslint.io/users/configs#stylistic-type-checked) variant with extra typing checks

The full list of **all** supported rules can be found here:

- [ESLint](https://eslint.org/docs/latest/rules/) rules reference

- t[ypescript-eslint](https://typescript-eslint.io/rules/) rules reference

The ESLint plugin to VSCode also has configuration options as well. By default, the linter runs as you type, which is usually the best option, as you want to know as soon as possible when there is a coding problem. But, you can change that to only run on save, if you so desire.

#### Usage

If you find that some linter error is incorrect or too aggressive for your code, you can insert a comment above the line causing the problem to tell the linter to ignore it. The Quick Fix in VSCode can help you format these comments, but they are generally of the form:

```typescript
/* eslint-disable-disable-next-line <rule-name-here> */
```

Where `<rule-name-here>` is the name of the eslint rule that is reporting an error. You can disable eslint errors or the entire file using the following comment at the top of the file.

```typescript
/* eslint-disable <rule-name-here> */
```

You really should endeavor never to disable the alerts, and instead fix your code so that it compiles with no warnings or errors.

## Spelling

When there are misspelled words in your code, it does not only cause confusion for others reading your code and trying to understand what you were trying to accomplish. Sometimes, there are certain coding errors that can’t be caught by linters that can be caught simply by matching spelling with _well designed_ API definitions (i.e. ones that follow good spelling rules as well).

### Code Spell Checker

This popular plugin checks your code and comments for spelling mistakes. It is easy to add new words to a personal dictionary should you have some particular jargon that doesn’t appear in the standard dictionary.

#### Installation

To install Code Spell Checker in VSCode, simply open VSCode, go to the Extensions tab on the right sidebar (the three cubes with the fourth cube offset), search for “spell check”, click on “Code Spell Check”, and click Install.

![](typescript-conventions-best-practices-images/image8.png)

#### Configuration

There is not a lot of additional configuration need, but there are a few additional options if you check the plugin settings page. It will highlight spelling errors in your code as ‘warnings’ of ‘Unknown words’in the ‘Problems’ view of VSCode. You can use ‘Quick Fix’ (`Ctrl-.`) to get spelling suggestions, and if you want to add a word permanently to the dictionary, you can select ‘Add Word to User Settings’ (note, don’t add to Workspace Settings, as the Horizon Desktop Editor will overwrite that file and delete them). You can also access the Spelling settings by right clicking in the editor window and selecting the ‘Spelling’ sub-menu.

# Appendix

## Extra configuration for ESLint recommendedTypeChecked

The typescript-eslint documentation explains how to [enable type checked linting](https://typescript-eslint.io/getting-started/typed-linting).In particular, you will need to use a TypeChecked version of one of the shared configs, and you need to configure ESLint to use the typescript parser on the current directory.

Additionally, though it will work without changes, to avoid errors in VSCode, we can’t use `import.meta.path`, but must use a legacy Node.js api instead. And we must prevent the typing pass from including the ESLint configuration file, as it is not part of our typescript project.

Change your `eslint.config.mjs` to the following:

```typescript
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
    },
  },
  {
    ignores: [
      'types/*.d.ts',
      '.backups/**',
      'eslint.config.mjs'
    ]
  },
);
```

## Other Typescript Coding Conventions

- Google  
  Very extensive with lots of good examples  
  [https://google.github.io/styleguide/tsguide.html](https://google.github.io/styleguide/tsguide.html)

- TS.dev  
  More or less the same as the google conventions but in an easier to navigate format.  
  [https://ts.dev/style/](https://ts.dev/style/)

- Typescriptlang.org  
  The official website for the typescript language. Limited advice, and mainly for some more advanced features.  
  [https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

- Microsoft  
  For the _contributors_ to the typescript codebase. They take pains to say ‘these are not official’.  
  [https://github.com/microsoft/TypeScript/wiki/Coding-guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)

- Angular  
  An opinionated set of conventions targeting angular developers. Some good ideas, but some parts not applicable to Horizon Worlds  
  [https://angular.dev/style-guide](https://angular.dev/style-guide)

- Mkosir  
  Another thoughtful set of conventions  
  [https://mkosir.github.io/typescript-style-guide/](https://mkosir.github.io/typescript-style-guide/)

- Basarat  
  Yet another take on conventions for typescript  
  [https://basarat.gitbook.io/typescript/styleguide](https://basarat.gitbook.io/typescript/styleguide)

- AWS  
  Amazon’s advice for typescript best practices  
  [https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html](https://docs.aws.amazon.com/prescriptive-guidance/latest/best-practices-cdk-typescript-iac/typescript-best-practices.html)
