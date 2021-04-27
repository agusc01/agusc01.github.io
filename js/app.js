window.addEventListener("load",
function () 
{
    let defaultTextTerminal = "guest-user@pc-agustin:/$ ";
    document.querySelector("#default-text").innerHTML=defaultTextTerminal;
    let terminalWindow = document.querySelector("#terminal-window");
    let terminalText = document.querySelector("#terminal-text");
    let commandText  = document.querySelector("#command-text");
    let inputText = document.querySelector("#input-text");

    //addEventListener =========================================================
    terminalWindow.addEventListener("click",startTerminal,false);
    inputText.addEventListener("input",writeInConsole,false);


    //functions ================================================================
    function startTerminal()
    {
        inputText.focus();    
    }

    function writeInConsole()
    {
        let currentText;
        let newText;
        let length;
        let currentCommand;

        currentText = commandText.innerHTML.split("\n");
        newText = "";
        length = currentText.length-1;
        
        //for no clean the screen when your insert a new character
        for (x=0; x<length; x++)
        {
            newText += currentText[x] + "\n";
        }

        currentCommand = inputText.value.toLowerCase() //with this always write in lowercase
        newText += defaultTextTerminal + currentCommand + "█";
        commandText.innerHTML = newText;
    }


    //function calls ===========================================================












}
,false);//end window.addEventListener("load",