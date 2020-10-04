var baseURL = "http://localhost/ShopBridge_BE";

$(document).ready(function () {
    BindProductList();
});

function previewImage(obj) {

    if (CheckExt(obj) == true) {
        $('#btnAddItem').prop('disabled', true);
        if (obj.files && obj.files[0]) {
            var imgFile = new FileReader();
            imgFile.onload = function (e) {
                $('#hidImage').val(e.target.result);
            };
            imgFile.readAsDataURL(obj.files[0]);
        }
    }

    $('#btnAddItem').prop('disabled', false);
}
function CheckExt(obj) {

    var isValid = true;
    var ext = obj.value.match(/\.(.+)$/)[1];
    ext = ext.toLocaleLowerCase();
    switch (ext) {
        case 'jpg':
            break;
        case 'bmp':
            break;
        case 'png':
            break;
        case 'tif':
            break;
        case 'gif':
            break;
        case 'jpeg':
            break;
        default:
            {
                alert('Only Image format is allowed !');
                obj.value = '';
                var isValid = false;
            }
    }
    return isValid;
}

function readImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgDisplay').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
        previewImage(input);
    }
}
function TriggerFileImg() {
    $("#imgFile").trigger('click');
}

function AddItemDetails() {
    if ($('#imgFile')[0].files.length == 0 || $('#hidImage').val() == "") {
        SaveItem("");
        return false;
    }
    
    var pathArray = window.location.pathname.split("/");
    if (!isNaN(pathArray[pathArray.length - 1])) {
        pathArray.splice(pathArray.length - 1, 1);
    }
    pathArray[pathArray.length - 1] = "SaveImage";

    var url = pathArray.join("/");
    
    var model = new FormData();
    model.append("File", $('#imgFile')[0].files[0]);

    
    $.ajax({
        url: url,
        data: { imgFile: $('#hidImage').val().split(',')[1] },
        cache: false,
        type: "POST",
        //async: false,
        success: function (data) {            
            SaveItem(data);
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });

}

function SaveItem(fileName) {
    
    var obj = {
        ItemName: $('#ItemName').val()
        , ItemPrice: $('#Price').val()
        , ItemDescription: $('#ItemDescription').val()
        , ItemImage: fileName
    };
    var JSONdata = JSON.stringify(obj);
    

    $.ajax({
        type: "POST",
        url: baseURL + "/api/Item/AddItem",
        data: JSONdata,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            
            if (data.ID > 0) {
                ClearAllValue();
                BindProductList();
                $("#successMsg").html("<strong>Success!</strong> Item Saved Successfully.")
                $("#dvsuccess").show().fadeOut(5000, function () {
                });
            }
            else {
                $("#dangerMsg").html("<strong>Error!</strong> Sorry There Is Some Problem, Please Try After Sometime.")
                $("#dvdanger").show().fadeOut(5000, function () {
                });
            }
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });
}
function ClearAllValue() {
    var pathArray = window.location.pathname.split("/");
    if (!isNaN(pathArray[pathArray.length - 1])) {
        pathArray.splice(pathArray.length - 1, 1);
    }
    pathArray[pathArray.length - 2] = "images";
    pathArray[pathArray.length - 1] = "UploadImage.PNG";
    var imgUrl = pathArray.join("/");

    $('#imgDisplay').attr('src', imgUrl);
    $('#hidImage').val("");
    $('#ItemName').val("");
    $('#Price').val("");
    $('#ItemDescription').val("");
}

function BindProductList() {
    $.ajax({
        type: "GET",
        url: baseURL + "/api/Item/GetItem",
        success: function (data) {
            var strHTML = "";
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    strHTML += '<div class="col-md-3" style="margin-bottom:25px">';
                    strHTML += '<div class="thumbnail">';
                    strHTML += '<div class="img-responsive text-center" style="margin-bottom:20px">';
                    strHTML += data[i].ItemImage == "" ? '<img src="../images/NoImage.PNG" height="150" width="180" />' : '<img src="../UploadedFiles/' + data[i].ItemImage + '" height="150" width="180" />';
                    strHTML += '</div>';
                    strHTML += '<div class="caption" style="border-top:3px solid #808080">';
                    //strHTML += '<h4><a href="../Item/ItemDetails?itemId=' + data[i].ItemId + '">' + data[i].ItemName + '</a></h4>';
                    //strHTML += '<h3>' + data[i].ItemPrice + '</h3>';
                    strHTML += '<div class="row">';
                    strHTML += '<div class="col-sm-8">';
                    strHTML += '<h4><a href="../Item/ItemDetails?itemId=' + data[i].ItemId + '">' + data[i].ItemName + '</a></h4>';
                    strHTML += '<h3>' + data[i].ItemPrice + '</h3>';
                    strHTML += '</div>';
                    strHTML += '<div class="col-sm-4 text-left">';
                    strHTML += '<button onclick="DeleteItem(' + data[i].ItemId + ');">Delete</button>';
                    strHTML += '</div>';
                    strHTML += '</div>';
                    strHTML += '</div>';
                    strHTML += '</div>';
                    strHTML += '</div>';
                }
            }
            $('#divProductList').html(strHTML);
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });
}
function DeleteItem(ItemId) {
    $.ajax({
        type: "GET",
        url: baseURL + "/api/Item/DeleteItemById?Item_Id=" + ItemId,
        success: function (data) {
            if (data.ID > 0) {
                BindProductList();
                $("#successMsg").html("<strong>Success!</strong> " + data.RES )
                $("#dvsuccess").show().fadeOut(5000, function () {
                });
            }
            else {
                $("#dangerMsg").html("<strong>Error!</strong> Sorry There Is Some Problem, Please Try After Sometime.")
                $("#dvdanger").show().fadeOut(5000, function () {
                });
            }
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });
}
