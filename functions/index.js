const functions = require("firebase-functions");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {initializeApp} = require("firebase-admin/app");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

initializeApp();

// getting db ref
const db = getFirestore();

exports.addFuelExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/fuel/{fuelId}")
    .onCreate((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(amount),
          }).then(() => {
            console.log("Fuel document successfully updated!");
          }).catch((er) => {
            console.log("Error updating fuel document", er);
          });
    });

exports.delFuelExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/fuel/{fuelId}")
    .onDelete((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(-amount),
          }).then(() => {
            console.log("Fuel document successfully updated!");
          }).catch((er) => {
            console.log("Error updating fuel document", er);
          });
    });

exports.addServiceExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/service/{serviceId}")
    .onCreate((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(amount),
          }).then(() => {
            console.log("Service document successfully updated!");
          }).catch((er) => {
            console.log("Error updating service document", er);
          });
    });

exports.delServiceExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/service/{serviceId}")
    .onDelete((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(-amount),
          }).then(() => {
            console.log("Service document successfully updated!");
          }).catch((er) => {
            console.log("Error updating service document", er);
          });
    });

exports.addOtherExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/others/{otherId}")
    .onCreate((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(amount),
          }).then(() => {
            console.log("Other Expenses document successfully updated!");
          }).catch((er) => {
            console.log("Error updating other services document", er);
          });
    });

exports.delOtherExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/others/{otherId}")
    .onDelete((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(-amount),
          }).then(() => {
            console.log("Other Expenses document successfully updated!");
          }).catch((er) => {
            console.log("Error updating other services document", er);
          });
    });

exports.sumToTotalMonthExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/{expense}/{docId}")
    .onCreate((snap, context) => {
      const amount = snap.data().amount;
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const docRef = db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc("totalMonthly").
          collection(`${year}`).
          doc(`${month}`);
      return docRef.get().then((doc)=>{
        if (doc.exists) {
          return docRef.update({
            month: month,
            year: year,
            total: FieldValue.increment(amount),
          }).then(() => {
            console.log(`month ${month}, year ${year} 
            document successfully updated!`);
          }).catch((er) => {
            console.log(`Error updating data for month ${month}, year ${year}
             document`, er);
          });
        } else {
          return docRef.set({
            month: month,
            year: year,
            total: amount,
          }).then(() => {
            console.log(`month ${month}, year ${year} 
            document successfully created!`);
          }).catch((er) => {
            console.log(`Error adding data for month ${month}, year ${year}
             document`, er);
          });
        }
      }).catch(()=>{
        console.log("error getting data");
      });
    });

exports.subFromTotalMonthExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/{expense}/{docId}")
    .onDelete((snap, context) => {
      const amount = snap.data().amount;
      const year = snap.data().year;
      const month = snap.data().month;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc("totalMonthly").
          collection(year).
          doc(month).
          update({
            total: FieldValue.increment(-amount),
          }).then(() => {
            console.log(`month ${month}, year ${year} 
            document successfully deleted!`);
          }).catch((er) => {
            console.log(`Error deleting month ${month}, year ${year}
             document`, er);
          });
    });
