$(document).ready(function() {
	console.log("ready!");
});

function calculate() {
	var checkInDate = new Date(document.getElementById('checkInDate').value);
	var checkOutDate = new Date(document.getElementById('checkOutDate').value);
	var adultCount = document.getElementById('adultCount').value;
	
	const diffTime = checkOutDate - checkInDate;
	const days = diffTime / (1000 * 60 * 60 * 24);
	
	if(days) {
			document.getElementById('days').value=days;
			var cost = 150*adultCount*days;
			document.getElementById('cost').value=cost;
	}
}

// Reset form
$("#resetBtn").click(function() {
	document.getElementById('days').value="";
	document.getElementById('cost').value="";
	toastr["info"]("All fields have been cleared!","",{closeButton: true});
});

// On submission
$("#submitBtn").click(function(){
	
	var valid = true;
	var invalidFields = [];
	
	$("#hotelForm").validate().form();
	
	// Check if username is empty
	if (!$("#username").val()){
		$("username").addClass('has-error');
		valid = false;
		invalidFields.push("Username");
	}
	
	// Check if first name is empty
	if (!$("#firstName").val()){
		$("#first-name-group").addClass('has-error');
		valid = false;
		invalidFields.push("First Name");
	}
	
	// Check if last name is empty
	if ($("#lastName").val() == ""){
		$("#last-name-group").addClass('has-error');
		valid = false;
		invalidFields.push("Last Name");
	}
	
	// Check if phone is empty
	if (!$("#phone").val()){
		$("#phone-group").addClass('has-error');
		valid = false;
		invalidFields.push("Phone Number");
	}
	
	// Check if fax is empty
	if (!$("#fax").val()){
		$("#fax-group").addClass('has-error');
		valid = false;
		invalidFields.push("Fax Number");
	}
	
	// Check if email is empty
	if ($("#email").val() == ""){
		$("#email-group").addClass('has-error');
		valid = false;
		invalidFields.push("Email");
	}
	
	// Toast for missing fields
	if (invalidFields.length == 1) {
		toastr["error"](invalidFields + " is missing!");
	}
	else if (invalidFields.length > 1) {
		toastr["error"](invalidFields + " are missing!");
	}
		
	// Validate if cost is calculated
	if (!$("#cost").val()){
		valid = false;
		toastr["error"]("Cost not calculated! Please enter number of adults, check-in date and check-out date.","",{closeButton: true});
	}
	
	// Validate if cost is positive
	if ($("#cost").val() < 0){
		valid = false;
		toastr["error"]("Cost is negative! Check-out date must be after check-in date.","",{closeButton: true});
	}
	
	// Allow submission if everything is valid
	if (valid) {
		toastr["success"]("Form submitted successfully!","",{closeButton: true});
	}
});

$("#hotelForm").validate({
	rules: {
		username: {
			required: true
		},
		firstname: {
			required: true
		},
		lastname: {
			required: true
		},
		phone: {
			required: true
		},
		fax: {
			required: true
		},
		email: {
			required: true
		}
	},
	highlight: function(element) {
		$(element).closest(".form-group").addClass("has-error");
	},
	unhighlight: function(element) {
		$(element).closest(".form-group").removeClass("has-error");
	},
	errorElement: 'span',
  errorClass: 'help-block',
  errorPlacement: function(error, element) {
  	if (element.parent('.input-group').length) {
			error.insertAfter(element.parent());
		} 
		else {
			error.insertAfter(element);
		}
	}
});
