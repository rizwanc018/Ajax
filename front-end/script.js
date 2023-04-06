$(function () {
    var orders = $('#orders')
    var url = 'http://127.0.0.1:3000';
    var $name = $('#name')
    var $drink = $('#name')

    $.ajax({
        type: "GET",
        url: `${url}/orders`,
        crossDomain: true,
        success: res => {
            res.forEach(order => {
                orders.append(`
                <li data-id=${order.id}> 
                    <p>
                        <strong>Name: </strong>
                        <span class="noedit name">${order.name}</span>
                        <input type="text" class="edit name">
                    </p>
                    <p>
                        <strong>Drink: </strong>
                        <span class="noedit drink">${order.drink}</span>
                        <input type="text" class="edit drink">
                    </p>
                    <button class="remove" data-id=${order.id}>Delete</button> 
                    <button class="editOrder noedit">Edit</button>
                    <button class="saveEdit edit">Save</button>
                    <button class="cancelEdit edit">Cancel</button>
                </li>`)
            });
        },
        error: err => {
            console.log(err);
        }
    })

    $('#addOrder').on('click', () => {
        var data = {
            name: $name.val(),
            drink: $drink.val()
        }

        $.ajax({
            type: "POST",
            url: `${url}/orders`,
            data: data,
            crossDomain: true,
            success: res => {
                orders.append(`<li> Name: ${res.name}, Drink: ${res.drink} </li>`)
            },
            error: err => {
                console.log(err);
            }
        })
    })

    orders.delegate('.remove', 'click', function () {
        var $li = $(this).closest('li')
        var id = $(this).attr('data-id')
        $li.fadeOut(300, function () {
            $li.remove()
        })
        // $.ajax({
        //     type: "DELETE",
        //     url: `${url}/orders/${id}`,
        //     crossDomain: true,
        //     success: res => {
        //         $li.remove()
        //     },
        //     error: err => {
        //         console.log(err);
        //     }
        // })

    })

    orders.delegate('.editOrder', 'click', function () {
        var $li = $(this).closest('li')
        $li.find('input.name').val($li.find('span.name').html())
        $li.find('input.drink').val($li.find('span.drink').html())
        $li.addClass('edit')
    })

    orders.delegate('.cancelEdit', 'click', function () {
        var $li = $(this).closest('li')
        $li.removeClass('edit')
    })

    orders.delegate('.saveEdit', 'click', function () {
        var $li = $(this).closest('li')
        $li.find('span.name').html($li.find('input.name').val())
        $li.find('span.drink').html($li.find('input.drink').val())
        $li.removeClass('edit')


        // var data = {
        //     name: $li.find('input.name').val(),
        //     drink: $li.find('input.drink').val()
        // }

        // $.ajax({
        //     type: "PUT",
        //     url: `${url}/orders`,
        //     data: data,
        //     crossDomain: true,
        //     success: res => {
                    // $li.find('span.name').html($li.find('input.name').val())
                    // $li.find('span.drink').html($li.find('input.drink').val())
                    // $li.removeClass('edit')
        //     },
        //     error: err => {
        //         console.log(err);
        //     }
        // })
    })

})