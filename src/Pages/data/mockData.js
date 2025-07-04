export const users = [
    { serial: 1, name: "Suraj", gender: "Male", age: 25, marital: "Single" },
    { serial: 2, name: "Anna", gender: "Female", age: 23, marital: "Single" },
    { serial: 3, name: "Ravi", gender: "Male", age: 30, marital: "Married" },
  ];
  
  export const messages = {
    1: [2, 3], // Suraj talked to Anna and Ravi
    2: [1],
    3: [1],
  };
  
  export const chats = {
    '1-2': [
      { from: 1, to: 2, text: "Hi Anna!" },
      { from: 2, to: 1, text: "Hey Suraj 😊" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 1, to: 2, text: "what's plan of today!" },
      { from: 2, to: 1, text: "last Night you have fucked brutaly 👌🏻👈🏻💦" },
    ],
    '1-3': [
      { from: 1, to: 3, text: "Hey Ravi!" },
      { from: 3, to: 1, text: "Hi bro" },
      { from : 1, to : 3 , text: "you know today is lakshita birthday" }
    ]
  };
  