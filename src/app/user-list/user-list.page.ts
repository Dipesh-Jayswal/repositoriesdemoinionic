import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {


  searchingGitUser = '';
  gitUserListArray = [];
  constructor(public service: Service) { }

  ngOnInit() {
  }

  search(ev: any) {
    if (ev && ev.key === 'Enter') {
      if (this.searchingGitUser !== '' && this.searchingGitUser.trim()) {
        console.log(this.searchingGitUser);
        this.getGitHubUserList();
      } else {
        this.searchingGitUser = '';
      }
    }
  }

  getGitHubUserList() {
    this.service.loadingPresent();
    this.service.get({
      path:'/users/'+ this.searchingGitUser +'/repos?per_page=100' , isAuth: true
    }).subscribe((result: any) => {
        this.service.loadingHide();
      if (result.length) {
        this.gitUserListArray = result;
      } else {
        this.service.toastCustom('Sorry No Data Found', 'top');
      }
    }, error => {
      this.service.toastCustom('Sorry No Data Found', 'top');
      this.service.loadingHide();
    });
  }

  resetValueSet(ev: any) {
    if (ev.target.value === '' && this.searchingGitUser.trim() || ev.target.value == null && this.searchingGitUser.trim()) {
      this.searchingGitUser = '';
      this.gitUserListArray = [];
    }
  }
}
