import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';

import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import { ConfigurableMenuItem } from 'src/app/models/pages/configurable-menu-item';
import { MenuItemService } from 'src/app/services/menu-items/menu-item.service';
import { max, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { FormItem } from '../../shared/form/form.component';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  treeControl = new NestedTreeControl<ConfigurableMenuItem>(node => node.options);
  dataSource = new MatTreeNestedDataSource<ConfigurableMenuItem>();

  hasChild = (_: number, node: ConfigurableMenuItem) => !!node?.options && node?.options.length > 0;

  public menuItems: ConfigurableMenuItem[] | undefined;
  public selectedItem: ConfigurableMenuItem | undefined;
  public editItems: FormItem[] = [];

  private paths: string[] | undefined;

  public add() {
    this.menuItems?.push({
      name: "New",
      icon: "",
      route: "",
      expanded: false,
      options: []
    });
    this.refreshTree();
  }

  public addTo(node: ConfigurableMenuItem) {
    if (!node.options) {
      node.options = [];
    }
    node.options.push({
      name: "New",
      icon: "",
      route: "",
      expanded: false,
      options: []
    })
    this.refreshTree();
  }

  public up(node: ConfigurableMenuItem) {
    let parent = this.findParent(node, this.menuItems);
    if (parent === false && this.menuItems) {
      let index = this.menuItems.indexOf(node);
      this.move(this.menuItems, index, Math.max(Math.min(index - 1, this.menuItems.length), 0));
      this.refreshTree();
      return;
    }

    if (!parent || !parent.options) {
      return;
    }
    let index = parent.options.indexOf(node);
    let arr = parent?.options
    this.move(arr, index, Math.max(Math.min(index - 1, parent?.options.length), 0))
    this.refreshTree();
  }

  public down(node: ConfigurableMenuItem) {
    let parent = this.findParent(node, this.menuItems);
    if (parent === false && this.menuItems) {
      let index = this.menuItems.indexOf(node);
      this.move(this.menuItems, index, Math.max(Math.min(index + 1, this.menuItems.length), 0));
      this.refreshTree();
      return;
    }

    if (!parent || !parent.options) {
      return;
    }
    let index = parent.options.indexOf(node);
    let arr = parent?.options
    this.move(arr, index, Math.max(Math.min(index + 1, parent?.options.length), 0))
    this.refreshTree();
  }

  public edit(node: ConfigurableMenuItem) {
    if (!this.paths) { return; }
    this.selectedItem = node;
    this.editItems = [
      {
        name: "Name",
        value: node.name,
      } as FormItem,
      {
        name: "Icon",
        value: node.icon,
      } as FormItem,
      {
        name: "Path",
        value: node.route,
        options: this.paths.map(path => {return {name: path, value: path}})
      } as FormItem,
    ]
    this.refreshTree();
  }

  public change(items: any[]) {
    if (!this.selectedItem || !items || !items[0]) {
      return;
    }
    this.selectedItem.name = items[0].value;
    this.selectedItem.icon = items[1].value;
    this.selectedItem.route = items[2].value;
  }

  public delete(node: ConfigurableMenuItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: { 
        title: "Confirm Deletion", 
        content: `Are you sure you want to delete this menu item?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let parent = this.findParent(node, this.menuItems);
        if (parent === false && this.menuItems) {
          let index = this.menuItems.indexOf(node);
          this.menuItems.splice(index, 1);
          this.refreshTree();
          return;
        }

        if (!parent || !parent.options) {
          return;
        }
        let index = parent.options.indexOf(node);
        let arr = parent?.options
        arr.splice(index, 1);
        this.refreshTree();
        if (this.selectedItem === node) {
          this.selectedItem = undefined;
        }
      }
    });
  }

  private findParent(node: ConfigurableMenuItem, toCheck?: ConfigurableMenuItem[]): ConfigurableMenuItem | false | undefined {
    let result: ConfigurableMenuItem | false | undefined = undefined;
    toCheck?.forEach(mi => {
      if (mi === node) {
        result = false
      } 
      let childResult = this.findParent(node, mi.options);
      if (childResult === false) {
        result = mi;
      } else if (childResult !== undefined) {
        result = childResult;
      }
    });

    return result;
  }

  private move(arr: ConfigurableMenuItem[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  public refreshTree() {
    this.dataSource.data = [];
    this.dataSource.data = this.menuItems ?? [];
  }

  public saveChanges() {
    this.service.putConfigurableMenuItems(this.menuItems).pipe(take(1)).subscribe(result => {
      this.errorService.showSnackBar("Menu Items Saved");
    }, error => this.errorService.handle(error))
  }

  constructor(private service: MenuItemService, private dialog: MatDialog, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.service.getConfigurableMenuItems().pipe(take(1)).subscribe(result => {
      this.menuItems = result;
      this.dataSource.data = this.menuItems ?? [];
    })

    this.service.getPossiblePaths().pipe(take(1)).subscribe(paths => {
      this.paths = paths;
    })
  }
}
