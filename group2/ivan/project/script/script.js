(function () {

	$('.leftNavbar a').click(function (e) {
		e.preventDefault();

		$('.leftNavbar a').removeClass('active');
		$(this).addClass('active');

		var target = $(this).attr('data-target');

		$('body > div').hide();
		$('#' + target).show();
	});
})();

(function () {
	"use strict";

	$('#accordion1 a').click(function (e) {
		e.preventDefault();
		$('#accordion1 a').removeClass('current');
		$(this).addClass('current');
		list($(this).attr("data-filter"));
	});
	$('#productsFilter').change(function (e) {
		list($('#accordion1 a.current').attr("data-filter"), $(this).val());
	});
	$(".panel-body a img").click(function (e) {
		e.preventDefault();
		console.log("ehooo");
		//var url = $(this).attr("src");
		//for (var i in itemsRoom) {
			//var item = itemsRoom[i];
			//if (url === item.picture)
			//	item.toModal();
		//}
	});
})();

function list(group, sort) {
	if (typeof sort !== 'undefined')
		itemsRoom = sortBy(itemsRoom, sort);
	$("#products").empty();
	for (var i in itemsRoom) {
		var item = itemsRoom[i];
		if ("all" === group || item.group === group || item.kind === group)
			item.toHtml();
	};
}

function Item(pic, name, price, group, kind) {
	this.picture = pic;
	this.name = name;
	this.price = price;
	this.group = group;
	this.kind = kind;
	this.toHtml = function () {
		$("#products").append('<div class="col-sm-4 col-lg-4 col-md-4"><div class="panel"><div class="panel-heading panel-primary">' + this.name + '</div><div class="panel-body"><a href="#"><img src="' + this.picture + '" class="img-responsive center-block" alt="Image"></a></div><div class="panel-footer panel-primary"><span class="price">' + this.price + '$</span></div></div></div>');
	};
	this.toModal = function () {
		$("#products").show('<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header modal-primery"><h4 class="modal-title">' + this.name + '</h4></div><div class="modal-body"><img src="' + this.picture + '" class="img-responsive center-block" alt="Image"></div><div class="modal-footer modal-primery"><span class="price">' + this.price + '$</span></div></div></div></div>');
	}
}

function sortBy(itemsList, rule) {
	var compare;
	switch (rule) {
	case 'name_asc':
		compare = function (i1, i2) {
			return i1.name.localeCompare(i2.name);
		};
		break;
	case 'name_desc':
		compare = function (i1, i2) {
			return i2.name.localeCompare(i1.name);
		};
		break;
	case 'price_asc':
		compare = function (i1, i2) {
			return i1.price - i2.price;
		};
		break;
	case 'price_desc':
		compare = function (i1, i2) {
			return i2.price - i1.price;
		};
		break;
	default:
		throw new Error("Unrecognized sorting option: " + rule);
	}

	return itemsList.sort(compare);
}