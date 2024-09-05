import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { World } from 'src/app/models/world/world';
import { ErrorService } from 'src/app/services/error.service';
import { UrlService } from 'src/app/services/url/url.service';
import { WorldService } from 'src/app/services/world/world.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Document } from 'src/app/models/document/document-types/document';
import { DocumentService } from 'src/app/services/document/document.service';
import { SettingJsonService } from 'src/app/services/settings/setting-json.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public world: World | undefined;
  public fullWidth: Document[];
  public halfWidth: Document[];
  public thirdWidth: Document[];
  public documents: Document[];

  public loadDocuments() {
    this.documentService.getFeatured().subscribe((data: any) => {
      this.documents = data;
      let i = 0;
      this.fullWidth = [];
      this.halfWidth = [];
      this.thirdWidth = [];
      this.documents.forEach(d => {
        if (i < 1) {
          this.fullWidth.push(d);
        }
        else if (i < 3) {
          this.halfWidth.push(d);
        }
        else {
          this.thirdWidth.push(d);
        }
        i++;
      })
    });
  }

  public export() {
    this.settingService.export().pipe(take(1)).subscribe();
  }

  constructor(
    public router: Router, 
    public activatedRoute: ActivatedRoute, 
    public urlService: UrlService, 
    private worldService: WorldService, 
    private errorService: ErrorService,
    private themeService: ThemeService,
    private documentService: DocumentService,
    private settingService: SettingJsonService) { }
  ngOnInit(): void {
    this.worldService.getWorlds({location: this.urlService.getWorld()}).subscribe(data => {
      if (data && data.length > 0) {
        this.world = data[0];
        this.loadDocuments();
      }
      else {
        this.errorService.showSnackBar("World not found.");
        this.router.navigate(['home']);
      }
    }, error => {
      this.errorService.showSnackBar("World not found.");
      this.router.navigate(['home']);
    })
  }
}
