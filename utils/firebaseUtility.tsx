import { firestore, auth } from "./firebaseInit";

function fetchCollectionDocs(collectionName: string) {
  const data: object[] = [];
  return new Promise((resolve, reject) => {
    firestore
      .collection(collectionName)
      .orderBy("createdAt", "desc")
      .get()
      .then((documentSet) => {
        if (documentSet != null) {
          documentSet.forEach((doc) => {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        }
        resolve(data);
      });
  });
}

function fetchDocumentFromCollection({
  id,
  collectionName,
}: {
  id: string;
  collectionName: string;
}) {
  return new Promise((resolve, reject) => {
    firestore
      .collection(collectionName)
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve({
            id: doc.id,
            ...doc.data(),
          });
        } else {
          resolve({});
        }
      });
  });
}

function fetchDocumentFromCollectionByFieldName({
  collectionName,
  fieldName,
  value,
}: {
  collectionName: string;
  fieldName: string;
  value: string;
}) {
  return new Promise((resolve, reject) => {
    firestore
      .collection(collectionName)
      .where(fieldName, "==", value)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length === 1) {
          const doc = snapshot.docs[0];
          if (doc.exists) {
            resolve({
              id: doc.id,
              ...doc.data(),
            });
          } else {
            resolve({});
          }
        } else {
          resolve({});
        }
      });
  });
}

function isEmpty(obj: object) {
  return obj.constructor === Object && Object.keys(obj).length === 0;
}

export {
  fetchCollectionDocs,
  fetchDocumentFromCollection,
  fetchDocumentFromCollectionByFieldName,
  isEmpty,
};
