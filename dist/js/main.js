var models = {};

// Our base model is "Column"
models.Column = Backbone.Model.extend({
    initialize: function(attrs) {

        //Random Name generation
        const randomName = Array.from({length: attrs.images.length}, () => Math.floor(Math.random() * 10));
        //const randomName = attrs.images[Math.floor(Math.random() * attrs.images.length)];


        for (var i = 1; i < 5; i++) {
            this.set('img' + i, randomName);
        }
    }

});

// collection for getting images from endpoint

models.Row = Backbone.Collection.extend({
    model: models.Column,
    url: "/images"
});


// Views are responsible for rendering stuff on the screen (well,
// into the DOM).
//
// Typically views are instantiated for a model or a collection,
// and they watch for change events in those in order to automatically
// update the data shown on the screen.
var views = {};

views.RowItem = Backbone.View.extend({
    // Each person will be shown as a table row
    tagName: 'div',



    render: function() {
        const row = this.model.attributes.images;
        const title = this.model.attributes.title;

        const template = row.map(r => `<div><img src="/img/${r}" title="${r}" alt="0" /></div>`)
        this.$el.addClass('row-container').html(`<div class="row"><span class="title">${title}</span><div class="items">${template}</div></div>`);
        return this;
    }
});

views.Row = Backbone.View.extend({
    // The collection will be kept here
    collection: null,

    el: '.images',

    initialize: function(options) {
        this.collection = options.collection;

        //set the index to be 0
        this.index = 1;
        this.marginLeft = 0;

        this.collection.fetch({ success: _.bind(this.render, this) });
    },
    navigateHandler: function (e) {
        const isLeft = e.target.id === 'nav-left' ;
        const isRight = e.target.id === 'nav-right' ;
        const incr = 412;

        if(isLeft) {
            if(this.index === 1)
                return;
            this.marginLeft = this.marginLeft + incr;
            this.$el.css('margin-left', `${this.marginLeft}px`);
            this.index--;
        }

        if(isRight) {
            if (this.index === this.collection.length)
                return;
            this.marginLeft = -this.index * incr;
            this.$el.css('margin-left', `${this.marginLeft}px`);
            this.index++;
        }
    },
    render: function() {
        var element = jQuery(this.el);
        // Clear potential old entries first
        element.empty();
        $('.nav').on('click', this.navigateHandler.bind(this));
        // Go through the collection items
        this.collection.forEach(function(item) {
            // Instantiate a RowItem view for each
            var itemView = new views.RowItem({
                model: item
            });

            // Render the itemView, and append its element
            element.append(itemView.render().el);
        });

        return this;
    }
});

var row = new models.Row();

// Pass the collection of people to the view
var view = new views.Row({
    collection: row
});
