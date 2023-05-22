# streams.ts

~~~
🐚 a lazy structure like the stream/lazylist in elixir or scala 🦑
~~~

## ref by

- [Stream.unfold/2. The Stream module in Elixir is full of… | by Dunya Kirkali | Medium](https://haagwee.medium.com/stream-unfold-2-5c22e5cf1a3d)
- [Scala Unfold | Genuine Blog](https://blog.genuine.com/2020/07/scala-unfold/)

## demos

### simple

~~~ ts
const s = Stream.unfold(0, x => x < 10 ? { mapper: x, iter: x + 1 } : undefined ) ;
console.log(s.take(3)); // [0, 1, 2]
~~~

### fib

~~~ ts
// unfold
const fibs = Stream.unfold
(
    { x: 0, y: 0, z: 1 },
    ({ x, y, z }) => ({ mapper: { x, y }, iter: { x: x + 1, y: z, z: y + z } })
) ;

// or iterate
const fibs = 
Stream
    .iterate({x: 0, y: 0,z: 1}, ({ x, y, z }) => ({ x: x + 1, y: z, z: y + z }))
    .map(({ x, y, z }) => ({ x, y }))
    .filter(({ x, y }) => x % 2 === 1) ;

// use
console.log(fibs.take(3));
console.log(fibs.take(14));
~~~

## used

- [tailcalls.ts](../tailcalls.ts)
