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
/*
Conversion of type '{ comments: string[]; }' to type 'BlogPost' may be a mistake
because neither type sufficiently overlaps with the other. If this was
intentional, convert the expression to 'unknown' first.

Property 'title' is missing in type '{ comments: string[]; }' but required in
type 'BlogPost'. ts(2352)
*/

