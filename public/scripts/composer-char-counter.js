$(document).ready(function() {
  $("textarea").on('keyup',function(){ 
    const counter = $(this).closest('form').find('.counter');
    const count = 140 - $(this).val().length;
    counter.html(count);
    if (count < 0) {
      counter.addClass('negative');
    }
  })
});