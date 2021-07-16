/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */
$(document).ready(function() {

  // Function to prevent Cross-Site Scripting:
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

// Function: takes in a tweet object and return it in HTML
  const createTweetElement = postObj => {
    let output = ""
    output += `<article class="tweet">
                <header>
                  <div class="tweets-details">
                  <img class="tweets-img" src=${escape(postObj.user.avatars)}> 
                  <span class="tweeter-name">${escape(postObj.user.name)}</span>
                  </div>
                  <a class="tweeter-handle">${escape(postObj.user.handle)}</a>
                </header>
                <p class="tweet-content">${(postObj.content.text)}</p>
                <footer class="footer"> ${timeago.format(escape(postObj.created_at))} 
                  <a class="icon">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </footer>

              </article>`

    return output
  };

  // Function: takes an array of tweet objects and append each to the #tweets-container in HTML
  const renderTweets = tweetsArray => {
    $("#tweets-container").empty();
    for (const key in tweetsArray) {
      const $tweet = createTweetElement(tweetsArray[key]);
      $('#tweets-container').prepend($tweet);
    }
  }

  // Function to fetch tweets from /tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET' 
    })
    .then(function (data) {
        renderTweets(data);
    })

  }
  loadTweets();

  //submit tweets
  $("#form_submit").submit(function(event) {
     // prevent the default behaviour to leave the page
    event.preventDefault();
    $('.tweet-error').hide()
    const inputLength = $(this).children('textarea').val().length;
    // Validates that tweet length is <= 140 characters before submitting it
    if(inputLength >140) {                                     
      $(this).each(function() {
        $('.tweet-error').text("Sorry, content exceeds the 140 character limit").slideDown("slow");
      });
    } else if (inputLength === 0) {  //verify that the input is not empty                                                    
        $(this).each(function() {
          $('.tweet-error').text("Tweet is empty").slideDown("slow");});
    } else {
      $('.tweet-error').hide();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).then(function(data) {
         loadTweets();
      })
      $(this).children('textarea').val('');
      $(this).find(".counter").text('140');                               

  }

  });
});