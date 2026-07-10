// contact //

$(document).ready(function() {

	var field_id = $("#contact form input[name='part-id']");

	var field_name = $("#contact form input[name='part-name']");

	var button = $("#footer [for='modal-contact']");


	$.each(

		$(".product"),

		function (index, product) {

			var id = $(product).find (".product-identifier")[0].innerText;

			var name = $(product).find (".product-name")[0].innerText;

			id = id.trim ();

			id = id.toUpperCase ();

			name = name.trim ();

			name = name.toUpperCase ();

			$(button).on (
				"click",

				function (event) {

					$(field_id).attr ("value", id);

					$(field_name).attr ("value", name);

				}

			);

		}

	);

});
