/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const createTweetElement = postObj => {
    let output = ""
    output += `<article class="tweet">
                <header>
                  <img class="tweets-img" src=${postObj.user.avatars}> 
                  <span class="tweeter-name">${postObj.user.name}</span>
                  <a class="tweeter-handle">${postObj.user.handle}</a>
                </header>
                <p class="tweet-content">${postObj.content.text}</p>
                <footer class="footer"> ${timeago.format(postObj.created_at)} 
                  <a class="icon">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a>
                </footer>

              </article>`

    return output
  };
  const renderTweets = tweetsArray => {
    $("#tweets-container").empty();
    for (const key in tweetsArray) {
      const $tweet = createTweetElement(tweetsArray[key]);
      $('#tweets-container').prepend($tweet);
    }
  }
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

  $("#form_submit").submit(function(event) {
     // prevent the default behaviour to leave the page
    event.preventDefault();
    const inputLength = $(this).children('textarea').val().length;
    if(inputLength >140) {                                     
      $(this).each(function() {
        alert("Sorry, content exceeds the 140 character limit");
      });
    } else if (inputLength === 0) {                            
        $(this).each(function() {
          alert("Tweet is empty");
        });
    } else {
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