import { Component } from '@angular/core';
import {MapData, MapReaderService} from './map-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map: Array<Array<TimestampedColor>> = null;
  mapData: Array<MapData> = [];

  private rowNumber = 17;
  private colNumber = 28;
  private growScale = 1;

  constructor(private mapReaderService: MapReaderService) {
    this.initGrid();
    this.mapReaderService.getJSON().subscribe(data => {
      this.mapData = data;
    });
  }

  start() {
    this.readMapData();
  }

  grow() {
    this.map = null;
    this.growScale = 3;
    this.colNumber *= this.growScale;
    this.rowNumber *= this.growScale;
    this.initGrid();
    this.readMapData();
  }

  spread() {
    let startTime = new Date().getTime();

    for (let rowIdx = 0; rowIdx < this.rowNumber; rowIdx++) {
      for (let colIdx = 0; colIdx < this.colNumber; colIdx++) {
        if (this.map[rowIdx][colIdx].color.length > 0 && this.map[rowIdx][colIdx].timestamp < startTime) {
          let color = this.map[rowIdx][colIdx].color;
          this.spreadRec(rowIdx + 1, colIdx, color);
          this.spreadRec(rowIdx - 1, colIdx, color);
          this.spreadRec(rowIdx, colIdx + 1, color);
          this.spreadRec(rowIdx, colIdx - 1, color);
        }
      }
    }
  }

  private spreadRec(rowIdx: number, colIdx: number, color: string) {
    if (this.isSafeArrayAccess(rowIdx, colIdx) && this.map[rowIdx][colIdx].color.length === 0) {
      this.map[rowIdx][colIdx].color = color;
    }
  }

  private isSafeArrayAccess(rowIdx: number, colIdx: number): boolean {
    return rowIdx >= 0 && colIdx >= 0 && rowIdx < this.rowNumber && colIdx < this.colNumber;
  }

  private readMapData() {
    this.mapData.forEach(input => {
      let row = input.row as number - 1;
      let col = input.col as number - 1;

      for (let blockRowIdx = 0; blockRowIdx < this.growScale; blockRowIdx++) {
        for (let blockColIdx = 0; blockColIdx < this.growScale; blockColIdx++) {
          let newData = new TimestampedColor();
          newData.color = this.getColor(input);
          this.map[row * this.growScale + blockRowIdx][col * this.growScale + blockColIdx] = newData;
        }
      }
    });
  }

  private initGrid() {
    this.map = [];
    for (let rowIdx = 0; rowIdx < this.rowNumber; rowIdx++) {
      let row = [];
      for (let colIdx = 0; colIdx < this.colNumber; colIdx++) {
        let newData = new TimestampedColor();
        newData.color = '';
        row.push(newData);
      }
      this.map.push(row);
    }
  }

  private getColor(data: MapData) {
    switch (data.valueCategory) {
      case 'd4':
        if (data.value === 3) {
          return 'darkgreen';
        } else if (data.value === 4) {
          return 'lightgrey';
        } else {
          return 'lightgreen';
        }
      case 'd6':
        if (data.value >= 1 && data.value <= 3) {
          return 'lightgreen';
        } else if (data.value === 4) {
          return 'darkgreen';
        } else {
          return 'lightgrey';
        }
      case 'd8':
        if (data.value >= 1 && data.value <= 4) {
          return 'lightgreen';
        } else if (data.value >= 5 && data.value <= 6) {
          return 'darkgreen';
        } else if (data.value === 7) {
          return 'lightgrey';
        } else {
          return 'cyan';
        }
      case 'd10':
        if (data.value >= 1 && data.value <= 3) {
          return 'lightgreen';
        } else if (data.value >= 4 && data.value <= 6) {
          return 'darkgreen';
        } else if (data.value >= 7 && data.value <= 8) {
          return 'lightgrey';
        } else if (data.value === 9) {
          return 'cyan';
        } else {
          return 'brown';
        }
      case 'd12':
        if (data.value >= 1 && data.value <= 3) {
          return 'lightgreen';
        } else if (data.value >= 4 && data.value <= 6) {
          return 'darkgreen';
        } else if (data.value >= 7 && data.value <= 8) {
          return 'lightgrey';
        } else if (data.value >= 9 && data.value <= 10) {
          return 'cyan';
        } else if (data.value === 11) {
          return 'brown';
        } else {
          return 'orange';
        }
      case 'd20':
        if (data.value >= 1 && data.value <= 5) {
          return 'lightgreen';
        } else if (data.value >= 6 && data.value <= 8) {
          return 'darkgreen';
        } else if (data.value >= 9 && data.value <= 11) {
          return 'lightgrey';
        } else if (data.value >= 12 && data.value <= 14) {
          return 'cyan';
        } else if (data.value >= 15 && data.value <= 17) {
          return 'brown';
        } else if (data.value >= 18 && data.value <= 19) {
          return 'orange';
        } else {
          return 'black';
        }
      case 'd100':
        if (data.value >= 10 && data.value <= 30) {
          return 'lightgreen';
        } else if (data.value >= 40 && data.value <= 60) {
          return 'darkgreen';
        } else if (data.value >= 70 && data.value <= 80) {
          return 'lightgrey';
        } else if (data.value === 90) {
          return 'cyan';
        } else {
          return 'brown';
        }
    }
    return 'red';
  }
}

export class TimestampedColor {
  _color: string;
  timestamp: number;

  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color;
    this.timestamp = new Date().getTime();
  }
}
