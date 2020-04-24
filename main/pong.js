var Player1,Player2,ball;
var scorePlayer2,scorePlayer1;
var curr_turn=0;
var gameStart=0;
var stepSize=30;
var p1_top,p1_bottom,p2_bottom,p2_top;
var ball_vx=10,ball_vy=10,ball_x,ball_y;
var p_ht,p_wt;

function init()
{
    Player1=document.getElementById("player1");
    Player2=document.getElementById("player2");
    ball=document.getElementById("ball");
    Score2=document.getElementById("score2");
    Score1=document.getElementById("score1");
    
    scorePlayer2=0;
    scorePlayer1=0;

    ball_x=ball.getBoundingClientRect().left;
    ball_y=ball.getBoundingClientRect().top;

    p1_top=Player1.getBoundingClientRect().top;
    p2_top=Player2.getBoundingClientRect().top;

    p_ht= Player1.offsetHeight;
    p_wt=Player1.offsetWidth;  
    b_size=ball.offsetWidth;
}

function keyPress(event)
{
    let key=event.keyCode;
    if(key==13&&gameStart==0)
    {
        gameStart=1;
        return;
    }    
    if(gameStart)
    {
        if(key==38)
        {
            if(p2_top>7)
                p2_top-=stepSize;
            
        }
        else if(key==40)
        {
            if((window.innerHeight-p2_top-p_ht)>7)
                p2_top+=stepSize;
            
        }
        else if(key==87)
        {
            if(p1_top>7)
                p1_top-=stepSize;
        }
        else if(key==83)
        {
            if((window.innerHeight-p1_top-p_ht)>7)
                p1_top+=stepSize;
        }

        Player2.style.top=p2_top+'px'; 
        Player1.style.top=p1_top+'px';
    }
}

function game()
{
    if(gameStart)
    {
        ball_x+=ball_vx;
        ball_y+=ball_vy;
        if(ball_x+b_size>Player2.offsetLeft+5)  //right_side
        {
            if(ball_y+10>=p2_top&&ball_y+b_size<p2_top+p_ht)
                ball_vx=-ball_vx;
            else
            {
                ball_x+=2*stepSize;
                scorePlayer1++;
                Score1.innerText=scorePlayer1;
                ball_x=window.innerWidth/2;
            }
        }
        if(ball_x<Player1.offsetLeft+p_wt+5)  //left
        {
            if(ball_y+10>=p1_top&&ball_y+b_size<p1_top+p_ht)
                ball_vx=-ball_vx;
            else
            {
                ball_x+=10*stepSize;
                scorePlayer2++;
                Score2.innerText=scorePlayer2;
                ball_x=window.innerWidth/2;
            }
        }
        if(ball_y>window.innerHeight-ball.offsetWidth-10)   //down
            ball_vy=-ball_vy;
        if(ball_y<ball.offsetHeight)                        //top
            ball_vy=-ball_vy;

        ball.style.left=ball_x+'px';
        ball.style.top=ball_y+'px';
    }
}


document.addEventListener('keydown',keyPress);
init();
setInterval(game,40);
