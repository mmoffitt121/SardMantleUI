import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { World } from 'src/app/models/world/world';
import { WorldService } from 'src/app/services/world/world.service';

@Component({
  selector: 'app-world-list',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.scss']
})
export class WorldListComponent implements OnInit {
  public worlds: World[];
  @Input() worldCriteria = {};
  @Input() editing = false;
  @Output() selected = new EventEmitter();

  public onSelect(world: World) {
    this.selected.emit(world);
  }
  
  constructor (private worldService: WorldService) {}

  ngOnInit(): void {
    this.worldService.getWorlds(this.worldCriteria).subscribe(worlds => {
      this.worlds = worlds;
    });
  }
}
