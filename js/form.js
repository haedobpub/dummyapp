$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


$(function() {
	$("form").submit(function() {
		var json = $('form').serializeObject();

		$('#bikers tr:last').after(getRowItem(json));
		return false;
	});

	$(".delete-row").click(function() {
		deleteRow(this.parentNode.parentNode);
	});
});


function getRowItem(json) {
	const dateNow = moment().format('MM/DD/YYYY');
	const timeNow = moment().format('hh:mm a');

	var days = json.days; 

	if (Array.isArray(json.days)) {
		if (json.days.length > 1 && json.days != 7)
			days = json.days.join(", ");
		else if (json.days.length === 7)
			days = "Every day";
	}

	return "<tr>" +
				"<td>" + json.name + "</td>" +
				"<td>" + json.email + "</td>" +
				"<td>" + json.city + "</td>" +
				"<td>" + json.rideGroup + "</td>" +
				"<td>" + days + "</td>" +
				"<td>" + dateNow.toString() + " <span class='currentTime'>" + timeNow.toString() + "</span></td>" +
				"<td><span onclick='deleteRow(this.parentNode.parentNode);'><i class='fa fa-trash-o'></i></span></td>" +
			"</tr>";
}


function deleteRow(row) {
	$(row).remove();
	return false;
}

