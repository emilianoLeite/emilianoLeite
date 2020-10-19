---
title: Understanding Typescript error `ts(2352)`
---

# {{title}}

This error comes with the following message:
> Conversion of type X to type Y may be a mistake because neither type
> sufficiently overlaps with the other.

## Example
Let's say we have created the following function that counts how many comments a blog post has:
```ts
interface BlogPost {
  title: string;
  comments: readonly string[];
};

function commentCount(blogPost: BlogPost) {
  return blogPost.comments.length
}
```

and now we want to test it. Since our function only cares about a post's comments, we could try to generate a stub blog post using a type cast:
```ts
const blogPost = {
  comments: ['comment1', 'comment2', 'comment3'],
} as BlogPost;

const result = commentCount(blogPost)

// assertion....
```

But this gives us the error:
```ts
const blogPost = {
  comments: ['comment1', 'comment2', 'comment3'],
} as BlogPost;
/* Gives the error:

Conversion of type '{ comments: string[]; }' to type 'BlogPost' may be a mistake
because neither type sufficiently overlaps with the other. If this was
intentional, convert the expression to 'unknown' first.

Property 'title' is missing in type '{ comments: string[]; }' but required in
type 'BlogPost'. ts(2352)
*/
```

This at first may seem a little strange, since
```ts
const blogPost = {
  title: "Blog Title"
} as BlogPost;
```
works just fine. So what's going on?

...Continues

----

this does not crash

```ts
interface BlogPost {
  title: string;
  author: {
    id: string;
    name: string;
  }
  comments: readonly string[];
};

const promise = {
  title: 's',
  author: {
    id: 's',
    name: 's',
    // age: 12
  },
  // comments: ['a', 'b', 'c'],
} as BlogPost;
```
----

this crashes
```ts
interface BlogPost {
  title: string;
  author: {
    id: string;
    name: string;
  }
  comments: readonly string[];
};

const promise = {
  title: 's',
  author: {
    id: 's',
    name: 's',
    age: 12
  },
  // comments: ['a', 'b', 'c'],
} as BlogPost;
```

----

this does not crash
```ts
interface BlogPost {
  title: string;
  author: {
    id: string;
    name: string;
  }
  comments: readonly string[];
};

const promise = {
  title: 's',
  author: {
    id: 's',
    name: 's',
    age: 12
  },
  comments: ['a', 'b', 'c'],
} as BlogPost;
```
