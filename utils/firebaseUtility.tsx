import { firestore, storage, auth } from "./firebaseInit";
import { v4 as uuidv4 } from "uuid";
import { toUnicode } from "punycode";

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

//TODO: set name desc parameters

const uploadFood = async (
  userDataId: string,
  menuId: string,
  name: string,
  description: string,
  file: any
) => {
  const storageRef = storage.ref();
  const saveImageRef = storageRef.child(`detectedImage/${uuidv4()}`);

  await saveImageRef
    .child(userDataId)
    .put(file)
    .then(async function (snapshot) {
      console.log(snapshot.metadata.fullPath);

      await storageRef
        .child(snapshot.metadata.fullPath)
        .getDownloadURL()
        .then(async function (url) {
          const now = new Date();
          await firestore
            .collection("users")
            .doc(userDataId)
            .collection("menus")
            .doc(menuId)
            .collection("foods")
            .add({
              name: name,
              description: description,
              url: url,
              createdDate:
                String(now.getFullYear()) +
                "-" +
                String(now.getMonth() + 1) +
                "-" +
                String(now.getDate()) +
                "-" +
                String(now.getHours()) +
                "-" +
                String(now.getMinutes()) +
                "-" +
                String(now.getSeconds()),
            })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              // Handle any errors
              console.log(error);
            });
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error deleting storage: ", error);
        });
    });
};

function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width <= maxWidth && height <= maxHeight) {
        resolve(file);
      }

      let newWidth;
      let newHeight;

      if (width > height) {
        newHeight = height * (maxWidth / width);
        newWidth = maxWidth;
      } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
      }

      let canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      let context = canvas.getContext("2d");

      if (context) {
        context.drawImage(image, 0, 0, newWidth, newHeight);
      }

      canvas.toBlob(function (blob) {
        // return blob;
        if (blob) {
          resolve(blob);
        }
      }, file.type);
    };
    image.onerror = reject;
  });
}

export {
  fetchCollectionDocs,
  fetchDocumentFromCollection,
  fetchDocumentFromCollectionByFieldName,
  uploadFood,
  isEmpty,
};
