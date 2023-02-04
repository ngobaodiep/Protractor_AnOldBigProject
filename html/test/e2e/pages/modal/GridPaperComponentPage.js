(function(){
  'use strict';
  var GridPaperComponentPage = function(){
    var k_grid = element(by.className("k-grid")),
    k_grid_paper = k_grid.element(by.className("k-grid-pager")),
    goToFirstPage = k_grid_paper.element(by.css("a:nth-child(1)")),
    goToPreviousPage = k_grid_paper.element(by.css("a:nth-child(2)")),
    goToNextPage = k_grid_paper.element(by.css("a:nth-child(4)")),
    goToLastPage = k_grid_paper.element(by.css("a:nth-child(5)")),
    k_pager_numbers = k_grid_paper.element(by.className("k-pager-numbers")),
    k_pager_info = k_grid_paper.element(by.className("k-pager-info"));

    this.getKGridPaper = function(){
      return k_grid_paper;
    };

    this.getGoToFirstPageButton = function(){
      return goToFirstPage;
    };

    this.getGoToPreviousPageButton = function(){
      return goToPreviousPage;
    };

    this.getGoToNextPageButton = function(){
      return goToNextPage;
    };

    this.getGoToLastPageButton = function(){
      return goToLastPage;
    };

    this.getPaperNumber =  function(){
      return k_pager_numbers;
    };

    this.getPaperInfo = function(){
      return k_pager_info;
    };
  };
  module.exports = new GridPaperComponentPage();
})();
