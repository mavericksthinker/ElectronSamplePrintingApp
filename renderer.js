// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
    let list,
     currentPrinter,
     completed;
function init() {
    console.log("Welcome to a Demo of ESCPOS");
    let printerLists = bluetoothList();
    let printerList = document.getElementById('printerlist');
        printerList.remove(0);
    let entry = document.createElement('option');
        entry.text = "select Printer";
        printerList.add(entry);

    for (p=0;p<printerLists.length;p++) {
	    entry = document.createElement('option');
            entry.text = printerLists[p];
	    printerList.add(entry);
        }
    }
    
    function Test_print(){
      bluetoothList();
      list = document.getElementById("printerlist")
      currentPrinter = list.options[list.selectedIndex].text;
      
           text(success,error,"Printing via Electron\n");  
           posCommand(success,error,RESET);
           posCommand(success,error,CENTER);
           posCommand(success,error,SETSIZE(3,3));
           posCommand(success,error,FONTB);
           text(success,error,"Centered\nHeader\n\n"); 
           let lines = []
           lines.push("Some text with the default print settings\n")
           lines.push("0123456789abcdefghijABCDEFGHIJ0123456789abcdefgh\n");
           text(success,error,lines);
           posCommand(success,error,SETSIZE(1,1));
           posCommand(success,error,LEFT);
           posCommand(success,error,FONTA);
           text(success,error,"Normal Text Font A\n");           
           posCommand(success,error,RIGHT);
           posCommand(success,error,FONTB);
           text(success,error,"Right and Font B\n");           
           posCommand(success,error,FONTA);
           posCommand(success,error,LEFT);
           posCommand(success,error,BOLD);
           text(success,error,"This must be important\n");           
           posCommand(success,error,THICKUNDERLINE);
           text(success,error,"Because it is written first in bold letters ant then even undelined\n");           
           posCommand(success,error,NOUNDERLINE);
           posCommand(success,error,NORMAL);
           posCommand(success,error,INVERT_ON);
           text(success,error,"But the world is only Black and White on Thermal Printers\n");           
           posCommand(success,error,INVERT_OFF);
           posCommand(success,error,UPSDOWN_ON);
           text(success,error,"And sometimes upside down\n");           
           posCommand(success,error,UPSDOWN_OFF);
           text(success,error,"I dont speak Greek but it looks nice\n");           
           posCommand(success,error,GREEK_1253);
           text(success,error,"ÖÄÜßüäöÖÄÜßüäö\n");
           posCommand(success,error,FEEDUNITS_ANDPRINT(125));
           text(success,error,"This is a line after 125 motion units \n");           
           //posCommand(success,error,FEEDLINES_ANDPRINT(5));
           //text("This is the end after 5 lines \nand cutting off after 100 Units\n");           
           //posCommand(success,error,CUT_FULL);
           
           completed = print(success,error,currentPrinter);
           if(!completed){
             console.log("Error : "+ESCPOS_ERROR);
           }else{
             console.log("Success : "+ESCPOS_ERROR);
           }           
    }

    Test_Imageprint = async function () {
     
     list = document.getElementById("printerlist")
     currentPrinter = list.options[list.selectedIndex].text;
    //Please change the path to the image files (provide absolute path)
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/square.bmp", 33, true, 127);
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/escposimage.jpg", 33, true, 127);
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/escposimage.bmp", 33, true, 127);
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/escposimage.gif", 33, true, 127);
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/square.jpg", 33, true, 127);
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/square.bmp", 33, true, 127);
    image(success,error,"/home/hottab/Documents/Electronapp/electronPrintApp/square.bmp", 33, true, 127);
    if(print(success,error,currentPrinter)){
       console.log("success");
    }else{
       console.log("Error : "+ESCPOS_ERROR);
    }
}

    function Test_qrcode(){
      list = document.getElementById("printerlist")
      currentPrinter = list.options[list.selectedIndex].text;
    let lines = []
    lines.push("Model 1 QR Code should open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 49, 6, 48))

    lines.push("Model 2 QR Code should open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 50, 6, 48))

    lines.push("Micro QR Code should open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 51, 6, 48))

    lines.push("Micro QR Code size 10 should open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 51, 10, 48))

    lines.push("Micro QR Code size 14 should open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 51, 14, 48))

    lines.push(CENTER)
    lines.push("Micro QR Code size 6 centered\nshould open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 51, 6, 48))

    lines.push(RIGHT)
    lines.push("Micro QR Code size 6 centered\nshould open google.com\n")
    lines.push(qr_Code(success,error,"http://www.google.com", 51, 6, 48))
    text(success,error,lines);
     if(print(success,error,currentPrinter)){
       console.log("success");
    }else{
       console.log("Error : "+ESCPOS_ERROR);
    }
    }

    function Test_barcode(){
    list = document.getElementById("printerlist")
      currentPrinter = list.options[list.selectedIndex].text;
    text(success,error,barcode(success,error,"12345678",70,3,80,0,2));
        var sucess = print(success,error,currentPrinter);
        if(!sucess){
               console.log(ESCPOS_ERROR);
        }           
    }  

   function Test_Full(){
    Test_print();
    Test_Imageprint();
    Test_qrcode();
    Test_barcode();
    test_cut();
   }
   function test_cut(){
   
   list = document.getElementById("printerlist")
   currentPrinter = list.options[list.selectedIndex].text;
   posCommand(success,error,CUT_FULL);
   print(success,error,currentPrinter);
   }

    function success(){
    console.log("Success");
    }
    function error(){
    console.log("Error occured");
    }
