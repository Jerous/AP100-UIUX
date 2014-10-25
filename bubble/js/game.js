/**
* Created with first HTML5.
* User: leonlin14
* Date: 2014-10-05
* Time: 02:36 AM
* To change this template use Tools | Templates.
*/
var gameModule = (function() {
    var ballX = 100
      , ballY = 100
      , ballR = 50;

    var maxWidth
      , maxHeight
      , maxR;

    function start() {
        var canvas = document.getElementById("draw");

        var ctx = canvas.getContext("2d");

        var background = Sizzle('#game')[0],
            rect = background.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.width;

        maxWidth = rect.width;
        maxHeight = rect.height;
        maxR = (rect.height > rect.width) ? rect.width / 2 : rect.height / 2;

        ballX = Math.floor(Math.random() * maxWidth);
        ballY = Math.floor(Math.random() * maxHeight);
        ballR = Math.floor(Math.random() * maxR) + 30;

        ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2, true);
        // create radial gradient
        var grd = ctx.createRadialGradient(ballX, ballY, ballR, 1.5*ballX, 1.5*ballY, ballR/2);
        // light blue
        grd.addColorStop(1, '#8ED6FF');
        // dark blue
        grd.addColorStop(0, '#004CB3');
        ctx.fillStyle = grd;
        ctx.fill();
        
        //light line
        ctx.beginPath() ;
        ctx.lineCap = "round";
        ctx.arc(ballX, ballY, ballR / 1.5, 1 * Math.PI, 1.2 * Math.PI, false) ;
        ctx.lineWidth = ballR / 5;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
        
        //light point
        ctx.beginPath() ;
        ctx.lineCap = "round";
        ctx.arc(ballX, ballY, ballR / 1.5, 1.33 * Math.PI, 1.35 * Math.PI, false) ;
        ctx.lineWidth = ballR / 5;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
        
        
        //ctx.fillStyle = 'black';
        //ctx.beginPath();
        //ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2, true);
        //ctx.fill();

        $("#game").on('click', function(event) {
            touchEvent(event);
        });

        console.log('Start Game');
    }

    function touchEvent(evt) {
        console.log('clicked: ' + evt.clientX + " , " + evt.clientY);

        var x1, 
            x2,
            y1,
            y2;

        // 四個角
        x1 = ballX - ballR;
        x2 = ballX + ballR;		
        y1 = ballY - ballR;
        y2 = ballY + ballR;	

        // 是否擊中
        if ((evt.clientX > x1) && (evt.clientX < x2)) {
            if ((evt.clientY > y1) && (evt.clientY < y2)) {
                $("#header").css('display', 'none');
                $('#header').html('<h2>打到了</h2>');
                $("#header").fadeIn(500);
            }
        }
    }
    
    return {
        gameStart: start
    }
}) ();