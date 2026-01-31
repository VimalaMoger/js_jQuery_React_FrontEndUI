$(document).ready(function(){
    $("button").dblclick(function(){                //html elements with hide function
        //$("h1").hide();
        //$("p").hide();
        //$("#heading2").hide();
        //$("*").hide();//all the elements disappears
        //$(this).hide(); //hide button itself
        $(":button").hide(); //hide the button 
    });
    
    $("p.line2").html("This line will show or hide after the click");

    $("ul li:first").css("background-color", "yellow");

    //$("[href]").html("Welcome to Google page");

    $("tr:odd").css("color", "grey");
    //$("a[target =='_blank']").css("color", "green");
    
    function message(){
      alert("You have visited Milk products");
    }

    //Single event
    //$("#milk").mouseup(message);  //mouseup
    
    //Adding multiple events in jQuery
    $("#milk").on({
        mouseenter: function(){
            $(this).css("background-color", "yellow");
        },
        mouseleave: function(){
            $(this).css("background-color", "pink");
        },
        click: function(){
            $(this).css("background-color", "cyan");
        }
    });

    $("#milk").click(function(){
        alert("You have clicked on Milk products, color changed to pink");            
    });

    //hide - show a text
    $("#hidden").click(function(){
        $(".line2").hide(1000);
    });

    $("#visible").click(function(){
        $(".line2").show(1000);
    });


    //toggle an element
    $("#btn").click(function(){
        $(".line3").toggle(1000);
    });

    //FadeIn - div children
    $("#b1").click(function(){
        $("#one").fadeIn();
        $("#one > #two").fadeIn(4000);
        $("#two > #three").fadeIn(6000);
        $("#three > #four").fadeIn(8000);
    });

    //FadeOut in opposite direction
     $("#b2").click(function(){
        $("#one").fadeOut(8000);
        $("#one > #two").fadeOut(6000);
        $("#two > #three").fadeOut(4000);
        $("#three > #four").fadeOut();
    }); 

    //Fade Toggle
    $("#b3").click(function(){
        $("#one").fadeToggle(8000);
        $("#one > #two").fadeToggle(6000);
        $("#two > #three").fadeToggle(4000);
        $("#three > #four").fadeToggle();
    }); 

    //FadeTo with time and Opacity
    $("#b4").click(function(){
        $("#one").fadeTo(8000, 0.90);
        $("#one > #two").fadeTo(6000, 0.60);
        $("#two > #three").fadeTo(4000, 0.90);
        $("#three > #four").fadeTo(9000, 0.99);
    });

    //slides down
     $("#topbar1").click(function(){
        $("#panel").slideDown(1000);
    });

    //slides up
    $("#topbar2").click(function(){
        $("#panel").slideUp(1000);
    });

    //Toggles
    $("#topbar3").click(function(){
        $("#panel").slideToggle(1000);
    }); 

    //jQuery chaining
    $("#topbar4").click(function(){
        $("#panel").css("background","green")
        .slideUp(1000).slideDown(1000);
    });

    $(function() {
        // Enable draggable functionality
        $("#drag").draggable({
            //containment: "window", // Keep inside the browser window
            scroll: false           // Prevent scrolling while dragging
        });
    });

    //jQuery get content
    $("#button1").click(function(){
        alert($("#milklist").text());
    });

    $("#button2").click(function(){
        alert($("#milklist").html());
    });

    // clear input field
    $('#name').val('');
    //Get content value, capitalize first letter
    $("#getVal").click(function(){
        let text = $("#name").val();
        if(text == ""){
            alert("Please enter your name");
            $('#name').focus();
            return;
        }
	    let capitalized = text.charAt(0).toUpperCase() + text.slice(1);
        alert("Hi there, " + capitalized);
    });

    //Get attribute value
    $("#image").click(function(){
        alert("Image: "+ $("#ref").attr("href"));
    });

    //jQuery Set content-text-html-value
    $("#resetText").click(function(){
        $("#text").html("Your Name: <input type=\"text\" id=\"name\" value=\"\">");
    });

    $("#resetHtml").click(function(){
        $("#text").html("<b>Your Name: <input type=\"text\"</b>");
    });

    $("#resetVal").click(function(){
        $("#name").val("Frank Enstein");
    });
    
    //jQuery set Attributes
    $("#ref2").click(function(){
        $("#ref2").attr("href", "http://www.gmail.com");
    });

    //jQuery Append and Prepend after or before 
    $("#addItem1").click(function(){
        $("#milklist").append("<li>Yogurt</li>");
    });

    $("#addItem2").click(function(){
        $("#milklist").prepend("<li>Cream</li>");
    });

    //insert text before or after
    $("#before").click(function(){
        $("#thumbnail").before("<b>It's an Art</b>");
    });

    $("#after").click(function(){
        $("#thumbnail").after("<b>It's an Art</b>");
    });

    //remove audio
    $("#remove").click(function(){
        $("#audioclip").remove();// or empty() to clear content
    });

    // display date you remember using jQuery and restrict to past dates
    (function(){
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;
        // set the max attribute so the datepicker only allows past dates
        $("#Test_Date").attr("max", todayStr);
    })();

    $("#Test_Date").on("change", function(){
        var selectedDate = $(this).val();
        const max = $(this).attr('max');
        if(selectedDate && max && selectedDate > max){
            $(".output").text("Please select a past date.");
            // revert to max (today)
            $(this).val(max);
            return;
        }
        $(".output").text("You selected the date: " + selectedDate);
    });

    // display date range within 2024
    $(function() {
        $("#dateRangeForm").on("change", function(){
            var startDate  = $("#startDate").val();
            var endDate = $("#endDate").val();
            let startDateObj = new Date(startDate);
            let endDateObj = new Date(endDate);

            // validate inputs    //validate year
            if(startDateObj.getFullYear() == 2024 && endDateObj.getFullYear() == 2024){
                $(".resultDate").text("Your selected year is 2024");
                return;
            } else {
                $(".resultDate").text("Please select dates within a range for 2024.");
                return;
            }
        });    
    });    

    // bootstrap date picker to select date between 2025 and 2030    
    $(function() {
        $('#datepicker').datepicker({
            format: 'mm/dd/yyyy',
            todayHighlight: true,   
            changeMonth: true,      //Adds a month dropdown to quickly jump between months.
            changeYear: true,       //Adds a year dropdown to quickly jump between years.    
            yearRange: "2025:2030", // Adjust as needed
            minDate: 0, // restrict past dates
            maxDate: 1504, // restrict future dates
            autoclose: true
        });
   
        $("#datepicker").on("change", function(){
            var selectedDate = $(this).val();
            $('.bookDate').text("You selected the date: " + selectedDate);
        });
       
    });
    
    //remove sarah/david buttons
    $("#person2").click(function(){
        $("#david").remove();
    });

    $("#person1").click(function(){
        $("#sarah").remove();
    });

    //use CSSStyle
    $(".useCSS").click(function(){
        $("td").addClass("useCSSStyle");
    });

    //remove CSS class
    $(".removeCSS").click(function(){
        $("td").removeClass("useCSSStyle");
    });

    //ToggleCSS
    $(".toggleCSS").click(function(){
        $("td").toggleClass("useCSSStyle");
    });

    //Animate square using left, opacity, height properties
     $("#square1").click(function(){
        $(".stop").prop("disabled", false);
        $("#clk1").hide();
        $("#square1").animate({left: '800px', opacity:0.55, height:"toggle", width:'60px'}, 1000);
    });

    //Animate to bigger size
    $("#square2").click(function(){
        $(".stop").prop("disabled", false);
        $("#clk2").hide();
        $("#square2").animate({left: '800px', opacity:0.25,height:"+=200px", width:"+=200px"}, 1000);
    }); 

    //Queue functionality
    $("#square3").click(function(){
        $(".stop").prop("disabled", false);
        $("#square3").animate({left: '400px', opacity:0.25}, 1000);
        $("#square3").animate({left: '600px', opacity:0.25}, 1000);
        $("#square3").animate({left: '800px', opacity:0.25}, 1000);
    });

    //Stop the animation
    $("#square4").click(function(){
        $(".stop").prop("disabled", false); // Disable the button 
        $("#square4").animate({left: '1500px', opacity:0.25}, 5000);
    });

    // Stop button to stop the rolling square animation
    $(".stop").click(function(){
        $("#square1, #square2, #square3, #square4").stop();
        alert("The square stopped rolling!")
    });

    // Mouse coordinates: display X and Y coordinates on mouse move
    (function(){
        const coordinatesElem = document.getElementById('coordinates');
        if (!coordinatesElem) return;

        document.addEventListener('mousemove', function(event) {
            console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
            coordinatesElem.textContent = `Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`;
        });
    })();

    // Get the audio element and set volume to 10%
    (function(){
        const audioElement = document.getElementById("myAudio");
        if (audioElement) {
            try {
                audioElement.volume = 0.1;
            } catch (e) {
                // ignore if browser blocks setting volume
                console.warn('Unable to set audio volume', e);
            }
        }
    })();

    //view image
    $("#viewImage").click(function(){
        const imgSrc = $("#thumbnail").attr("src");
        const imgWindow = window.open("", "Image", "width=600,height=400");
        imgWindow.document.write(`<img src="${imgSrc}" alt="Art Image" class="img-full">`);
    });

    $(document).ready(function() {
        // Apply hover effect
        $("#hoverBox").hover(
        function() {
        // Mouse enters
            $(this).css({
                "background-color": "orange",
                "color": "white"
            }).text("Mouse is here!");
            },
        function() {
        // Mouse leaves
            $(this).css({
                "background-color": "lightblue",
                "color": "black"
            }).text("Hover over me");
        }
        );
    });
});