$(function () {
    var index;
    $('.dd_item').on({
        mouseover: function () {
            index = $(this).index();
            $(this).addClass('current_t').siblings().removeClass('current_t');
            $('.item_teb div').eq(index).show().siblings().hide();
        }, mouseout: function () {
            $(this).removeClass('current_t');
        }
    })
    $('.item_teb div').mouseout(function () {
        $('.item_teb div').eq(index).hide();
    });
})