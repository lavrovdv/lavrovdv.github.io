// remove all
// localStorage.setItem('page_calc_storage', null)


var new_list = {
    name: 'List',
    elements: []
};

var new_element = {
    product_name: '',
    complete: false,
    count: '',
    history: []
};

var new_history = {
    price: 0,
    count: 0,
    type: '',
    comment: '',
    created_at: ''
};

var default_data = {
    current_list_index: 0,
    lists: [
        {
            name: 'List',
            elements: []
        }
    ]
};

function deep_clone(obj){
    return JSON.parse(JSON.stringify(obj))
}

function init_data(){
    return JSON.parse(localStorage.getItem('page_calc_storage')) || deep_clone(default_data);
}

var app = new Vue({
    el: '#app',
    data: init_data(),
    methods:{
        addNewList: function(event){
            this.lists.push(deep_clone(new_list))
        },
        selectList: function(index){
            this.current_list_index = index;
        },
        removeList: function(index){
            this.lists.splice(index, 1)
        },
        removeElement: function(element_index){
            this.lists[this.current_list_index].elements.splice(element_index, 1)
        },
        addElement: function(event){
            var input = $(event.currentTarget);
            var modal = input.closest('#modal1');
            var element = deep_clone(new_element);
            element.product_name = input.val();
            input.val('');
            modal.modal('close');

            this.lists[this.current_list_index].elements.push(element)
        },
        changeElementState: function(index){
            var element = this.lists[this.current_list_index].elements[index];
            element.complete = !element.complete;
        },
        addHistory: function(index, event){
            var history = deep_clone(new_history);
            var now = new Date();
            var form = $(event.currentTarget).closest(".collapsible-body");

            history.price = parseFloat(form.find('input.price').val());
            history.count = parseFloat(form.find('input.count').val());
            history.comment = form.find('input.comment').val();
            history.created_at = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear();
            form.find('input').val('');

            this.lists[this.current_list_index].elements[index].history.push(history)
        }
    },

    computed: {
        currentElements: function () {
            return this.lists[this.current_list_index].elements
        }
    }
});

app.$watch(
    '$data',
    function (newVal, oldVal) {
        localStorage.setItem('page_calc_storage', JSON.stringify(newVal))
    },
    {
        deep: true
    }
);
