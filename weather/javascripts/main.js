(function($) {
    $('[data-action=send]').on('click', function(event) {
        event.preventDefault();
        
        // toggle views
        $('[data-action]').addClass('hide');
        $('[data-action=sending]').removeClass('hide').addClass('disabled');    
        
        var message = $("#message").val();
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'http://localhost:3000/send/' + message,
            complete: function(jqXHR, textStatus) {
                 $('[data-status]').addClass('hide');
                 $('[data-status=sent]').removeClass('hide'); 
                
                // reset views
                $('[data-action]').addClass('hide');
                $('[data-action=send]').removeClass('hide');   
            }
        });
    });
    
	$.ajax({
		dataType: 'json',
		url: 'http://api.openweathermap.org/data/2.5/weather?q=Taipei',
	    success: function(response, jqXHR, textStatus) {
            var data = [];
            var obj = {};
            
            
            obj.temp = response.main.temp;
            obj.pressure = response.main.pressure;
            obj.humidity = response.main.humidity;
            obj.temp_min = response.main.temp_min;
            obj.temp_max = response.main.temp_max;
            
            obj.cityname = response.name;
            
            obj.country = response.sys.country;
            obj.sunrise = response.sys.sunrise;
            obj.sunset = response.sys.sunset;
            obj.clouds = response.clouds.all;
            obj.windspeed = response.wind.speed;

            
            // Weather Icons
            switch (response.weather[0].main) {
                case "Clouds": obj.weatherIcon = "wi-day-cloudy";
            }
            
            // Celsius
            obj.temp_celsius = parseInt(response.main.temp - 273.15);
            obj.temp_min_celsius = parseInt(response.main.temp_min - 273.15);
            obj.temp_max_celsius = parseInt(response.main.temp_max - 273.15);
            
            data.push(obj);
            
			$('#postTemplate')
				.tmpl(data)
				.appendTo('#content');            
	    },
	    complete: function(jqXHR, textStatus) {
            $('#board').createWebSocket({
                // SPA Principle: use callback
                onmessage: function() {
                    $('.timestamp').each(function() {
                        var me = $(this);
                        var timestamp = me.html();

                        me.html(moment(timestamp).fromNow());
                    });
                }
            });
	    }
	});
}) ($);
