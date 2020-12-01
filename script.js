//Store the queue element and its priority
class QElement{
    constructor(element,priority){
        this.element = element;
        this.priority = priority;
    }

    printQEle()
    {
        var str = this.element + this.priority.toString();
        return str;
    }
}

//PriorityQueue Class
class PriorityQueue{
    constructor(){
        this.items = [];
        this.size = 0;
        this.totalTime = 0;
    }

    //add element to the queue as per priority
    enqueue(element,priority)
    {
        var qEle = new QElement(element,priority);
        
        for(var i = 0; i < this.size; i++){
            if (this.items[i].priority > qEle.priority){
                this.items.splice(i,0,qEle);
                this.size++;
                this.totalTime = this.totalTime + parseInt(priority);
                return;
            }
        }

        this.size++;
        this.totalTime = this.totalTime + parseInt(priority);
        this.items.push(qEle);

    }

    //remove element from the queue
    dequeue()
    {
        if(this.isEmpty())
        {
            console.log("Underflow");
        }
        this.size--;
        return this.items.shift();
    } 
    
    front()
    {
        if (this.isEmpty())
        {
            return "No elements in Queue";
        }
        return this.items[0];
    }

    rear()
    {
        if(this.isEmpty())
        {
            return "No elements in Queue";
        }
        return this.items[this.size -1];
    }

    isEmpty()
    {
        return this.size == 0;
    }

    printPQueue()
    {
        var str = "";
        var str1 = "";
        var text = "";
        for(var i = 0; i < this.size; i++)
        {
            str = this.items[i].element.data;
            str1 = this.items[i].priority.toString();
            text += str + " " + str1 + " ";
        }
        return text;
    }
}

window.onload = function() {
    var form = document.forms;
    f = form[0];

    f.addEventListener("submit",function(e){
        e.preventDefault();
    });
    
    var priorityQ = new PriorityQueue();

    var button = document.querySelector("#addRow");

    button.addEventListener("click",function(event){
        var text = document.querySelectorAll("input[type=text]");
        var number = document.querySelectorAll("input[type=number]");
        var tbodyRef = document.getElementById('tbl').getElementsByTagName('tbody')[0];

        var newRow = tbodyRef.insertRow();
        var newCell = newRow.insertCell();
        var newCell1 = newRow.insertCell();
        var newCell2 = newRow.insertCell();

        var newText = document.createTextNode(text[0].value);
        var newText1 = document.createTextNode(number[0].value.toString());
        var newText2 = document.createTextNode(" ");

        newCell.appendChild(newText);
        newCell1.appendChild(newText1);
        newCell2.appendChild(newText2);

        priorityQ.enqueue(newText,number[0].value);
        
        console.log("Current State of Queue");
        console.log(priorityQ.printPQueue());
        console.log("----------------------------------");

        var frm = document.querySelector("#form");
        frm.reset();

        var timer = document.querySelector("#timer");
        timer.innerHTML = priorityQ.totalTime;
    });

    var button1 = document.querySelector("#delRow");
    button1.addEventListener("click",function(event){
        var table = document.querySelector('tbody');
        table.deleteRow(1);

        console.log("Deleted item from row");
    });

    var button2 = document.querySelector("#exe");
    button2.addEventListener("click",function(event){
        var completed = 0;
        var tbodyRef = document.getElementById('tbl').getElementsByTagName('tbody')[0];
        
        var tab = document.getElementById('tbl1');

        tbodyRef.deleteRow(0);
        console.log("");
        console.log("");
        console.log("-----Simulating Now-----");

        var rows = tbodyRef.querySelectorAll('tr');
        var cell = rows[0].querySelectorAll('td')[0];
        var s = priorityQ.size;

        
        thead = tab.getElementsByTagName('thead')[0];
        var newRow = thead.insertRow();
        tbody = tab.getElementsByTagName('tbody')[0];
        newRow1 = tbody.insertRow();

        for(var i = 0;i<s;i++)
        {
            pName = priorityQ.front().element.data;
            for(var j = 0;j<rows.length;j++ ){
                var cell = rows[j].querySelectorAll('td')[0];
                if(cell.innerHTML == pName)
                {
                    var hold = priorityQ.front().priority;
                    completed += parseInt(hold);
                    rows[j].querySelectorAll('td')[2].innerHTML = completed ;
                    
                    //Animation
                    
                    var newCell = newRow.insertCell();
                    var newText = document.createTextNode(pName);
                    newCell.appendChild(newText);
                    var cWidth = 50 * hold;
                    newCell.width = cWidth.toString()+'px';

                    
                    newCell = newRow1.insertCell();
                    newText = document.createTextNode(hold.toString());
                    newCell.appendChild(newText);
                    cWidth = 20 * hold;
                    newCell.width = cWidth.toString()+'px';
                }
            }
    
            console.log("Popped from Queue");
            console.log(priorityQ.front().element.data, priorityQ.front().priority);
            console.log("----------------------------");
            priorityQ.dequeue();
            
        }


    });
    
}

