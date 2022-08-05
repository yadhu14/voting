$(document).ready(function () {


    // form one 

    // adding rows 
    $("#addrow").click(function () {
        var name = $("#name").val()
        var address = $("#address").val()
        var gender = $("#gender").val()
        var age = $("#age").val()
        console.log(name);
        if (name != "" && age != "" && address != "") {
            var _tr = '<tr><td>' + name + '</td>     <td>' + address + '</td>   <td>' + gender + '</td>     <td>' + age + '</td>  <td><button  type="button" id="bttnedit" style="background-color: blue; color: white;">edit</button>   <button type="button" id="bttndlt" style="background-color: red; color: white;">delete</button></td> </tr>';

            $('#tbody1').append(_tr)
        }
        enblsubmit();
        $('#candidatename').trigger("reset");
        
    });

      

    // delete button functions 

    $("body").on("click", "#bttndlt", function () {
        
        $(this).parents("tr").remove();

        enblsubmit();

        var rowCount = $('#tbody1 tr').length;
        if ( rowCount < 2){

            alert("add atleast 2 candidates")

        }

    });

    // edit button functions

    $(document).on('click', "#bttnedit", function () {
        var _tr = $(this).closest('tr');
        var name = $(_tr).find('td:eq(0)').text();
        var address = $(_tr).find('td:eq(1)').text();
        var gender = $(_tr).find('td:eq(2)').text();
        var age = $(_tr).find('td:eq(3)').text();


        $(this).parents("tr").find("td:eq(0)").html('<input type="text"id="editname" value="' + name + '">');
        $(this).parents("tr").find("td:eq(1)").html('<input name="edit_address" value="' + address + '">');
        $(this).parents("tr").find("td:eq(2)").html('<select name="edit_gender" value="' + gender + '"><option value="male">MALE</option><option value="female">FEMALE</option><option value="other">OTHERS</option></select>');
        $(this).parents("tr").find("td:eq(3)").html('<input type="number" name="edit_age" value="' + age + '">');


        $(this).parents("tr").find("td:eq(4)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button>")
        $(this).hide();
    });

    // update button functions

    $("body").on("click", ".btn-update", function () {
        var name = $(this).parents("tr").find('input[id="editname"]').val();
        var address = $(this).parents("tr").find("input[name='edit_address']").val();
        var gender = $(this).parents("tr").find("select[name='edit_gender']").val();
        var age = $(this).parents("tr").find("input[name='edit_age']").val();

        $(this).parents("tr").find("td:eq(0)").text(name);
        $(this).parents("tr").find("td:eq(1)").text(address);
        $(this).parents("tr").find("td:eq(2)").text(gender);
        $(this).parents("tr").find("td:eq(3)").text(age);

        $(this).parents("tr").attr('data-name', name);
        $(this).parents("tr").attr('data-address', address);
        $(this).parents("tr").attr('data-gender', gender);
        $(this).parents("tr").attr('data-age', age);

        $(this).parents("tr").find("#bttnedit").show();
        $(this).parents("tr").find(".btn-update").remove();

    });
    

    // form two 





    $("#submit").click(function () {

        $("#candidatename").hide()
        $("#votingtable").show()
       

        var items = [];
        $('#table tbody tr td:nth-child(1)').each(function () {
            items.push($(this).text());
        });
        // console.log(items);
        $.each(items, function (i, item) {
           $('#tbody2').append('<tr><td>' + item + '</td>  <td><button  type="button" class="btn btn-sm btn-info text-white addVote" style="color: ; width:120px">VOTE</button></td><td class="vote" style="display: none;">0</td> </tr>');
        })
        $('#table2').on('click','.addVote', function() {
            var _vote= $(this).closest('tr').find("td.vote");
             var change = $(this).hasClass('addVote') ? 1 : -1;
             _vote.text((parseInt(_vote.text())+change));
         });

    });



    // form three



    $("#resultbttn").click(function () {
        $("#candidatename").hide()
        $("#votingtable").hide()
        $("#resulttable").show()


        var items = [];
        var items2 = [];

        $('#table tbody tr td:nth-child(1)').each(function () {
            items.push($(this).text());
        });
        $('#table2 tbody tr td:nth-child(3)').each(function () {
            items2.push($(this).text());
        });

        // get the maximum number of votes


        var items3 = items2.map(str => {
            return Number(str);
            });
            console.log(items3);
        var maxval = Math.max(...items3)

        // adding the number of votes in the table

        $.each(items, function (i, items) {
            $.each(items2, function (j,items2) {

                if (i == j)
                $('#table3').append('<tr><td id="winner">' + items + '</td><td id="votes">'+items2+'</td></tr>');
               
            })

        });

        // announcing the winner 

        $('#table3 tbody tr').each(function(){

            var max_count =$(this).closest("tr").find("td:eq(1)").text();
            if(maxval == max_count){
                var max_name = $(this).closest("tr").find("td:eq(0)").text();
                $("#win_name").text(max_name);
                $("#win").show()
            }

        })
        
        
        
    });

})

function enblsubmit(){

    var rowCount = $('#tbody1 tr').length;
     console.log(rowCount)

        if( rowCount >= 2){

            $("#submit").css("display", "inline")
          

        }else{

            $("#submit").css("display", "none")
        
        }

}