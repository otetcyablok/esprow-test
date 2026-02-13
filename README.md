# Esprow Test (JSON Array Parser)

Used technologies:

* React
* TypeScript
* Vite
* Zustand (as a store manager)

## Launch

Run following commands in project's main directory:

<code>npm install</code>

<code>npm run dev</code>

## How to use

1. Input `.json` file (pregenerated example files you can find in `./data` directory);
2. To change values click on them and insert new value in opened modal;
3. Download changed `.json` file.

### TODOs:

1. Self-made virtual scroll.

## Task requirements

* Application contains an input for a random generated JSON file, user can upload it
* We assume input JSON is:
  * always valid
  * always an array with objects
  * always contains objects which have the same structure
  * generated randomly through any JSON generator like https://json-generator.com/
  * not contain any nested objects (all elements in JSON array are flat)
* After uploading, the user will see data this JSON contains.
* Application should be able to handle and work smoothly with JSON with 10000+ rows.
  Implementing self-written Virtualizer is a large plus for a candidate.
* User could see / find all data presented in JSON array 
* User could edit any element of JSON array 
* User could save edited JSON after making changes.

Input JSON Example (via https://json-generator.com/):
```
[
  '{{repeat(10000)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    guid: '{{guid()}}',
    isActive: '{{bool()}}',
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: 'http://placehold.it/32x32',
    age: '{{integer(20, 40)}}',
    eyeColor: '{{random("blue", "brown", "green")}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    company: '{{company().toUpperCase()}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}},
    {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-
    ddThh:mm:ss Z")}}',
    latitude: '{{floating(-90.000001, 90)}}',
    longitude: '{{floating(-180.000001, 180)}}',
  }
]
```
