$(function() {
	$(".help-accordion").click(function() {
		var panel = this.nextElementSibling;

		this.classList.toggle("active");    
	    $(panel).toggle("fast");
	});
});