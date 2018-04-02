var res = [];
var html = '';

function obj(title, snippet, extract) {
	this.title = title;
	this.snippet = snippet;
	this.extract = extract;
}

$("#random").on('click', function(){
     $('.search').css('margin-top', '5%');
     $.ajax( {
     	url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&generator=random&redirects=1&exchars=200&exlimit=1&explaintext=1&grnnamespace=0&grnlimit=1",
    		dataType: 'jsonp',
    		type: 'POST',
    	success: function(data) {
       		console.log(data);
       		$(".searchResults").empty();
       		for (var object in data.query.pages) break;
       			console.log(object);
       		console.log(data.query.pages[object]);
       		var resArr = data.query.pages[object];
       			res.push(new obj(resArr.title, resArr.extract));
       			$('.search').css('margin-top', '5%');
       			html = '<div class="clickedClass"><a href="https://en.wikipedia.org/wiki/' + resArr.title + '"target="_blank"><h3>' + resArr.title + '</h3></a><br><p>' + resArr.extract + '</p></div>';
       			$(".searchResults").append(html);
    		}
     })
});


$("input").keypress(function(e) {
	//get data from search
	if(e.which == 13) {
		var searchVal = $(this).val();
		$.ajax( {
    		url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + searchVal,
    		dataType: 'jsonp',
    		type: 'POST',
    		headers: { 'Api-User-Agent': 'Example/1.0' },
    	success: function(data) {
       		console.log(data);
       		console.log(data.query.search);
       		$(".searchResults").empty();
       		var resArr = data.query.search;
       		for (var r = 0; r < 10; r++) {
       			res.push(new obj(resArr[r].title, resArr[r].snippet));
       			$('.search').css('margin-top', '5%');
       			html = '<div class="clickedClass"><a href="https://en.wikipedia.org/wiki/' + resArr[r].title + '"target="_blank"><h3>' + resArr[r].title + '</h3></a><br><p>' + resArr[r].snippet + '...</p></div>';
       			$(".searchResults").append(html);
       		}
    		}
		});
	}
});