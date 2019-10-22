$(function(){
$(".search_keyword").keyup(function()
{
    var search_keyword_value = $(this).val();
    var dataString = 'search_keyword='+ search_keyword_value;
    if(search_keyword_value!='')
    {
        $.ajax({
            type: "POST",
            url: "suggestions.php",
            data: dataString,
            cache: false,
            success: function(html)
                {
                    $("#result").html(html).show();
                }
        });
    }
    else{

      $("#result").fadeOut();
    }

    return false;
});

$(window).click(function() { //hide #result suggestion when click outside
  $("#result").fadeOut();
});

$('#result').click(function(e){

      var $clicked = $(e.target);
      var el = $clicked[0].tagName.toLowerCase();
      if (el == 'strong'){
        $clicked = $clicked.parent();
      }
      else if (el == 'span'){
        $clicked = $clicked.parent();
      }

      var $name = $clicked.find('.posts_details').html();
      var decoded = $("<div/>").html($name).text();
      decoded = decoded.split(":")[1].trim();
      $('#search_keyword_id').val(decoded);


      $("#myForm").submit();

 });

});
