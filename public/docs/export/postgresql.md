# Postgresql

You can export the data generated by schemas or any type of data to [postgresql](https://www.postgresql.org/) format

## What can you export?

Data can only be exported in two ways:

-  An object with data
-  An array with similar objects (objects must have the same fields and the values of these fields must belong to the same data type)

```js
// ✅ correct
await chaca.export([
   { id: 1, name: 'Amaya' },
   { id: 2, name: 'Jose' },
   { id: 3, name: 'Hector' },
])

// ❌ wrong
await chaca.export([
   { id: 1, name: 'Amaya' },
   { id: 2, name: 'Jose' },
   {
      id: 3,
      name: 'Hector',
      // this field does not exists in other objects
      image: 'https://pixabay.com/get/gced34cca12f5b9cb12e765ebc87a3be51118a7437a87d4636caa28a26ae72d433b2554e104ca79735997400b3fa19634c943d6d63cf5b9e7be93b525d459d86e_1280.jpg',
   },
])

// ❌ wrong
await chaca.export([
   { id: 1, name: 'Amaya' },
   { id: 2, name: 'Jose' },
   // In the other objects of the array, the id field is a number while in this one it is a string, therefore it violates the uniformity of the documents
   { id: 'bac15e95-0cb0-4acb-86b4-b625216c4db9', name: 'Hector' },
])
```

## Example case

```js
const userSchema = chaca.schema({
   username: schemas.internet.userName(),
   image: { type: schemas.image.people(), posibleNull: 50 },
   email: schemas.internet.email(),
})

await userSchema.generateAndExport({
   filaName: 'data',
   format: 'postgresql',
   location: 'folder',
})
```

For example, if we have this schema, we generate 5 documents and export them in **postgresql** format, we will obtain the following result

```sql
CREATE TABLE Data(
	id INTEGER NOT NULL,
	username VARCHAR(255) NOT NULL,
	image VARCHAR(255),
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO Data VALUES (1, 'Hazel_', NULL, 'victoria623@gmail.com');
INSERT INTO Data VALUES (2, 'Aaron013', 'https://images.unsplash.com/photo-1523464862212-d6631d073194?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTM2NjZ8MHwxfHNlYXJjaHw2M3x8cGVvcGxlfGVufDB8fHx8MTY2Njk3MDgzMw&ixlib=rb-4.0.3&q=80', 'dylan.@gmail.com');
INSERT INTO Data VALUES (3, 'Mason220', NULL, 'theodore752@yahoo.com');
INSERT INTO Data VALUES (4, 'Ryan.', 'https://pixabay.com/get/g0178953767bb1280e4cafe638baf623e0b0d4a15984be55d5a456061b113f59fd93b1caae073f5c71162561818571c4bc4f1207fc4adbf824425f3155c223678_1280.jpg', 'ava824@yahoo.com');
INSERT INTO Data VALUES (5, 'Willow.', 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg', 'easton_@yahoo.com');
```

In the above code you can see several aspects about the generation:

-  The `id` field is automatically generated if no [key field](../fields-type/key) is defined in the schema
-  If the values belonging to a certain field in all documents never have a `null` value, `NOT NULL` will be added to its definition in the table

:::info Possible null fields
If a field has the [possibleNull](../fields-type/field-config#possiblenull) option configured with a value greater than 0 when exporting it in `sql` format, it will be defined as a field that can take a null value
:::

## Transformations

During the generation of the `sql` file there are data types that are not part of the types defined in `sql`, therefore alternatives are taken to be able to represent them.

### Object

When one of the existing fields in the documents is an object with new fields to generate, a new table will be created where all the fields of the object will be declared.

```js
const postSchema = chaca.schema({
   id: chaca.key(chaca.sequence()),
   title: schemas.lorem.words(),
   imageCover: schemas.image.wallpaper(),
   author: chaca.schema({
      name: schemas.person.fullName(),
      age: schemas.dataType.int({ min: 18, max: 90 }),
      email: schemas.internet.email(),
   }),
})
```

```sql
CREATE TABLE Post(
	id INTEGER NOT NULL,
	title VARCHAR(255) NOT NULL,
	imagecover VARCHAR(255) NOT NULL,
	author INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (author) REFERENCES Post_author (id)
);

CREATE TABLE Post_author(
	id INTEGER NOT NULL,
	name VARCHAR(255) NOT NULL,
	age INTEGER NOT NULL,
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO Post VALUES (1, 'exercitation elit proident commodo voluptate', 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTM2NjZ8MHwxfHNlYXJjaHw2MHx8d2FsbHBhcGVyfGVufDB8fHx8MTY2Njk3MDc4NA&ixlib=rb-4.0.3&q=80', 1);
INSERT INTO Post VALUES (2, 'irure pariatur velit ex irure', 'https://pixabay.com/get/g43ea9f2c45eb01108557c11a8fdea591e1c7cca452a2be44454c068fb7ca8892e1a36fe6a85e592c5f59ff2f6d3cb540f9d88bda034b99dac16fb6f5503a5677_1280.jpg', 2);
INSERT INTO Post VALUES (3, 'eiusmod ad cupidatat consectetur do', 'https://images.unsplash.com/photo-1510279770292-4b34de9f5c23?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTM2NjZ8MHwxfHNlYXJjaHwyOHx8d2FsbHBhcGVyfGVufDB8fHx8MTY2Njk3MDc4MQ&ixlib=rb-4.0.3&q=80', 3);
INSERT INTO Post VALUES (4, 'pariatur dolor quis officia labore', 'https://pixabay.com/get/gc6a147081077919cff568829303a20068c342a966cdec351f543aa26f41c9f26eea2edcf949323df66b4308d170527bc608f9063ffe9ba081af96ce608057707_1280.jpg', 4);
INSERT INTO Post VALUES (5, 'qui deserunt culpa nisi elit', 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg', 5);
INSERT INTO Post_author VALUES (1, 'Elias Benjamin Knight Anderson', 19, 'harper_@gmail.com');
INSERT INTO Post_author VALUES (2, 'Elijah Cook Anderson', 22, 'samuel_@yahoo.com');
INSERT INTO Post_author VALUES (3, 'Isaiah Anderson Bell', 65, 'nathan546@yahoo.com');
INSERT INTO Post_author VALUES (4, 'Maya Bradley Griffiths', 30, 'ezra653@yahoo.com');
INSERT INTO Post_author VALUES (5, 'Leah Claire Corbyn Ford', 35, 'leo705@hotmail.com');
```

In the case of this schema, the author field is an object with 3 new fields (`email`, `age`, `name`), therefore a new table is created with these properties and their definitions.

### Array

When one of the existing fields in the documents has an array of values as value, a new table will be created where all these values will be stored.

```js
const userSchema = chaca.schema({
   id: chaca.key(chaca.sequence()),
   username: schemas.internet.userName(),
   image: { type: schemas.image.people(), posibleNull: 50 },
   email: schemas.internet.email(),
   posts: { type: schemas.id.uuid(), isArray: { min: 1, max: 3 } },
})
```

Generating a sql file with the data generated by the previous schema, we obtain

```sql
CREATE TABLE User(
	id INTEGER NOT NULL,
	username VARCHAR(255) NOT NULL,
	image VARCHAR(255),
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE User_posts(
	id INTEGER NOT NULL,
	user_posts VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES User (id)
);

INSERT INTO User VALUES (1, 'Jhon115', 'https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg', 'aaliyah_@gmail.com');
INSERT INTO User VALUES (2, 'Sebastian_', NULL, 'samuel576@gmail.com');
INSERT INTO User VALUES (3, 'Miles789', NULL, 'stella577@yahoo.com');
INSERT INTO User VALUES (4, 'Andrew.', 'https://pixabay.com/get/g483d61e02b145e27897333e9e30cd370262864bd3158b0c7a1f776341ebb23f874ea535815a381195f2cefd8ce9b639fc6efd44564ca4195cae2562f69078b42_1280.png', 'everly404@hotmail.com');
INSERT INTO User VALUES (5, 'Daniel.', NULL, 'emilia202@yahoo.com');
INSERT INTO User_posts VALUES (1, '61048ace-d56e-4892-9e8c-87c7a9375014', 1);
INSERT INTO User_posts VALUES (2, 'd41b3ced-ce0e-4826-8ab5-1a9ac12441cc', 1);
INSERT INTO User_posts VALUES (3, '242e5acd-7140-41ba-9a14-08b76469a5d2', 2);
INSERT INTO User_posts VALUES (4, 'a610d540-2620-477a-ac39-51d5da017459', 3);
INSERT INTO User_posts VALUES (5, '3372e4a4-e0b7-4b98-81a6-b4313099a823', 4);
INSERT INTO User_posts VALUES (6, 'bc37d81a-62a3-49a7-8be2-167c2c5571e0', 5);
```

As you can see, a new table `User_posts` has been created to store the existing values in the arrays of the `posts` field. In which you can see several important aspects of the transformation:

-  The new table will have an autogenerated field `id` which is the primary key of the table
-  A new `user_id` field that is a `FOREIGN KEY` to the `User` table. Which has as registry value the id of the `User` record to which it belongs
-  To save the value of each array element in the registry, the `user_posts` field was defined.

:::info
The field created to store the values of the array will have the same name as the table created
:::

### Ref fields

In the case of the [ref fields](../fields-type/ref), these will be transformed into `FOREIGN KEYS` that will point to the table and to the field defined in the schema

```js
const USER_SCHEMA = chaca.schema({
   id: chaca.key(schemas.id.uuid()),
   username: schemas.internet.userName(),
})

const POST_SCHEMA = chaca.schema({
   id: chaca.key(schemas.id.uuid()),
   title: schemas.lorem.words(),
   user: chaca.ref('User.id'),
})

await chaca.exportFromSchemas(
   [
      { name: 'User', schema: USER_SCHEMA, documents: 3 },
      { name: 'Post', schema: POST_SCHEMA, documents: 10 },
   ],
   config
)
```

Exporting the above schemas in a sql file the following result is obtained

```sql
CREATE TABLE User(
	id VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Post(
	id VARCHAR(255) NOT NULL,
	user VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user) REFERENCES User (id)
);

INSERT INTO User VALUES ('e196bc37-dbd2-4e2a-8c4e-cee88edb5962', 'Autumm.');
INSERT INTO User VALUES ('18519928-417c-4d2a-9d16-9a675b6205c1', 'Daniel_');
INSERT INTO User VALUES ('d4292a4d-1c24-470d-8065-2353861335d5', 'Layla589');
INSERT INTO Post VALUES ('e08c57d1-4ac9-4e0e-8c3b-c6e1c53a6b86', 'e196bc37-dbd2-4e2a-8c4e-cee88edb5962', 'ad eiusmod sint proident qui');
INSERT INTO Post VALUES ('0e74dd31-3ed1-4c04-9049-603866338756', 'd4292a4d-1c24-470d-8065-2353861335d5', 'amet esse pariatur est aliquip');
INSERT INTO Post VALUES ('125e4e1a-aae6-4d26-b685-861425b8216b', '18519928-417c-4d2a-9d16-9a675b6205c1', 'laboris fugiat eu culpa id');
INSERT INTO Post VALUES ('82d68524-c1be-4e77-b28e-04391cd42021', '18519928-417c-4d2a-9d16-9a675b6205c1', 'officia est in velit in');
INSERT INTO Post VALUES ('7702701e-2b89-4d0c-b046-8ba889e49913', '18519928-417c-4d2a-9d16-9a675b6205c1', 'quis id laborum deserunt sit');
INSERT INTO Post VALUES ('1dbc7c47-0e58-4222-a1e1-931e3d5e04b8', '18519928-417c-4d2a-9d16-9a675b6205c1', 'pariatur fugiat elit ad ea');
INSERT INTO Post VALUES ('97c56e42-59eb-4295-a3b5-c1b15e174987', 'e196bc37-dbd2-4e2a-8c4e-cee88edb5962', 'ea voluptate consequat occaecat in');
INSERT INTO Post VALUES ('eec24351-49e1-4649-9078-373bc4ab6595', 'e196bc37-dbd2-4e2a-8c4e-cee88edb5962', 'qui commodo excepteur sunt minim');
INSERT INTO Post VALUES ('80659575-2337-4836-8da7-730bcdcbee4a', '18519928-417c-4d2a-9d16-9a675b6205c1', 'nisi nisi laborum ea eu');
INSERT INTO Post VALUES ('06b7ce20-c180-45da-937c-b7a886c2eac4', '18519928-417c-4d2a-9d16-9a675b6205c1', 'laborum labore minim ad aliquip');
```