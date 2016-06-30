$(document).ready(function(){
    $('form').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            phone_number: {
                required: true,
                minlength: 3,
                pattern: '[+(]?[+(]?[0-9- ]+[)]?[0-9- ]+'
            }
        },
        messages: {
            phone_number: {
                pattern: "Phone number is incorrect."
            }
        }
    });
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


                    if (response.is_car) {
                        var msg = $('<div class="alert alert-green" role="alert"></div>');
                        msg.append("<p>Taxi registration plate: " + response.registration_plate + ".</p>");
                        msg.append("<p>Will be in: " + response.will_be_in + " minutes.</p>");
                    } else {
                        var msg = $('<div class="alert alert-red" role="alert"></div>');
                        msg.append(response.no_car_msg);
                    }

                    innercover.hide().html(msg).fadeIn();
                },
            error: function(request, errorType, errorMessage){
                    form.remove();

                    var msg = $('<div class="alert alert-red" role="alert"></div>');
                    msg.append('Error: ' + errorType + '  with message: ' + errorMessage);

                    innercover.html(msg).fadeIn();
                },
            beforeSend: function(xhr, settings){
                    innercover.waitMe({
                        effect : 'bounce',
                        text : '',
                        bg : 'rgba(51,51,51, 0.7)',
                        color : '#fff'
                    });
                },
            complete: function(){
                    innercover.waitMe('hide');
                }
        });
    });
});