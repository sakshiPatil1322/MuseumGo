(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);


document.addEventListener('DOMContentLoaded', function() {
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const ticketsInput = document.getElementById('tickets');

    incrementButton.addEventListener('click', function() {
        let currentValue = parseInt(ticketsInput.value);
        ticketsInput.value = currentValue + 1;
    });

    decrementButton.addEventListener('click', function() {
        let currentValue = parseInt(ticketsInput.value);
        if (currentValue > 0) {
            ticketsInput.value = currentValue - 1;
        }
    });
});


// image dropdown


document.getElementById('imageDropArea').addEventListener('click', function() {
    document.getElementById('imageUpload').click();
});

document.getElementById('imageDropArea').addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#007bff'; // Change border color on drag over
});

document.getElementById('imageDropArea').addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#ddd'; // Revert border color on drag leave
});

document.getElementById('imageDropArea').addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.borderColor = '#ddd'; // Revert border color on drop

    var files = e.dataTransfer.files;

    // Manually set files for input element (for handling drop)
    var input = document.getElementById('imageUpload');
    var dataTransfer = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
        dataTransfer.items.add(files[i]);
    }

    input.files = dataTransfer.files;
});


