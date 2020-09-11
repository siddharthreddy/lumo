/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

    sendStartupEvents();

    var events = []
    
    
    window.addEventListener(
      "message",
      event => {
          events.push(event.data);
          document.getElementById("eventPrintout").innerHTML = JSON.stringify(events, null, 4);
      },
      false
    )
    
    
    function sendStartupEvents() {
      let initEvent = { type: 'initialized' , data: null};
      this.sendMessage(initEvent);
      
      let sizeEvent = { type: 'sizeChange', data: { height: 400}} 
      this.sendMessage(sizeEvent);
      
    }
    
    
    function sendMessage(event , origin = "*") {
        // web
        if (window.parent !== window) {
            window.parent.postMessage(event, origin);
        }
        // android
        else if (((window).Android)) {
            ((window).Android).sendMessage(JSON.stringify(event));
        }
        // ios
        else if ((window).webkit && (window).webkit.messageHandlers && (window).webkit.messageHandlers.upscaleHandler) {
            (window).webkit.messageHandlers.upscaleHandler.postMessage(JSON.stringify(event));
        }
        else {
            console.log('no send method detected');
        }
    }
    