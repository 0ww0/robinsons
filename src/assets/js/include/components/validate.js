(function(){

    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
    }

    $("#js-contact-form").validate({
        rules: {
            'first-name': { required: true },
            'last-name': { required: true },
            email: { required: true , email: true },
            phone: { required: true, digits: true, minlength: 8, maxlength: 12 },
            'robinsons-card-number': { required: true }
        },
        messages: {
            'first-name': 'Please enter your First Name',
            'last-name': 'Please enter your Last Name',
            email: "Please enter a valid Email",
            phone: "Please enter your Phone Number",
            'robinsons-card-number': 'Please enter your Robinsons Card Number'
        },
        errorPlacement: function (error, element) {
            error.addClass("help-block");


            // if (element.hasClass('multiselect')) {
            //     error.insertAfter(element.parent());
            // } else {
            //     error.insertAfter(element);
            // }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-success").removeClass("has-error");
        }
    });

    $("#js-contact-form").on('submit', function(e){
        e.preventDefault();
        var $form = $(this);
        if(!$form.valid()){
            return;
        }
    });


    $('.other-special input[type=checkbox]').change(function(){
        if($(this).is(':checked')){
            $(this).parent().find('.styleConsultants-others-input').removeAttr('disabled').focus();
        } else {
            $(this).parent().find('.styleConsultants-others-input').attr('disabled', true);
        } 
    });









    $("#js-membership-form").validate({
        rules: {
            name: { required: true },
            email: { required: true , email: true },
            phone: { required: true, digits: true, minlength: 8, maxlength: 12 },
            'nric-passport': { required: true },
            'tnc': { required: true }
        },

        messages: {
            name: 'Please enter your Name',
            email: "Please enter a valid Email",
            phone: "Please enter your Phone Number",
            'nric-passport': 'Please enter your NRIC or Passport'
        },
        errorPlacement: function (error, element) {
            error.addClass("help-block");


            // if (element.hasClass('multiselect')) {
            //     error.insertAfter(element.parent());
            // } else {
            //     error.insertAfter(element);
            // }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-success").removeClass("has-error");
        }
    });

    $("#js-membership-form").on('submit', function(e){
        e.preventDefault();
        var $form = $(this);
        if(!$form.valid()){
            return;
        }
    });











    $("#js-styleConsultants-form").validate({
        rules: {
            'styleConsultants-your-name': { required: true },
            'styleConsultants-gender': { required: true },
            'styleConsultants-phone': { required: true, digits: true, minlength: 8, maxlength: 12 },
            'styleConsultants-email': { required: true , email: true },
            'styleConsultants-date-drop-by': { required: true },
            'styleConsultants-describe-current-style': { required: true },
            'personal-style-consultation': { required: true },
            'styleConsultants-tnc': { required: true }
        },
        messages: {
            'styleConsultants-your-name': 'Please enter your First Name',
            'styleConsultants-gender': 'Please enter your Last Name',
            'styleConsultants-phone': "Please enter your Phone Number",
            'styleConsultants-email': "Please enter a valid Email",
            'styleConsultants-date-drop-by': "Please select a valid Date",
            'styleConsultants-describe-current-style': 'Please Describe your current style',
            'personal-style-consultation': 'Please check What are you looking for in this personal style consultation?',
            'styleConsultants-tnc': 'Please check Terms & Conditions'
        },
        errorPlacement: function (error, element) {
            error.addClass("help-block");
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-error").removeClass("has-success");
            if ($(element).hasClass("styleConsultants-phone")) {
                $(element).addClass("has-error").removeClass("has-success");
            }
            if ($(element).hasClass("styleConsultants-email")) {
                $(element).addClass("has-error").removeClass("has-success");
            }
            if ($(element).hasClass("styleConsultants-tnc")) {
                $(element).parents(".show-error-wrapper2").addClass("has-error").removeClass("has-success");
            }
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-success").removeClass("has-error");
            if ($(element).hasClass("styleConsultants-phone")) {
                $(element).addClass("has-success").removeClass("has-error");
            }
            if ($(element).hasClass("styleConsultants-email")) {
                $(element).addClass("has-success").removeClass("has-error");
            }
            if ($(element).hasClass("styleConsultants-tnc")) {
                $(element).parents(".show-error-wrapper2").addClass("has-success").removeClass("has-error");
            }
        }
    });


    $("#js-styleConsultants-form").on('submit', function(e){
        e.preventDefault();
        var $form = $(this);
        if(!$form.valid()){
            return;
        }
    });

})();
