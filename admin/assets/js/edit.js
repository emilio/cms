EC.core.loadCSS(AppData.baseAssetPath + 'vendor/ecjs/css/ec.modal.css');
EC.core.loadCSS(AppData.baseAssetPath + 'vendor/ecjs/css/ec.ui.css');
EC.core.loadCSS(AppData.baseAssetPath + 'vendor/ecjs/css/plugins/ec.tagsInput.css');
EC.require(['DOM', 'plugins.tagsInput'], function() {
	var 
		trim,
		form = EC.DOM.select('.edit-form').get(0),
		content = EC.DOM.select(form.content),
		formatInputs = EC.DOM.select(form.format),
		previewModal,
		addContent = function (field, val) {
			var sel,
				start,
				end;
			if (document.selection) {
				field.focus();
				sel = document.selection.createRange();
				sel.text = val;
				return true;
			}

			start = myField.selectionStart;
			end = myField.selectionEnd;
			field.value = field.value.substring(0, start) + val + field.value.substring(end);
			field.selectionStart = selectionEnd = start + val.length;
		};

	if( String.prototype.trim ) {
		trim = function (str) {
			return str.trim();
		}
	} else {
		trim = function(str) {
			return str.replace(/^\s+|\s+$/g, '');
		}
	}

	EC.DOM.select('#tags').tagsInput();
	EC.DOM.select('#preview').on('click', function showPostPreview(e) {
		var post = content.get(0).value,
			format;
		if(e) { e.preventDefault(); }

		formatInputs.forEach(function(input) {
			if( input.checked ) {
				format = input.value;
			}
		});
		if( format === "markdown" ) {
			if( ! window.marked ) {
				return EC.core.loadJS(AppData.baseAssetPath + 'vendor/marked/marked.js', function() {
					showPostPreview()
				});
			}
			post = window.marked.parse(post);
		}

		EC.require(['modal'], function() {
			post = '<div class="post-preview post-preview-' + format + '">' + post + '</div>';
			if( ! previewModal ) {
				previewModal = EC.modal.create({
					title: 'Previsualización',
					content: post,
					maxWidth: 960
				});
			} else {
				previewModal.elements.modal_content.get(0).innerHTML = post;
			}
			previewModal.show();
		});
	});

	var add_media = EC.DOM.select('#media'),
		mediaTemplate = EC.DOM.select('#media-modal-template').get(0).innerHTML,
		mediaModal;

	add_media.on('click', function(e) {
		e.preventDefault();
		EC.require(['request', 'modal'], function() {
			EC.request.get(AppData.adminUrl + 'ajax_media/', function showMediaGallery(data) {
				if( ! window.Handlebars ) {
					EC.core.loadJS(AppData.baseAssetPath + 'vendor/handlebars/handlebars.js', function() {
						mediaTemplate = Handlebars.compile(mediaTemplate);
						showMediaGallery(data);
					});
					return;
				}
				if( ! mediaModal ) {
					mediaModal = EC.modal.create({
						title: 'Multimedia',
						content: mediaTemplate(data),
						maxWidth: 960
					});


					mediaModal.elements.modal_content.on('click', '.media-item', function(e) {
						var id = this.getAttribute('data-id');
						e.preventDefault();
						addContent(content, '[media id="' + id + '"]');
					})

				} else {
					mediaModal.elements.modal_content.get(0).innerHTML = text;
				}
				mediaModal.show()
			});			
		})
	});

	var add_cat = EC.DOM.select('#add-category');
	add_cat.on('click', function(e) {
		e.preventDefault();

		EC.require(['modal', 'UI'], function() {
			EC.UI.prompt('Introduce el nombre de la categoría', '', function(result) {
				if( result && trim(result) !== '' ) {
					EC.require(['request'], function() {
						EC.request.post(AppData.adminUrl + 'ajax_category_create/', {
							name: trim(result)
						}, function(response) {
							var cat = response.category;

							cat.id = parseInt(cat.id, 10);

							if( ! cat.id ) {
								EC.UI.alert('Ha ocurrido un error desconocido');
								return;
							}

							add_cat.before('<p><input checked type="radio" name="category_id" value="' + cat.id + '" id="category_' + cat.id + '"> <label for="category_' + cat.id + '">' + cat.name + '</label></p>');

						});
					})
				} else {
					EC.UI.alert('Introduce un nombre para la categoría');
				}
			});
		})
	});

	var slug_input = EC.DOM.select('#slug'),
		title_input = EC.DOM.select('#title'),
		changed = slug_input.get(0).value !== '',
		event_name = 'oninput' in slug_input.get(0) ? 'input' : 'keypress';

	slug_input.on(event_name, function() {
		changed = true;
	})
	title_input.on(event_name, function(e) {
		if( ! changed ) {
			slug_input.get(0).value = trim(this.value).toLowerCase().replace(/\s/g, '-').replace(/[\[\]\(\)\!\?\¿'"]/g, '');
		}
	})
});