import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-database-administration',
  templateUrl: './database-administration.component.html',
  styleUrls: ['./database-administration.component.scss']
})
export class DatabaseAdministrationComponent {
  public version: string;
  public databases = [];
  public saving = false;

  displayedColumns: string[] = ['database', 'size'];

  public loadVersion() {
    this.databaseService.getServerVersion().subscribe(ver => {
      this.version = ver.version;
    },
    error => {
      this.errorService.handle(error);
    })
  }

  public loadDatabases() {
    this.databaseService.getDatabases().subscribe(databases => {
      this.databases = databases;
    },
    error => {
      this.errorService.handle(error);
    })
  }

  constructor(private errorService: ErrorService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.loadDatabases();
    this.loadVersion();
  }
}
