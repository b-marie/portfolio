$(document).ready(function(){
$("#quoteButton").on("click", function(e){
  e.preventDefault();
  $.ajax( {
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
          var post = data.shift(); 
          $('#quote-title').text(post.title);
          $('#quote-content').html(post.content);
          //tweet quote
            $('a[data-text]').each(function(){
              $(this).attr('data-text', post.content + " - " + post.title);
              });
              $.getScript('http://platform.twitter.com/widgets.js');
          // If the Source is available, use it. Otherwise hide it.
          if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
            $('#quote-source').html('Source:' + post.custom_meta.Source);
          } else {
            $('#quote-source').text('');
          }
        },
        cache: false

});
});
});

