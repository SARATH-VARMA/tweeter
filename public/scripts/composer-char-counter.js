//count characters in the tweets input form
$(document).ready(function() {
  $("textarea").on('keyup',function(){ 
    const counter = $(this).closest('form').find('.counter');
    //count the number of characters that can be entered
    const count = 140 - $(this).val().length;
    counter.html(count);
    // Add an "negative" class to textarea if limit is reached
    if (count < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  })
});