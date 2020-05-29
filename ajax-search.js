jQuery(document).ready(function($) {
	var timer;	
	var cat = 'none';
	// We can also pass the url value separately from ajaxurl for front end AJAX implementations
	jQuery( ".jms_ajax_search" ).click(function(){
		jQuery(this).keyup(function() {
			var pr = jQuery(this).closest('.search-wrapper');
			jQuery(".search_result").addClass('loading_search');
			jQuery("#result").addClass('disabled');
			get_post(pr);
		});
	});

	jQuery( ".product_categories" ).click(function(){
		jQuery(this).change(function() {
			var pr = jQuery(this).closest('.search-wrapper');
			if( pr.find('.product_categories').val() != null ) {
				cat = pr.find('.product_categories').val();
			}
			get_post(pr);
		});
	});
	
	
	jQuery('html').click(function() {
		jQuery( ".search_result" ).html('');
	});
	jQuery('.search_result').click(function(event){
		event.stopPropagation();
	});

	function get_post(pr) {
		var result = pr.find('.search_result');
		clearTimeout(timer);
		timer = setTimeout(function() {
			var data = {
				'action': 'get_search',
				'keyword': pr.find( ".jms_ajax_search" ).val(),
				'product_cat': cat
			};
			jQuery.get(jmsajaxsearch_ajax.ajax_url, data, function(response) {
				jQuery( ".search_result" ).removeClass('loading_search');
				jQuery( "#result" ).removeClass('disabled');
				result.html(response);
			});
		}, jmsajaxsearch_ajax.time_out);
	}
});