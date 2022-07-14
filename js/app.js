 
let defacultTextTerminal = "guest-user@pc-agustin:/$ ";
document.querySelector("#default-text").innerHTML = defacultTextTerminal;
let terminalWindow = document.querySelector("#terminal-window");
let terminalText = document.querySelector("#terminal-text");
let commandText = document.querySelector("#command-text");
let dummyTextInput = document.querySelector("#dummy-text-input");
let body = document.querySelector("body");
let fixBugFirstCommand = true; //pending task, to fix this bug. Now it's a feature LOL
let blickState = false;

commands = 
{
    "help" : "Available commands\n\twhoami\n\tuname -o\n\tskills\n\tdate\n\tbash --version\n\tlogo\n\tpwd\n\thack-nasa --later\n\thack-nasa --now",
    "whoami" : "My name is Agustin. I love coding",
    "uname -o" : "GNU/Linux",
    "skills" : "python, c, bash, vanilla javascript, PHP & MySQL",
    "bash --version" : "CV bash, version 0.0.1\n<a href='http://gnu.org/licenses/gpl.html' target='__blank'>License GPLv3+: GNU GPL version 3 or later</a>\nThis is free software; you are free to change and redistribute it",
    "logo" : "                          ./+o+-     \n                  yyyyy- -yyyyyy+     \n               ://+//////-yyyyyyo     \n           .++ .:/++++++/-.+sss/`     \n         .:++o:  /++++++++/:--:/-     \n        o:+o+:++.`..```.-/oo+++++/    \n       .:+o:+o/.          `+sssoo+/   \n  .++/+:+oo+o:`             /sssooo.  \n /+++//+:`oo+o               /::--:.  \n \+/+o+++`o++o               ++////.  \n  .++.o+++oo+:`             /dddhhh.  \n       .+.o+oo:.          `oddhhhh+   \n        \+.++o+o``-````.:ohdhhhhh+    \n         `:o+++ `ohhhhhhhhyo++os:     \n           .o:`.syhhhhhhh/.oo++o`     \n               /osyyyyyyo++ooo+++/    \n                   ````` +oo+++o\:    \n                          `oo++.      \n",
    "pwd" : "/",
    "hack-nasa --later" : "Ok, We'll hack NASA later...\n",
    "hack-nasa --now" : "It's not posible now, try later...\n",
}

dummyTextInput.addEventListener('input',writeInConsole,false);


function runCommand(command)
{
    let commandOutput=commands[command];
    
    if(commandOutput == undefined)
    {
        commandOutput = command+ ": command not found\n";
    }
    else
    {
        commandOutput = commandOutput + "\n";
    }
    return commandOutput
}

function writeInConsole()
{
    let currentText;
    let newText;
    let length;
    let currentCommand;

    currentText = commandText.innerHTML.split("\n");
    newText = "";

    if(fixBugFirstCommand==true)
    {
        length = currentText.length-2;
        fixBugFirstCommand=false;
    }
    else
    {
        length = currentText.length-1;
    }
    
    //for no clean the screen when your insert a new character
    for (x=0; x<length; x++)
    {
        newText += currentText[x] + "\n";
    }

    currentCommand = dummyTextInput.value.toLowerCase() //with this always write in lowercase

    newText += defacultTextTerminal + currentCommand + "█";

    commandText.innerHTML = newText;
    
}

dummyTextInput.addEventListener("keyup", 
    function(event)
    {
        if(event.keyCode==13)//if press enter
        {
            let currentText;
            let currentCommand;
            
            currentText = commandText.innerHTML.replace("█","").split("\n");
            currentCommand = currentText[currentText.length - 1].replace(defacultTextTerminal, "").trim();
            
            switch (currentCommand) 
            {
                case "clear":
                    commandText.innerHTML=defacultTextTerminal;
                    break;
                case "exit":
                case "logout":
                    closeTerminal();
                    break;            
                default:
                    let command;
                    let newText;
        
                    if(currentCommand == "date")
                    {
                        command = new Date() + "\n";
                    }
                    else
                    {
                        command = runCommand(currentCommand);
                    }
        
                    newText = commandText.innerHTML.replace("█","") + "\n";
                    newText += command + defacultTextTerminal + "█";
        
                    commandText.innerHTML = newText;
                    break;
            }
            
            console.log("Command to execute: " + currentCommand);
            dummyTextInput.value="";//clean last command to be ready to the next command

        }
    }
,false);

body.addEventListener("keyup",
    function(event)
    {
        if(event.key == 't' && terminalWindow.style.opacity == "" )
        {
            openTerminal();
        }
    }
,false);

writeInConsole();//fixed first blinkCursor (if it doesn't appear, the first blick position is incorrect, and the text too)
function blinkCursor()
{
    let currentText = commandText.innerHTML.replace("█","")
    if(blickState)
    {
        currentText += "█";
    }
    commandText.innerHTML = currentText;
    blickState = !blickState;
}

setInterval(blinkCursor, 700);

dummyTextInput.focus();

terminalWindow.addEventListener("click",
    function ()
    {
        dummyTextInput.focus();
    },
false);


function closeTerminal()
{
    // terminalWindow.classList.remove('show');
    terminalWindow.classList.add('hide');
}

function openTerminal()
{
    writeInConsole();
    terminalWindow.classList.add('show');
    terminalWindow.classList.remove('hide');
    terminalWindow.classList.remove('show');
    dummyTextInput.focus();
}


