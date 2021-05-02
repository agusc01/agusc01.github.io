window.addEventListener("load",
function () 
{
    const defaultTextTerminal = "guest-user@pc-agustin:/$ ";
    document.querySelector("#default-text").innerHTML=defaultTextTerminal;
    const terminalWindow = document.querySelector("#terminal-window");
    const allTextInTheTerminal  = document.querySelector("#command-text");
    const inputCommand = document.querySelector("#input-text");
    const closeButton = document.querySelector("#close-terminal");
    const body = document.querySelector("body");
    let   displayTerminal = true;

    commands = {
                 "help" : "Available commands... ",
                 "whoami" : "My name's Agustin."
                }



    //addEventListener =========================================================
    terminalWindow.addEventListener("click",startTerminal,false);
    inputCommand.addEventListener("input",writeInConsole,false);
    inputCommand.addEventListener("keyup",writingInCosole,false);
    closeButton.addEventListener("click",closeTerminal,false);
    body.addEventListener("keyup",openTerminal,false);

    //functions ================================================================
    function startTerminal()
    {
        inputCommand.focus();    
    }

    function writeInConsole()
    {
        let currentText;
        let newText;
        let length;
        let currentCommand;

        currentText = allTextInTheTerminal.innerHTML.split("\n");
        newText = "";
        length = currentText.length-1;
        
        //for no clean the screen when your insert a new character
        for (x=0; x<length; x++)
        {
            newText += currentText[x] + "\n";
        }

        currentCommand = inputCommand.value.toLowerCase() //with this always write in lowercase
        newText += defaultTextTerminal + currentCommand + "█";
        allTextInTheTerminal.innerHTML = newText;
    }

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

    function writingInCosole(e)
    {
        if(e.keyCode==13)//if press enter
        {
            let currentText;
            let currentCommand;

            currentText = allTextInTheTerminal.innerHTML.replace("█","").split("\n");
            currentCommand = currentText[currentText.length - 1].replace(defaultTextTerminal, "").trim();

            switch (currentCommand) 
            {
                case "clear":
                    allTextInTheTerminal.innerHTML=defaultTextTerminal;
                break;
                
                case "logout":
                case "exit":
                    closeTerminal();
                    break;

                default:
                    let command;
                    let newText;

                    command = runCommand(currentCommand);
        
                    newText = allTextInTheTerminal.innerHTML.replace("█","") +"\n";
                    newText += command + defaultTextTerminal + "█";
        
                    allTextInTheTerminal.innerHTML = newText ;
                    break;
            }
            inputCommand.value="";//clean the last commnad
        }
    }


    function closeTerminal()
    {
        terminalWindow.classList.add("close-terminal");
        displayTerminal=false;
    }

    function openTerminal(event)
    {
        if(displayTerminal == false && event.key == 't')
        {
            displayTerminal=true;
            terminalWindow.classList.remove("close-terminal");
            inputCommand.value="";//for security is you open the terminal and you're inputCommand.focus()
            startTerminal();
            writeInConsole();//fix bug "show t when open the terminal"
        }
    }

    //function calls ===========================================================













}
,false);//end window.addEventListener("load",