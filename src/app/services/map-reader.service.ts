import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapReaderService {

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<Array<MapData>> {
    return this.http.get('./assets/map0803_201403_01.json').pipe(
      map((rawInput) => {
        let inputArray = [];
        Object.keys(rawInput).forEach((key) => inputArray = rawInput[key]);
        return inputArray.map((input) => {
          let newData = new MapData();
          newData.col = input[0];
          newData.row = input[1];

          let inputText = input[2].split('d');
          if (inputText.length !== 2) {
            throw new Error('bad input - not num d num');
          }
          newData.value = inputText[0] as number;
          newData.valueCategory = 'd' + inputText[1];
          return newData;
        });
      }));
  }
}

export class MapData {
  row: number;
  col: number;
  value: number;
  valueCategory: string;
}
