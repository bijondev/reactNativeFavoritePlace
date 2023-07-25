import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";
const db = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists places (
            id integer primary key not null,
            title text not null,
            imageUri text not null,
            address text not null,
            lat real not null,
            lng real not null
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into places (title, imageUri, address, lat, lng) values (
                ?,?,?,?,?
            )`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlace() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from places order by id desc`,
        [],
        (_, result) => {
          // console.log(result.rows._array);
          const places = [];

          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }

          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from places where id = ?`,
        [id],
        (_, result) => {
          // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
          // console.log(result.rows._array[0]);

          const dbPlace = result.rows._array[0];

          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            {
              lat: dbPlace.lat,
              lng: dbPlace.lng,
              address: dbPlace.address,
            },
            dbPlace.id
          );

          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
