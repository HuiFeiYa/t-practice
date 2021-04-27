import chalk  from 'chalk';
interface User {
  name: string
  age: number
  occupation: string
}

interface Admin {
  name: string
  age: number
  role: string
}
type Person = User | Admin
const persons: Person[] /* <- Person[] */ = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
]

// function filterPersons(
//   persons: Person[],
//   personType: "admin",
//   criteria: Partial<Person>,
// ): Admin[]
function filterPersons(
  persons: Person[],
  personType: "user",
  criteria: Partial<Person>,
): User[]
function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Partial<Person>,
) {
  if(personType === 'user') {
    return {
      name: "Jane Doe",
      age: 32,
      // role: "Administrator",
      occupation: "Astronaut",
    }
  }
}

let usersOfAge23: User[] = filterPersons(persons, "user", { age: 23 })
// let adminsOfAge23: Admin[] = filterPersons(persons, "admin", { age: 23 })


function funny(s: string): number;
function funny(n: number): boolean;
function funny(b: boolean): string;

// 实现
function funny(x: string | number | boolean) {
  if (typeof x === 'string') {
    return x.length;
} else if (typeof x === 'number') {
    return x % 2 === 0;
} else {
    return JSON.stringify(x);
}
}
export {}