
import { Component, OnInit } from '@angular/core';
import Pagination from '../helper/pagination.helper';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-repositoreis',
  templateUrl: './repositoreis.page.html',
  styleUrls: ['./repositoreis.page.scss'],
})

export class RepositoreisPage implements OnInit {
  searchingGitRepo = '';
  repositoreisListArray = [];
  perPage = 30;
  pagination = new Pagination(this.perPage, 0);
  constructor(public service: Service) { }

  ngOnInit() {
  }

  search(ev: any) {
    if (ev && ev.key === 'Enter' || ev === 'Enter') {
      if (this.searchingGitRepo !== '' && this.searchingGitRepo.trim()) {
        console.log(this.searchingGitRepo);
        this.pagination = new Pagination(this.perPage, 0);
        this.getGitHubRepositories();
      } else {
        this.searchingGitRepo = '';
      }
    }
  }

  getGitHubRepositories(infiniteScroll = null) {
    if (!infiniteScroll) {
      this.service.loadingPresent();
    }
    this.service.get({
      path:'/search/repositories?q=' + this.searchingGitRepo + '&sort=stars&order=desc&per_page=' + this.perPage + '&page=' + this.pagination.currentPage, isAuth: true
    }).subscribe((result: any) => {
      if (!infiniteScroll) {
        this.service.loadingHide();
      } else {
        infiniteScroll.target.complete();
      }
      if (result.items.length) {
        this.repositoreisListArray = [...this.repositoreisListArray, ...result.items];
        this.pagination.total = result.total_count;
      } else {
        this.service.toastCustom('Sorry No Data Found', 'top');
      }
    }, error => {
      this.service.toastCustom('Sorry No Data Found', 'top');
      this.service.loadingHide();
    });
  }

  // infinite scroll
  infiniteScroll(infiniteScroll) {
    if (this.pagination.canGoNext) {
      this.pagination.next();
      this.getGitHubRepositories(infiniteScroll);
    }
  }

  resetValueSet(ev: any) {
    if (ev.target.value === '' && this.searchingGitRepo.trim() || ev.target.value == null && this.searchingGitRepo.trim()) {
      this.pagination = new Pagination(this.perPage, 0);
      this.searchingGitRepo = '';
      this.repositoreisListArray = [];
    }
  }
}
