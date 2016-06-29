$(document).ready(function(){
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var innercover =  $('.inner.cover');
        $.ajax({
            url: 'taxiorder/',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: form.serialize(),
            timeout: 3000,
            success: function(response){
                    form.remove();

                    var msg = $("<p></p>");
                    msg.append("Destination: " + result.location + ". ");
                    msg.append("Price: " + result.totalPrice + ". ");

                    innercover.hide().html(msg).fadeIn();
                },
            error: function(request, errorType, errorMessage){
                    form.remove();

                    var msg = $('<div class="alert alert-black" role="alert"></div>');
                    msg.append('Error: ' + errorType + '  with message: ' + errorMessage);

                    innercover.html(msg).fadeIn();
                },
//            beforeSend: function(){
//                    //set "in progress"
////                   innercover.addClass('in-progress');
//                },
//            complete: function(){
//                    //remove "in progress"
////                    innercover.removeClass('in-progress');
//                }
        });
    });
});