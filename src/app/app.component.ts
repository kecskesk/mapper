import { Component } from '@angular/core';
import { MapReaderService } from './map-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map = null;
  mapData = [[1,1,'1d20'], [10,22,'3d4'], [6,24,'3d4'], [17, 28,'3d4'], [6,24,'3d4'], [5,7,'3d4']];
  title = 'mapper';

  constructor(private mapReaderService: MapReaderService) {
    this.initGrid();
    this.mapReaderService.getJSON().subscribe(data => {
      console.log(data);
    });
  }

  start() {
    this.readMapData();
  }

  private readMapData() {
    this.mapData.forEach(input => {
      if (input.length !== 3) { return; }
      let row = input[0] as number - 1;
      let col = input[1] as number - 1;
      let data = input[2];
      this.map[row][col] = data;
    });
  }

  private initGrid() {
    this.map = [];
    for (let rowIdx = 0; rowIdx < 17; rowIdx++) {
      let row = [];
      for (let colIdx = 0; colIdx < 28; colIdx++) {
        let cell = '';
        row.push(cell);
      }
      this.map.push(row);
    }
  }
}
