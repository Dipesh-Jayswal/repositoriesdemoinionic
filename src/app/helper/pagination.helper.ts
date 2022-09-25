export default class Pagination{
    public limit;
    public currentPage=1;
    private _total;
    public totalPages;
    public canGoNext = true;
    public canGoPrevious =false;
    public startResult;
    public endResult;
    public pageChangeCallback:any = null;

    constructor(limit,total){       
        this.limit = parseInt(limit);
        this.total = total;
    }
    calc(){
        if(this.totalPages > this.currentPage){
            this.canGoNext= true;
        }else{
            this.canGoNext= false;
        }
        if(this.currentPage > 0){
            this.canGoPrevious =  true;
        }else{
            this.canGoPrevious =  false;
        }
        this.startResult = Math.min((this.limit * this.currentPage) + 1,this._total);
        this.endResult = Math.min(this.limit * (this.currentPage + 1),this._total);
    }
    public next(){
        if(this.canGoNext){
          this.currentPage++;
          this.calc();
          if(this.pageChangeCallback){
            this.pageChangeCallback();
          }
        }
    }
    public previous(){
        if(this.canGoPrevious){
          this.currentPage--;
          this.calc();
          if(this.pageChangeCallback){
            this.pageChangeCallback();
          }
        }
    }
    get offset(){
        return this.currentPage * this.limit;
    }
    get total(){
        return this._total;
    }
    set total(val){
        this._total = val;
        this.totalPages = Math.ceil(this._total / this.limit) - 1;
        this.calc();
    }
    reset(){
        this.currentPage = 0;
        this.calc();
    }
    setOnPageChange(cb){
      this.pageChangeCallback = cb;
    }
}
