class Starter
  constructor: (options = {}) ->
    @options = _.extend(
      debug: true
    , options)

  log: (what) -> if @options.debug is on then console.log(what) else console.log('Debug mode is off!')

  exists: (el) -> $(el).length > 0

  init: () ->
    Starter.updateBag()
    @setupLayout()
    @setupEvents()
    return

  @updateBag:() ->
    $shoppingBag = $('#shopping-bag')
    $bagContainer = $('#bag')

#    Get items
    totalItems = $bagContainer.children('.product').length
    $shoppingBag.attr('data-quantity', totalItems)
    $shoppingBag.find('.shopping-bag__quantity strong').text(totalItems)

#    Get total price
    finalPrice = 0
    $bagContainer.find('.product-info__price strong').each ->
      getItemPrice = $(this).text().substring(1)

      itemPrice = parseFloat(getItemPrice.split(','), 10)

      finalPrice += itemPrice

    console.log 'finalPrice', finalPrice
    $shoppingBag.attr('data-price', finalPrice)
    $shoppingBag.find('.shopping-bag__totalprice strong').text('£ ' + finalPrice)

    return

  setupLayout: () ->
    console.log 'setupLayout'

    return

  setupEvents: () ->
#    Add / Remove item
    $('.button-bag').on 'click', @addToBasket
    return

  addToBasket: () ->
    $this = $(this)
    $thisProduct = $this.parent()
    $bagContainer = $('#bag')
    $listContainer = $('#list')

    if $('#bag .product').length-1 == 0
      $bagContainer.append('<p class="message">' + $bagContainer.data('empty') + '</p>')
    else
      $bagContainer.children('p').remove()

    if !$(this).hasClass('add-basket')
      $(this).addClass('add-basket').text($this.data('remove'))
      $thisProduct.appendTo($bagContainer)

    else
      $(this).removeClass('add-basket').text($this.data('add'))
      $thisProduct.appendTo($listContainer)

    Starter.updateBag()
    return

(($) ->
  'use strict'
  $ ->
    starter = new Starter();
    starter.init();

) jQuery

# ---
