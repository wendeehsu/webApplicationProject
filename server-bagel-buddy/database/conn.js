
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user1:user1@bagel.ga3mauc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const prodDBName = "BagelBuddy";
const table = {
  user: "user",
  skill: "skill",
  timeslot: "timeslot",
  lesson: "lesson",
  cancel: "cancel",
  review: "review"
};

exports.pingDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // await insertRecord();
    // await listAllRecord();
    // await findRecord();
    // await deletePartial();
    await deleteAll();

  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const insertRecord = async () => {
  const users = [
    { id: 201, name: 'John Smith', native_language: 'English', img_url: 'john.jpg', points: 100, type: 0, },
    { id: 202, name: 'Emily Johnson', native_language: 'French', img_url: 'emily.jpg', points: 95, type: 0, },
    { id: 103, name: 'Robert Lee', native_language: 'Spanish', img_url: 'robert.jpg', points: 5, type: 1, },
    { id: 104, name: 'Maria Garcia', native_language: 'German', img_url: 'maria.jpg', points: 2, type: 1, },
    { id: 203, name: 'Michael Brown', native_language: 'Chinese', img_url: 'michael.jpg', points: 120, type: 0, },
  ];
  await insert(table.user, users);

  const skills = [
    { id: 1, user_id: 201, skill: 0, },
    { id: 2, user_id: 201, skill: 1, },
    { id: 3, user_id: 201, skill: 2, },
    { id: 4, user_id: 202, skill: 0, },
    { id: 5, user_id: 202, skill: 1, },
    { id: 6, user_id: 203, skill: 3, },
  ];
  await insert(table.skill, skills);

  const timeslots = [
    { id: 1, teacher_id: 103, time_slot: 10, },
    { id: 2, teacher_id: 103, time_slot: 20, },
    { id: 3, teacher_id: 103, time_slot: 21, },
    { id: 4, teacher_id: 104, time_slot: 30, },
    { id: 5, teacher_id: 104, time_slot: 41, },
  ];
  await insert(table.timeslot, timeslots);

  const lessons = [
    { id: 1, teacher_id: 103, student_id: 201, time_slot_start: '2023-10-22 09:00:00', time_slot_end: '2023-10-22 10:00:00', meet_link: 'meetlink_123', status: 2, },
    { id: 2, teacher_id: 103, student_id: 202, time_slot_start: '2023-10-22 10:30:00', time_slot_end: '2023-10-22 11:30:00', meet_link: 'meetlink_456', status: 3, },
    { id: 3, teacher_id: 103, student_id: 203, time_slot_start: '2023-10-22 13:00:00', time_slot_end: '2023-10-22 14:00:00', meet_link: 'meetlink_789', status: 0, },
    { id: 4, teacher_id: 104, student_id: 202, time_slot_start: '2023-10-22 15:30:00', time_slot_end: '2023-10-22 16:30:00', meet_link: 'meetlink_234', status: 1, },
    { id: 5, teacher_id: 104, student_id: 203, time_slot_start: '2023-10-22 17:00:00', time_slot_end: '2023-10-22 18:00:00', meet_link: 'meetlink_567', status: 2, },
  ];
  await insert(table.lesson, lessons);

  const cancels = [
    {	id:1,	lesson_id:4,	canceler_id:202,	note:'Lesson canceled by A',	},
  ];
  await insert(table.cancel, cancels);
}

const insert = async (collectionName, items) => {
  const database = client.db(prodDBName);
  const collection = database.collection(collectionName);
  try {
    const insertManyResult = await collection.insertMany(items);
    console.log(`Success! ${insertManyResult.insertedCount} documents inserted to ${collectionName}\n`);
  } catch (err) {
    console.error(`Error when inserting into ${collectionName} => ${err}\n`);
  }
}

const listAllRecord = async () => {
  await listItem(table.user);
  await listItem(table.skill);
  await listItem(table.timeslot);
  await listItem(table.lesson);
}

const findRecord = async () => {
  await listItem(table.user, { type: 0});
  await listItem(table.skill, { user_id: 201});
  await listItem(table.timeslot, { teacher_id: 104});
  await listItem(table.lesson, { teacher_id: 104});
}

const listItem = async (collectionName, findQuery = null) => {
  const database = client.db(prodDBName);
  const collection = database.collection(collectionName);
  console.log("listing items from table = ", collectionName);
  try {
    let results = [];
    if (findQuery == null) {
      results = await collection.find();
    } else {
      results = await collection.find(findQuery);
    }
    await results.forEach(data => {
      console.log(data);
    });
  } catch (err) {
    console.error(`Error when listing data in ${collectionName} => ${err}\n`);
  }
}

const deletePartial = async () => {
  await deleteItem(table.user, { type: 0});
  await deleteItem(table.skill, { user_id: 201});
  await deleteItem(table.timeslot, { teacher_id: 104});
  await deleteItem(table.lesson, { teacher_id: 104});
}

const deleteAll = async () => {
  await deleteItem(table.skill);
  await deleteItem(table.timeslot);
}

const deleteItem = async (collectionName, findQuery = null) => {
  const database = client.db(prodDBName);
  const collection = database.collection(collectionName);
  try {
    let results = [];
    if (findQuery == null) {
      results = await collection.deleteMany();
    } else {
      results = await collection.deleteMany(findQuery);
    }
    console.log(`Deleted ${results.deletedCount} documents from ${collectionName}`);
  } catch (err) {
    console.error(`Error when deleting data in ${collectionName} => ${err}\n`);
  }
}