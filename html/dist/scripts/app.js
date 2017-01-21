var Starter;

Starter = (function() {
  function Starter(options) {
    if (options == null) {
      options = {};
    }
    this.options = _.extend({
      debug: true
    }, options);
  }

  Starter.prototype.log = function(what) {
    if (this.options.debug === true) {
      return console.log(what);
    } else {
      return console.log('Debug mode is off!');
    }
  };

  Starter.prototype.exists = function(el) {
    return $(el).length > 0;
  };

  Starter.prototype.init = function() {
    Starter.updateBag();
    this.setupLayout();
    this.setupEvents();
  };

  Starter.updateBag = function() {
    var $bagContainer, $shoppingBag, finalPrice, totalItems;
    $shoppingBag = $('#shopping-bag');
    $bagContainer = $('#bag');
    totalItems = $bagContainer.children('.product').length;
    $shoppingBag.attr('data-quantity', totalItems);
    $shoppingBag.find('.shopping-bag__quantity strong').text(totalItems);
    finalPrice = 0;
    $bagContainer.find('.product-info__price strong').each(function() {
      var getItemPrice, itemPrice;
      getItemPrice = $(this).text().substring(1);
      itemPrice = parseFloat(getItemPrice.split(','), 10);
      return finalPrice += itemPrice;
    });
    console.log('finalPrice', finalPrice);
    $shoppingBag.attr('data-price', finalPrice);
    $shoppingBag.find('.shopping-bag__totalprice strong').text('£ ' + finalPrice);
  };

  Starter.prototype.setupLayout = function() {
    console.log('setupLayout');
  };

  Starter.prototype.setupEvents = function() {
    $('.button-bag').on('click', this.addToBasket);
  };

  Starter.prototype.addToBasket = function() {
    var $bagContainer, $listContainer, $this, $thisProduct;
    $this = $(this);
    $thisProduct = $this.parent();
    $bagContainer = $('#bag');
    $listContainer = $('#list');
    if ($('#bag .product').length - 1 === 0) {
      $bagContainer.append('<p class="message">' + $bagContainer.data('empty') + '</p>');
    } else {
      $bagContainer.children('p').remove();
    }
    if (!$(this).hasClass('add-basket')) {
      $(this).addClass('add-basket').text($this.data('remove'));
      $thisProduct.appendTo($bagContainer);
    } else {
      $(this).removeClass('add-basket').text($this.data('add'));
      $thisProduct.appendTo($listContainer);
    }
    Starter.updateBag();
  };

  return Starter;

})();

(function($) {
  'use strict';
  return $(function() {
    var starter;
    starter = new Starter();
    return starter.init();
  });
})(jQuery);
