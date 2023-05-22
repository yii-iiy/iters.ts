export 
class Stream
<T> 
{
    
    generatorFunction: () => Generator<T> ;
    
    constructor(generatorFunction: () => Generator<T>)
    { this.generatorFunction = generatorFunction ; } ;
    
    static iterate
    <T>(initialValue: T, f: (value: T) => T)
    : Stream<T> 
    {
        return new Stream
        ( function* ()
        : Generator<T> 
        {
            let value = initialValue ;
            while (true) 
            {
                yield value ;
                value = f(value) ;
            } ;
        } ) ;
    } ;
    
    static unfold
    <T, R>(initialValue: T, f: (value: T) => { mapper: R; iter: T } | undefined)
    : Stream<R> 
    {
        return new Stream
        ( function* ()
        : Generator<R> 
        {
            let value = initialValue ;
            while (true) 
            {
                const next = f(value) ;
                if (next === undefined) break ;
                yield next.mapper ;
                value = next.iter ;
            } ;
        } ) ;
    } ;
    
    map
    <R>(f: (value: T) => R)
    : Stream<R> 
    {
        return new Stream
        (( function* (this: Stream<T>)
        : Generator<R> 
        {
            const iterator = this.generatorFunction() ;
            while (true) 
            {
                const { value, done } = iterator.next() ;
                if (done) break ;
                yield f(value) ;
            } ;
        } ).bind(this)) ;
    } ;
    
    filter
    (predicate: (value: T) => boolean)
    : Stream<T> 
    {
        return new Stream
        (( function* (this: Stream<T>)
        : Generator<T> 
        {
            const iterator = this.generatorFunction() ;
            while (true) 
            {
                const { value, done } = iterator.next() ;
                if (done) break ;
                if (predicate(value)) yield value ;
            }
        } ).bind(this)) ;
    } ;
    
    takeUntil
    (predicate: (value: T) => boolean)
    : T[] 
    {
        const result: T[] = [] ;
        const iterator = this.generatorFunction() ;
        while (true) 
        {
            const { value, done } = iterator.next() ;
            result.push(value) ;
            if (done || predicate(value)) break ;
        } ;
        return result ;
    }
    
    take
    (n: number)
    : T[] 
    {
        let count = 1 ;
        return this.takeUntil(() => !(count++ < n)) ;
    } ;
} ;
                                                   
