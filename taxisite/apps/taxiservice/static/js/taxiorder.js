$(document).ready(function(){
    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $('form');
        var innercover =  $('.inner.cover');
        $.ajax({
            url: 'taxiorder/',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: form.serialize(),
            timeout: 31000,
            success: function(response){
                    form.remove();

                    var msg = $('<div class="alert alert-black" role="alert"></div>');
                    if (response.is_car) {
                        msg.append("Taxi registration plate: " + response.registration_plate + ". ");
                        msg.append("Will be in: " + response.will_be_in + " minutes. ");
                    } else {
                        msg.append(response.no_car_msg);
                    }

                    innercover.hide().html(msg).fadeIn();
                },
            error: function(request, errorType, errorMessage){
                    form.remove();

                    var msg = $('<div class="alert alert-black" role="alert"></div>');
                    msg.append('Error: ' + errorType + '  with message: ' + errorMessage);

                    innercover.html(msg).fadeIn();
                },
            beforeSend: function(xhr, settings){
                    //set "in progress"
//                   innercover.addClass('in-progress');
                    console.log(form.serialize());
                    console.log(form.serializeArray());

//                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                },
//            complete: function(){
//                    //remove "in progress"
////                    innercover.removeClass('in-progress');
//                }
        });
    });
});