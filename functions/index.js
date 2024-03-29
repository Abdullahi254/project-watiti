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
            console.log("Fuel expense successfully added!");
          }).catch((er) => {
            console.log("Error adding fuel expense", er);
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
            console.log("Fuel expense successfully deleted!");
          }).catch((er) => {
            console.log("Error deleting fuel expense", er);
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
            console.log("Service expense successfully added!");
          }).catch((er) => {
            console.log("Error adding service expense", er);
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
            console.log("Service expense successfully deleted!");
          }).catch((er) => {
            console.log("Error deleting service expense", er);
          });
    });

exports.addOtherExpense = functions.firestore
    .document("/users/{userId}/otherExpenses/{docId}")
    .onCreate((snap, context) => {
      const amount = snap.data().amount;
      const date = new Date(snap.data().date.toDate().toString());
      const year = date.getFullYear();
      const month = date.getMonth();
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

exports.delOtherExpense = functions.firestore
    .document("/users/{userId}/otherExpenses/{docId}")
    .onDelete((snap, context) => {
      const amount = snap.data().amount;
      const date = new Date(snap.data().date.toDate().toString());
      const year = date.getFullYear();
      const month = date.getMonth();
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc("totalMonthly").
          collection(`${year}`).
          doc(`${month}`).
          update({
            total: FieldValue.increment(-amount),
          }).then(() => {
            console.log(`month ${month}, year ${year} 
              expense successfully subtructed!`);
          }).catch((er) => {
            console.log(`Error subtructing month ${month}, year ${year}
               expense`, er);
          });
    });

exports.addLabourExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/labour/{docId}")
    .onCreate((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(amount),
          }).then(() => {
            console.log("Labour expense successfully added!");
          }).catch((er) => {
            console.log("Error adding labour expense", er);
          });
    });

exports.delLabourExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/labour/{docId}")
    .onDelete((snap, context) => {
      const amount = snap.data().amount;
      return db.collection("users").
          doc(context.params.userId).
          collection("vehicles").
          doc(context.params.numplate).
          update({
            total: FieldValue.increment(-amount),
          }).then(() => {
            console.log("labour expense successfully deleted!");
          }).catch((er) => {
            console.log("Error deleting labour expense", er);
          });
    });

exports.sumToTotalMonthExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/{expense}/{docId}")
    .onCreate((snap, context) => {
      if (context.params.expense !== "materials" && context.params.numplate !==
       "totalMonthly") {
        const amount = snap.data().amount;
        const date = new Date(snap.data().date.toDate().toString());
        const year = date.getFullYear();
        const month = date.getMonth();
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
      } else {
        return "No value was added";
      }
    });

exports.subFromTotalMonthExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/{expense}/{docId}")
    .onDelete((snap, context) => {
      if (context.params.expense !== "materials" && context.params.numplate !==
       "totalMonthly") {
        const amount = snap.data().amount;
        const date = new Date(snap.data().date.toDate().toString());
        const year = date.getFullYear();
        const month = date.getMonth();
        return db.collection("users").
            doc(context.params.userId).
            collection("vehicles").
            doc("totalMonthly").
            collection(`${year}`).
            doc(`${month}`).
            update({
              total: FieldValue.increment(-amount),
            }).then(() => {
              console.log(`month ${month}, year ${year} 
              expense successfully subtructed!`);
            }).catch((er) => {
              console.log(`Error subtructing month ${month}, year ${year}
               expense`, er);
            });
      } else {
        return "No value was subtructed";
      }
    });

exports.sumToTotalCarMonthExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/{expense}/{docId}")
    .onCreate((snap, context) => {
      if (context.params.expense !== "materials" && context.params.numplate !==
       "totalMonthly") {
        const amount = snap.data().amount;
        const date = new Date(snap.data().date.toDate().toString());
        const year = date.getFullYear();
        const month = date.getMonth();
        const docRef = db.collection("users").
            doc(context.params.userId).
            collection("vehicles").
            doc(context.params.numplate).
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
      } else {
        return "No value was added";
      }
    });

exports.subFromTotalCarMonthExpense = functions.firestore
    .document("/users/{userId}/vehicles/{numplate}/{expense}/{docId}")
    .onDelete((snap, context) => {
      if (context.params.expense !== "materials" && context.params.numplate !==
       "totalMonthly") {
        const amount = snap.data().amount;
        const date = new Date(snap.data().date.toDate().toString());
        const year = date.getFullYear();
        const month = date.getMonth();
        return db.collection("users").
            doc(context.params.userId).
            collection("vehicles").
            doc(context.params.numplate).
            collection(`${year}`).
            doc(`${month}`).
            update({
              total: FieldValue.increment(-amount),
            }).then(() => {
              console.log(`month ${month}, year ${year} 
              expense successfully subtructed!`);
            }).catch((er) => {
              console.log(`Error subtructing month ${month}, year ${year}
               expense`, er);
            });
      } else {
        return "No value was subtructed";
      }
    });
